### GraphQL-microservices

GraphQL API layer which is used to combine data from separate microservices. Queries for FHIR patient 
metadata are first sent to a [gofhir](https://github.com/synthetichealth/gofhir) server and can be 
filtered based on condition, allergy intolerance, procedure or observation. Variant and rna expression 
data are then requested from [ga4gh](https://github.com/ga4gh/ga4gh-server) and [rnaget](https://github.com/CanDIG/rnaget_service) 
services respectively.  

### Architecture

![candig-query-arch-diagram](diagram/CanDIG-query%20-%20architecture-diagram.png)

### Installation
```
git clone https://github.com/expspace/graphql-microservices.git
cd graphql-microservices
sudo docker-compose up
```
### FHIR DB 

To load the clinical data (taken from the Synthetic Mass subsample of 1000 synthetic patients), run 
the following:

```
cd data/ingest
tar -xzvf mongo_fhir_dump.tgz
mongorestore dump
```

### Installation ga4gh-server

To install ga4gh-server in a virtual environment use the following instructions which are based on 
https://ga4gh-server.readthedocs.io/en/latest/demo.html

```
mkdir -p ~/ga4gh/server/templates
touch ~/ga4gh/server/templates/initial_peers.txt

sudo apt-get update && apt-get install -y \
    python-dev \
    python-virtualenv \
    zlib1g-dev \
    libxslt1-dev \
    libffi-dev \
    libssl1.0-dev
    
virtualenv ga4gh-env
source ga4gh-env/bin/activate

(ga4gh-env) $ pip install ga4gh-server --pre

(ga4gh-env) $ ga4gh_server // run server

``` 


### ga4gh 1000 genomes variant data

Using the [ga4gh data repository](https://ga4gh-server.readthedocs.io/en/latest/datarepo.html) load the 1000 genome 
variant dataset into ga4gh_server

From virtualenv create the registry and dataset

```
mkdir ~/ga4gh-example-data
cd ~/ga4gh-example-data
ga4gh_repo init registry.db
ga4gh_repo add-dataset registry.db 1kgenomes
```

Load reference set into ga4gh

```
wget ftp://ftp.1000genomes.ebi.ac.uk//vol1/ftp/technical/reference/phase2_reference_assembly_sequence/hs37d5.fa.gz
gunzip hs37d5.fa.gz
bgzip hs37d5.fa
ga4gh_repo add-referenceset -n NCBI37 registry.db ~/ga4gh-example-data/GRCh37-subset.fa.gz
```

Load the 1000 genomes variant dataset 

```
wget -r https://datahub-khvul4ng.udes.genap.ca/
ga4gh_repo add-variantset registry.db 1kgenomes /full/path/to/release-1000-genomes/ --name phase3-release --referenceSetName NCBI37

```

### Initialize ID mapping 
Map the gofhir patient record IDs to ga4gh call set IDs and rnaget sample IDs
``` 
node scripts/initialize-id-map.js
```
### Add .env 
```
RNAGET_API_KEY=...
```


### TODOs

- [ ] containerize GA4GH
- [ ] containerize rnaget 
- [x] include graphql query examples
- [x] init script for gofhir to ga4gh ID map 
- [x] architecture diagram
- [x] incorporate third service 

### Known issues

Patient queries to latest gofhir version (used in docker compose) are really slow. Was able to work around by using an older 
version of [gofhir](https://github.com/synthetichealth/gofhir/tree/8f01482a931d75d81031c666f44cbe35a223b826)  

