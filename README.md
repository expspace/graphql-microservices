### GraphQL-microservices

GraphQL API layer which is used to combine data from separate microservices. Queries for patient data are first sent to a [gofhir](https://github.com/synthetichealth/gofhir)
server and then individual variant information is sent to the [ga4gh](https://github.com/ga4gh/ga4gh-server) API.  

### Installation
```$xslt
git clone https://github.com/expspace/graphql-microservices.git
cd graphql-microservices
sudo docker-compose up
```
### FHIR DB

To load the clinical data (taken from the Synthetic Mass subsample of 1000 synthetic patients), run the following:

```$xslt
cd data/ingest
tar -xzvf mongo_fhir_dump.tgz
mongorestore dump
```

### TODOs

- [x] include graphql query examples
- [ ] containerize GA4GH
- [ ] init script for service endpoint configuration 
- [x] init script for gofhir to ga4gh ID map 
- [ ] architecture diagram
- [ ] incorporate third service 

### Known issues

