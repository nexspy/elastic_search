# Elastic Search

Use elastic search for **search and analytics**

This engine is built on top of **Apache Lucene**

We are using docker container to run the services:

- elasticsearch
- kibana
- backend (expressjs)

### Table of Content

[Architecture / How it works](#architecture--how-it-works)

[Setup and Run](#setup-and-run)

[Elastic Search](#elastic-search-info)

[Kibana](#kibana)

[Terminology](#terminology)

## Architecture / How it works

We run the docker and all services start. If not, check docker desktop application and run them as Kibana requires elasticsearch service to start and run first.

We have endpoint in our backend named **/demo** where we can send POST request, that data (json) will be indexed as document. Now, the data has entered Elasticsearch.

We can visually see these data in elasticsearch using the **Kibana** tool. Build dashboards, view spatial data in maps, and build tons of things yet to explore.

## Setup and Run

Docker is being used

[View docs](./docs/setup.md)

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
