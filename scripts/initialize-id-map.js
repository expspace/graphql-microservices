/* initialize-id-map.js */

/* script which initializes service-id-map.js which associates resources from separate services.
   For this project we made the assumption that a callset record in ga4gh associates to a single patient
   in gofhir and a sample in rnaget also does the same

   - creates map for gofhir patient IDs to ga4gh callset IDs
   - creates map for gofhir patient IDs to rnaget sample IDs
*/

const rp = require('../graphql-app/node_modules/request-promise');
const fs = require('fs');
const path = require('path');
const {baseServiceUrls, variantSetId, rnagetApiKey} = require('../graphql-app/config');

const idMapPath = path.join(__dirname, '../graphql-app/service-id-map.js');

// fetch gofhir patient id list
let url = `${baseServiceUrls.localGofhir}/Patient?_count=10000`;
let gofhirPatientIdList = rp(url)
    .then(response => JSON.parse(response))
    .then(response => response.entry.map(item => item.resource.id));

// fetch ga4gh callset id list
let options = {
    method: "POST",
    uri: `${baseServiceUrls.localGA4GH}/callsets/search`,
    body: {
        variantSetId: variantSetId,
        pageSize: 10000
    },
    json: true,
};

let ga4ghCallsetIdList = rp(options)
    .then(response => response.callSets.map(item => item.id));

// fetch rnaget id samplelist
let rnagetOptions = {
    method: "GET",
    uri: `${baseServiceUrls.deployedRnaget}/studies/search`,
    headers: {
        api_key: rnagetApiKey
    },
    json: true,
};

let rnagetSampleIDList = rp(rnagetOptions)
    .then(res => res[0].sampleList);

Promise.all([gofhirPatientIdList, ga4ghCallsetIdList, rnagetSampleIDList])
    .then(values => createIdMap(values[0], values[1], values[2]))
    .then(data => fs.writeFileSync(idMapPath, data));

/**
 * Creates a service-id-map.js string
 * @param {Object} options config options
 */

function createIdMap(gofhirPatientIdList, ga4ghCallsetIdList, rnagetSampleIDList) {
    let string = "";

    string = string.concat(`/** Constant used to map gofhir patient IDs to ga4gh callset IDs **/\n\n`);
    string = string.concat(`export const GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP = {};\n\n`);

    for(var i = 0; i< gofhirPatientIdList.length; i++) {
        string = string.concat(`GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP["${gofhirPatientIdList[i]}"]`);
        string = string.concat(' = ');
        string = string.concat(`"${ga4ghCallsetIdList[i % ga4ghCallsetIdList.length]}";\n`);
    }

    string = string.concat(`\n\n/** Constant used to map gofhir patient IDs to rnaget sample list IDs **/\n\n`);
    string = string.concat(`export const GOFHIR_ID_TO_RNAGET_SAMPLE_ID_MAP = {};\n\n`);

    for(var i = 0; i< gofhirPatientIdList.length; i++) {
        string = string.concat(`GOFHIR_ID_TO_RNAGET_SAMPLE_ID_MAP["${gofhirPatientIdList[i]}"]`);
        string = string.concat(' = ');
        string = string.concat(`"${rnagetSampleIDList[i % rnagetSampleIDList.length]}";\n`);
    }

    return string;
}
