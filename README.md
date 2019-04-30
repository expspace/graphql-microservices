### GraphQL-microservices

GraphQL API layer which is used to combine data from separate microservices. Queries for patient data are first sent to a [gofhir](https://github.com/synthetichealth/gofhir)
server and then individual variant information is sent to the [ga4gh](https://github.com/ga4gh/ga4gh-server) API.  

### Installation


### TODOs

- [ ] include graphql query examples
- [ ] containerization
- [ ] init script for service endpoint configuration 
- [ ] init script for gofhir to ga4gh ID map 
- [ ] architecture diagram 
