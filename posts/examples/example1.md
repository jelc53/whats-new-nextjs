---
sketchTitle: Shortened Example Sketch Title 1
sketchAuthor: Julian Cooper, 14th Sept. 2023
sketchPublishDate: "2023-09-13"
articleTitle: Example Article With Reasonably Long Title 1
articleAuthor: Martin Kleppmann & Kleppmann
articlePublishDate: "2017-01-01"
category: Convex Optimization
bannerImage: /imgs/neuromancer_headset.png
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
---

|     |     |
| --- | --- |  
| **Title** | **Example Article With Reasonably Long Title 1** |  
| Author(s) | Martin Kleppmann & Martin Kleppmann |  
| Date published | January, 2017 |  
|     |     |    

Motivation: Building data systems that are reliable, scalable and maintainable

Applications typically need to store data (databases), remember results of expensive opertions (caches), allow users to search data (search indexes), send message to other asynchronous processes (stream processing), and perform operations on accumulated data (batch processing) 

![example application architecture](/imgs/figure1-1.png)

## Relational, Document & Graph Models
*It is not possible in general to say which data model leads to simpler application code; it depends on the kinds of relationships that exist between data items.*

- **Relational Model** (SQL, Edgar Codd 1970): data is organized into relations (tables) where each relation is an unordered collection of tuples (rows). Very efficient for traiditonal database use cases, being transaction processing (entering sales, banking transactions) and batch processing (customer invoicing payroll, reporting). By far the dominant database design through to 2010s.

- **NoSQL #2: Document Model** (MongoDB, Firestore, RethinkDB, DynamoDB, XML Databases, etc.): data is stored in JSON-like documents (not tables) designed to be queried as key-value pairs. "Documents" in the document-oriented database correspond closely to "objects" in app code. Perfect for one-to-many (tree-structured) relationships. Many-to-one relationships (e.g. lots of people belong to same city) pose a problem of replication, whereas relational databases can simply refer to rows in other tables by ID, because joins are easy. 

- **NoSQL #2: Graph Model** (Cypher, SPARQL, GraphQL): ideal if many-to-many relationships are common, e.g. for social networks, web page rank, rail or road networks. Typically these are structured as a set of two relational databases, one for nodes and another for edges. However, in a relational database you know in advance which joins are required to complete a query, whereas for graph queries you may need to perform recursive search to find the node you are looking for. There exist well-known algorithms that can operate on these graphs, for example min-cut for social networks or shortest path for car naviagtion systems. 

Related topics:

**Schema-on-read** vs **Schema-on-write**: reference to the relative flexibility (whether or not schema is enforced) of relational and document databases. Relational databases are schema-on-write and document databases are schema-on-read. We can imagine schema-on-read is similar to dynamic (runtime) type checking in programming languages, whereas schema-on-write is similar to static (compile-time) type checking.


**Object-Relational Mapping** (ORM): most app development done in object-oriented programming languages, which necessitates an awkeard transition layer between objects in app code and database tables. Frameworks that reduce the amount of boilerplate code required for transition layer, including Hibernate (Java), Django (Python), Entity Framework (.NET), Laravel (PHP), Javascript / Node.js (Mongoose) and ActiveRecord (Ruby).


**Query Languages: Declarative vs Imperative**: Declarative languages (e.g. SQL, CSS, XSL) allow you to specify the desired output pattern, but not *how* to achieve that goal.It is up to the database query optimizer to decide which indexes and join methods to use in implementation. Hiding these implementation details allows database developers to introduce performance improvements (e.g. parallel execution if resources available) without requiring any changes to the query API. In contrast, imperative langauges specify the exact implementation of a query. Most commonly used programming languages are imperative (e.g. python, cpp, rust, etc.)


## Storage and Retrieval
The internals of a storage engine dictate how data is stored and retrieved. This is largely abstracted away from the app developer, but he/she should know roughly how it works in order to pick the best (most performant) product for the use case. 

A simple **key-value store** database is implemented below in two bash functions:
```bash
#!/bin/bash

db_set () {
  echo "$1,$2" >> database
}

db_get () {
  grep "^$1," database | sed -e "s/^$1,//" | tail -n 1
}
```
The underlying storage format is just a text file where each line contains a key-value pair separated by a comma (roughly a csv file). New entries are appended (like a *log*, nothing ever deleted) and so the retrieval function specifies that we just fetch the last occurence. 

### Transactional vs anaytical workloads
While SQL (relational databases) proved quite flexible at handling both transaction and analytics workloads, these days we use different databases for analytics, called "data warehouses".

