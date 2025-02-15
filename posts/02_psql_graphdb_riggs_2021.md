---
sketchTitle: PostgreSQL for Graph Database Queries
sketchAuthor: "Julian Cooper, 30th Dec. 2024"
sketchPublishDate: "2024-12-30"
articleTitle: Graph Queries with PostgreSQL
articleAuthor: Simon Riggs
articlePublishDate: "2021-11-15"
category: Software Engineering
bannerImage: /imgs/psql_traversal_algorithms.jpg
description: "Graph databases like Neo4j and ArangoDB are increasingly popular, but how do they differ from a relational database with two tables: nodes and edges?"
---

|     |     |
| --- | --- |  
| **Title** | **Webinar: Graph Queries with PostgreSQL** |  
| Author(s) | Simon Riggs |  
| Date published | November, 2021 |  
|     |     |   


### Motivation

Graph databases have exploded in popularity over the last decade due to the increase in highly-connected datasets, such as social networks, recommender systems, and knowledge graphs. 
Native graph databases like Neo4j (commercial license) and ArangoDB (open-source) are purpose-built to minimize compute required for large graph traversals. Traditional relational databases like PostgreSQL can be adapted to represent graphs. In general these are lighter weight and more flexible, but rely on slow recursive JOIN operations for traversal queries.

This sketch compares the two approaches in terms of representation, flexibility, retrieval efficiency and storage. 

### How nodes and edges are stored

In relational databses, graphs are represented using tables for nodes and edges linked by the foreign keys (mapping columns) "source" and "target". This is intuitive and flexible.

```sql
CREATE TABLE nodes (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
);

CREATE TABLE edges (
    id SERIAL PRIMARY KEY,
    edge_type TEXT,
    source INT REFERENCES nodes(id),
    target INT REFERENCES nodes(id),
);

INSERT INTO nodes (name) VALUES ('Alice'), ('Bob');
INSERT INTO edges (source, target, edge_type) VALUES (1, 2, 'FRIENDS_WITH');
```

For native graph models, nodes are stored as discrete graph objects and edges are directly connected to nodes with pointers in memory instead of foreign keys. The following is the equivalent example written in Neo4j's Cypher language.

```bash
CREATE (a:Person {name: "Alice"})
CREATE (b:Person {name: "Bob"})
CREATE (a)-[:FRIENDS_WITH]->(b);
```

### Query execution (single-hop)

Let's say we want to find all friends of Alice.

```sql
SELECT n2.* FROM edges e
JOIN nodes n1 ON e.source = n1.id
JOIN nodes n2 ON e.target = n2.id
WHERE n1.name = 'Alice';
```

## Performance implications

##





**Code implementation**: TensorFlow autodiff and distribution libraries used to reproduce math formulation.

- import libraries, generate dataset from true model

    ```python
    import silence_tensorflow.auto
    import tensorflow_probability as tfp
    import tensorflow as tf

    # true solution
    mu_true = 4.0
    sigma_true = 2.0

    # generate data from true model
    N = 100  # number of samples
    X = tfp.distributions.Normal(loc=mu_true, scale=sigma_true)
    dataset = X.sample(N)
    ```    

### Reference Documentation

*Webinar: Graph Queries with PosgreSQL (Simon Riggs, 2021)*
*[[1]](https://youtu.be/_RXfnnqsLlw?si=vKwZFrjnz-rFKYdG)*

*Switching from Relational Databases to ArangoDB (Michael Jordan, Zoubin Ghahramani, Tommi S. Jaakkola and Lawrence K. Saul, 1999)*
*[[2]](https://arangodb.com/resources/white-papers/coming-from-relational)*

