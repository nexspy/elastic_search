# Aggregation

[Official documentation](https://www.elastic.co/docs/explore-analyze/query-filter/aggregations)

An aggregation summarizes your data as metrics, statistics, or other analytics. Aggregations help you answer questions like:

- What’s the average load time for my website?

- Who are my most valuable customers based on transaction volume?

- What would be considered a large file on my network?

- How many products are in each product category?

## Table of Content

- [Three Categories](#three-categories)

- [Sample Query](#sample-query)

## Three Categories

1. Metric

2. Bucket

3. Pipeline

## Sample Query

Example: The following search runs a terms aggregation on my-field

```json
GET /my-index-000001/_search
{
	"aggs": {
		"my-agg-name": {
			"terms": {
				"field": "my-field"
			}
		}
	}
}
```