- **Transaction processing** (OLTP): Typically user-facing and handle a large volume of write requests. Disk seek time is the bottleneck. Application uses a key to request records and storage engine uses an index to find corresponding data. OLTP storage engines are either *log-structured* (append and delete only e.g. Bitcask, SSTables, LSM-trees) or *update-in-place* (overwrite fixed-size pages e.g. B-trees). See [indexes](#Indexes) section for different models.

- **Analytics processing** (OLAP): Typically handle much lower volume of queries, but each query is very demanding. Disk and memory bandwidth are the bottleneck. Idea is to use *data warehouses* which combine inputs from multiple OLTP systems into a combined storage engine that analysts can query without risk of harming critical operations.

  - **Data Warehouse Schemas** (Star & Snowflake): Data Warehouses often use a relational data model with the SQL query language, however, their schema is fundamentally different to facilitate vectorized operations and column-wise queries. Teradata, SAP HANA, Amazon RedShift (ParAccel), and open-sourced Hadoop projects (Apache Hive, Spark SQL, Impala). 
    
    The star schema refers to a *fact table* surrounded by linked *dimension tables*.The fact table is a raw long format dataset that combines all OLTP inputs, where each row represents an event at occurred at a particular time (event log). The dimension tables represent the who, what, where, when, how and why (metadata) of the events from the fact table. 

    ![Example of a star schema for use in a data warehouse](/imgs/figure3-9.png)


  - **Column-oriented storage**: Fact tables can growth to be petabytes of data with trillions of rows and thousands of columns. This makes them complicated to query in aggregate, but generally we only care about a few columns at a time (e.g. 10 features from an ML model). Most OLTP databases are row-oriented, but for data warehouses it is much more efficient to store data columnwise since it lends itself well to compression (e.g. bitmap or run-length encoding) and vectorized in-memory operations. 
  
    Note, compression techniques tend to take adavantage of the fact that the number of distinct values in a column is typically small comapred to the number of rows.

    ![Column-oriented relational data storage](/imgs/figure3-10.png)


- **Extract-Transform-Load** (ETL): Process of getting data from OLTP databases into our OLAP data warehouse. Data is extracted (periodic dump or continuous stream), transformed into analysis-friendly schema (fact table / event log), and loaded into data warehouse.    
 
![Extract-Transform-Load (ETL) from OLTP databases to Data Warehouse](/imgs/figure3-8.png)

### Indexes
While `db_set` is a fast operation (append operation is $O(1)$), `db_get` requires us to check every entry $O(n)$ which is considered very slow. Indexes keep some additional metadata which acts as a signpost to help you more efficiently search. Note, an index is an *additional* data structure that can often be swapped out without changing the contents of the database. Indexes slow down write operations. Trade-off between read vs write efficiency of storage systems. 

- **Hash Index**: Whenever you append a new key-value pair, you also update the hash map to reflect the offset (in bytes) of the data you just wrote. The hash map itself is typically stored in RAM which limits the number of keys you can store, but achieves high performance reads and writes.
  
![in-memory hash map](/imgs/figure3-1.png)

- **Sorted String Table** (SSTable): Idea is to sort by key value, and each key appears only once within each merged segment file. This makes merging segments simple and efficient (mergsort algorthim applied when new data is written to disk), but more importantly allows our key index to be larger than machine memory. We do this by only retaining a *sparse* index table in memory that we can use to find the right small range of key-value pairs (often a compressed block) to search through. 

- **Log-Structured Merge Tree** (LSM-Tree): Cascade of SSTables that are merged in the background. When write comes in, add it to an in-memory tree data structure (memtable). When memtable becomes large enough, write to disk as an SSTable. To serve a read request, first try memtable, then most recent on-disk segment, and so on. From time to time, run a merging and compacting process in the background to combine segment files and discard overwritten or deleted values. Less memory overhead, more efficient disk usage (less fragmentation due to sequential storage) and faster write operations than B-trees. Comparable for read operations depending on workload.

![SSTable with sparse in-memory index](/imgs/figure3-5.png)

- **B-Tree** (1970, e.g. LMDB): While the industry is shifting to log-structured databases, B-trees remain the most widely used indexing structure and are the standard for relational databases. B-trees also keep data sorted by key, but break database down into fixed-size 4 kb blocks (similar to underlying hardware). Whenever you want to lookup a key, you start at the *root page* which covers the entire range of keys and references child pages for accessing smaller continuous segments from the database. We follow this parent-child links until we arrive at the left node representing our search key and value. A tree with n keys always has depth $O(log n)$. Most databases fit into a B-tree that is 3-4 layers deep, e.g. 4-level tree of 4 kb pages with branching factor of 500 can store up to 256 Tb. 

![Key lookup using B-tree index](/imgs/figure3-6.png)


\pagebreak
## Glossary
- **Data model**: format / schema in which you pass the database data
- **Query language**: mechanism by which you can ask for data from your database