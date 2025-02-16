---
sketchTitle: PostgreSQL, ArangoDB & Neo4j for Graph Databases
sketchAuthor: "Julian Cooper"
skecthReviewer: "Tomas Bosschieter"
sketchPublishDate: "Dec 2024"
articleTitle: Switching from Relational Databases to ArangoDB
articleAuthor: Claudius Weinberger
articlePublishDate: "March 2022"
category: Software Engineering
bannerImage: /imgs/psql_traversal_algorithms.png
description: "Graph databases like ArangoDB and Neo4j are increasingly popular, but how do they differ from a relational database with two tables: nodes and edges?"
---

|     |     |
| --- | --- |  
| **Title** | **Switching from Relational Databases to ArangoDB** |  
| Author(s) | Claudiuassumes Weinberger & Frank Celler |  
| Date published | March, 2022 |  
|     |     |   


### Motivation

Graph databases have exploded in popularity over the last decade due to the increase in highly-connected datasets, such as social networks, recommender systems, and knowledge graphs. 

- **Relational databases like PostgreSQL** (introduced 1986) can be adapted to represent graphs. In general these are lighter weight and more flexible, but rely on slow recursive JOIN operations for traversal queries.[[3]](#reference-documentation) 

- **Multi-model databses like ArangoDB** (introduced 2014) offer a combination of document, key-value, and graph data models in one system.[[1]](#reference-documentation)
  
- **Native graph databases like Neo4j** (introduced 2007) are purpose-built to minimize compute required for large graph traversals.[[2]](#reference-documentation)

This sketch compares the three graph database paradigm, examining their storage models and query execution. 


### How nodes and edges are stored

In relational databases (like PostgreSQL), graphs are represented using tables for nodes and edges linked by the foreign keys (mapping columns) "source" and "target". This is intuitive and flexible.

```sql
CREATE TABLE nodes (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
);

CREATE TABLE edges (
    id SERIAL PRIMARY KEY,
    relation TEXT,
    source INT REFERENCES nodes(id),
    target INT REFERENCES nodes(id),
);

INSERT INTO nodes (name) VALUES ('Alice'), ('Bob');
INSERT INTO edges (source, target, relation) VALUES (1, 2, 'FRIENDS_WITH');
```

For multi-model databases (like ArangoDB), nodes are stored as "json documents" and edges are stored as specicalized (indexed) documents referencing nodes. ArangoDB automatically indexes `_from` and `_to` fields in edge documents to allow efficient graph traversal. Here is an example from ArangoDB's AQL (Arango Query lanaguage).

```json
{
  "_key": "Alice",
  "name": "Alice"
}
{
  "_from": "nodes/Alice",
  "_to": "nodes/Bob",
  "relation": "FRIENDS_WITH"
}
```

For native graph databases (like Neo4j), nodes are stored as discrete graph objects and edges are directly connected to nodes with pointers in memory instead of foreign keys. The following is the equivalent example written in Neo4j's Cypher language.

```sql
CREATE (a: {name: "Alice"})
CREATE (b: {name: "Bob"})
CREATE (a)-[:FRIENDS_WITH]->(b);
```

Note, we did not need to explicitly create nodes and edges tables for ArangoDB and Neo4j. Each node and edge is stored separately in the database. There is some indexing redundancy here which supports different search algorithms at the cost of additional storage.

Despite indexing redundancies used to enhance performance in multi-model and native graph databases, all there paradigms have $O(N+E)$ storage complexity, with $N+E$ being the total number of graph objects (nodes and edges) stored.


### Query execution (single-hop)

Let's say we want to find all friends of Alice. This is a single-hop graph traversal query in our toy example database. 

In PostgreSQL, this would already involve multiple `JOIN` statements: one on source nodes of each edge and one on the target nodes.

```sql
SELECT n2.name, e.relation
FROM nodes n1
JOIN edges e ON n1.id = e.source
JOIN nodes n2 ON e.target = n2.id
WHERE n1.name = 'Alice' AND e.relation = 'FRIENDS_WITH';
```

In ArangoDB's AQL, we use the `OUTBOUND` operator. This query syntax is much cleaner, but also the pre-computed `_from` and `_to` indexes enable faster traversal than vanilla PostgreSQL `JOIN` statement.

```sql
FOR v, e IN 1 OUTBOUND 'nodes/Alice' edges
    FILTER e.relation == 'FRIENDS_WITH'
    RETURN DISTINCT v.name;
```

In Neo4j's Cypher language the syntax is even more concise, almost a one-liner. Under-the-hood, the `MATCH` algorithm directly follows pointers between nodes rather than indexing logic.

```cypher
MATCH (a: {name: 'Alice'})-[:FRIENDS_WITH]->(b) 
RETURN b;
```

While this example is tiny and would be fast with any method, the three algorithms scale differently even for single-hop operations. The PostgreSQL query is $O(N^2)$, where $N$ is the number of nodes in the graph. ArangoDB is $O(\log N)$ with its speed-up due to indexing. And Neo4j is $O(1)$ (i.e. constant time). 


### Graph traversal (multi-hop)

Let's increase the complexity of the query. Imagine we are building a recommender engine and want to create a list of Alice's friends-of-friends (i.e. a two-hop search).

To implement this with PostgreSQL we introduce a "Recursive Common Table Expression". The Recursive CTE is a core SQL feature built specifically to enable traversal of hierarchical data structures. Which is great, however, under-the-hood we are still performing nested `JOIN` operations. The recursion statement is really just syntactic sugar, and even then not that sweet.

```sql
WITH RECURSIVE graph_traversal AS (
    SELECT source, target FROM edges WHERE relation = 'FRIENDS_WITH' AND source = 1 -- Alice's ID
    UNION
    SELECT e.source, e.target FROM edges e
    JOIN graph_traversal g ON e.source = g.target
)
SELECT * FROM graph_traversal;
```

ArangoDB's AQL solves this elegantly by just incrementing the `OUTBOUND` step operator from 1 to 2. 

```sql
FOR v, e IN 2 OUTBOUND 'nodes/Alice' edges
    FILTER e.relation == 'FRIENDS_WITH'
    RETURN DISTINCT v.name;
```

Similarly, Neo4j retains the one-line syntax from the single-hop example and introduces the `*` operator for expressing search depth.

```cypher
MATCH (a: {name: 'Alice'})-[:FRIENDS_WITH*2]->(b) 
RETURN b;
```

The compute implications here are significant. If  one-hop complexity is X, the average neighbours per node (branching factor) is B and depth of search is D, then the overall complexity will be $O(B^D X)$.

For PostgreSQL, our nested `JOIN` operations still cost $O(N^2)$ per hop so we get $O(B^D N^2)$. Following this logic we get $O(B^D \log N)$ and $O(B^D)$ for ArangoDB and Neo4j respectively. While these all grow exponentially with depth due to the exponential growth in number of nodes visited, the difference between algorithms is huge for searches of depth 3 or more.


### PostgeSQL optimisations by Simon Riggs

Simon Riggs is responsible for many of the enterprise features we find in PostgreSQL today, including point-in-time recovery, hot standby, and sychronous replication.

The following are two enhancements to the PostgreSQL graph traversal queries.[[3]](#reference-documentation)

- **Indexing foreign keys** to speed up lookups. This improves the performance of our join operation and in doing so reduces our single-hop complexity from $O(N^2)$ to $O(N \log N)$!
  
  ```sql
  CREATE INDEX idx_source ON edges(source);
  CREATE INDEX idx_target ON edges(target);
  ```

- **Materialized views** for frequently accessed relationship queries to reduce need for repeated recursive operations. Pre-computed queries reduced to $O(1)$, but data risks becoming stale.

  ```sql
  CREATE MATERIALIZED VIEW graph_snapshot AS
    WITH RECURSIVE graph_traversal AS (
        SELECT source, target FROM edges
        UNION
        SELECT e.source, e.target FROM edges e
        JOIN graph_traversal g ON e.source = g.target
    )
    SELECT * FROM graph_traversal;
  ```

The indexing idea is a no-brainer, so let's assume we go ahead and implement that for PostgreSQL implementation. 


### So ... which should I use?

| Feature            | PostgreSQL (Relational)         | ArangoDB (Multi-Model) | Neo4j (Native Graph) |
|-------------------|--------------------------------|------------------------|----------------------|
| **Storage Model** | Tables with foreign keys      | Document-based with graph support | Direct node-link storage |
| **Query Language** | SQL (recursive CTEs, JOINs)  | AQL (ArangoDB Query Language) | Cypher (intuitive graph traversal) |
| **Traversal Speed (per hop)** | O(n log n) B-Tree indexes     | O(log n) Hash and skiplist indexes | O(1) node pointers |
| **Storage Complexity** | O(n) (tables, indexes)  | O(n) (document and edge collections) | O(n) (direct graph storage) |

PostgreSQL is a good choice for applications that primarily deal with structured data, transactional workloads, and analytics, but its graph capabilities are limited by the need for complex joins. ArangoDB offers a flexible multi-model approach, making it ideal for projects that require both document storage and graph traversal, though its graph performance is not as optimized as Neo4j. For applications that rely heavily on deep and frequent graph traversals, such as social networks, recommendation systems, and fraud detection, Neo4j provides the best performance with its native graph storage and O(1) per hop traversal efficiency. 


### Reference Documentation

*Switching from Relational Databases to ArangoDB (Claudius Weinberger & Frank Celler, 2022)*
*[[1]](https://arangodb.com/resources/white-papers/coming-from-relational)*

*An Overview of Graph Algorithms in Neo4j (Amy E. Hodler, 2021)*
*[[2]](https://neo4j.com/graph-algorithms-white-paper/)*

*Webinar: Graph Queries with PosgreSQL (Simon Riggs, 2021)*
*[[3]](https://youtu.be/_RXfnnqsLlw?si=vKwZFrjnz-rFKYdG)*

