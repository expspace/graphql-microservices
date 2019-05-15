/* initialize-id-map.js */

/* script which initializes gofhir-ga4gh-id-map.js
   gofhir-ga4gh-id-map.js maps gofhir patient IDs to ga4gh callset IDs in order to link
   patient records with variant information from separate systems*/

const rp = require('../graphql-app/node_modules/request-promise');
const fs = require('fs');
const path = require('path');
const {baseServiceUrls, variantSetId} = require('../graphql-app/config');

const idMapPath = path.join(__dirname, '../graphql-app/gofhir-ga4gh-id-map.js');

// fetch gofhir patient id list
let url = `${baseServiceUrls.localGofhir}/Patient?_count=10000`;
let patientIdList = rp(url)
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

let callsetIdList = rp(options)
    .then(response => response.callSets.map(item => item.id));

Promise.all([patientIdList, callsetIdList])
    .then(values => createIdMap(values[0], values[1]))
    .then(data => fs.writeFileSync(idMapPath, data));

/**
 * Creates a gofhir-ga4gh-id-map.js string
 * @param {Object} options config options
 */

function createIdMap(patientIdList, callsetIdList) {
    let string = "";

    string = string.concat(`/** Constant used to map gofhir patient IDs to ga4gh callset IDs **/\n\n`);
    string = string.concat(`export const GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP = {};\n\n`);

    for(var i = 0; i< patientIdList.length; i++) {
        string = string.concat(`GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP["${patientIdList[i]}"]`);
        string = string.concat(' = ');
        string = string.concat(`"${callsetIdList[i % callsetIdList.length]}";\n`);
    }

    return string;
}
