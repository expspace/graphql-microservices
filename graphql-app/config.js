var dotenv = require('dotenv').config();

module.exports = {
     baseServiceUrls : {
          localGA4GH : 'http://localhost:8000',
          // localGA4GH : 'http://ga4gh:8000/',

          localGofhir : 'http://localhost:3001',
          // localGofhir : 'http://gofhir:3001',

          deployedRnaget : 'https://candig.bcgsc.ca/rnaget'
     },

     variantSetId : "WyIxa2dlbm9tZXMiLCJ2cyIsInBoYXNlMy1yZWxlYXNlIl0",

     referenceName : "1",

     maxPageSize : 500,

     rnagetApiKey : process.env.RNAGET_API_KEY
};