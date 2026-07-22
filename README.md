# Elastic Search

Use elastic search for **search and analytics**

This engine is built on top of **Apache Lucene**

We are using docker container to run the services:

- elasticsearch
- kibana

### Table of Content

[Elastic Search](#elastic-search-info)

[Kibana](#kibana)

[Terminology](#terminology)

## Elastic Search Info

Elasticsearch is a highly scalable, open-source search and analytics engine built on Apache Lucene. It stores data in flexible JSON format and uses "inverted indices" to deliver near-instant full-text search, data aggregation, and vector search capabilities across massive datasets

[Read more](./docs/elasticsearch.md)

## Kibana

Kibana is the official analytics, search, and visualization interface for Elasticsearch

It allows you to

- query real-time data
- build interactive dashboards
- perform geospatial analysis
- run machine learning models

[Read more](./docs/kibana.md)

## Terminology

Index = table
Document = row
Mapping = schema/types
Query DSL = advanced WHERE + ranking
Aggregations = GROUP BY + metrics
Kibana = UI for querying, exploring, dashboards
