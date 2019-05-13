/* initialize-id-map.js */

/* script which initializes gofhir-ga4gh-id-map.js
   gofhir-ga4gh-id-map.js maps gofhir patient IDs to ga4gh callset IDs in order to link
   patient records with variant information from separate systems*/

const rp = require('../graphql-app/node_modules/request-promise');
const fs = require('fs');
const path = require('path');

const idMapPath = path.join(__dirname, '../graphql-app/gofhir-ga4gh-id-map.js');

//TODO use config, constants in /grapphql-app (babel transpile?)
const LOCAL_GOFHIR_URL = 'http://localhost:3001';
const LOCAL_GA4GH_URL = 'http://localhost:8000';
const VARIANT_SET_ID = 'WyIxa2dlbm9tZXMiLCJ2cyIsInBoYXNlMy1yZWxlYXNlIl0';

// fetch gofhir patient id list
let url = `${LOCAL_GOFHIR_URL}/Patient?_count=10000`;
let patientIdList = rp(url)
    .then(response => JSON.parse(response))
    .then(response => response.entry.map(item => item.resource.id));

// fetch ga4gh callset id list
let options = {
    method: "POST",
    uri: `${LOCAL_GA4GH_URL}/callsets/search`,
    body: {
        variantSetId: VARIANT_SET_ID,
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
