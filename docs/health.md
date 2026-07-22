# Health Checkup

Check if services are running properly

[Elastic Search Check](#elastic-search-check)

## Elastic Search Check

Ping to check if elastic search is working on local port

```bash
curl http://localhost:9200
```

```bash
curl http://localhost:9200/_cluster/health?pretty
```

Here, if pretty doesn't work remove it and try rest

```bash
curl http://localhost:9200/_cluster/health
```
