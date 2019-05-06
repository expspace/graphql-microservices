var rp = require('request-promise');
var baseUrls = require('../config').BASE_SERVICE_URLS;
var gofhirGA4GHIdMap = require('../gofhir-ga4gh-id-map').GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP;
var paramToResourceMap = require('../constants').GQL_PARAM_TO_RESOURCE_MAP;

export default {
    getPatient(args) {
        return rp(`${baseUrls.localGofhir}/Patient/${args.id}`)
            .then(response => {
                console.log(response);
                return response
            })
            .then(response => JSON.parse(response));
    },

    getPatients(args) {
        let query = prepQueryString(args);

        let url = `${baseUrls.localGofhir}/Patient` + (query? `?${query}`: "");

        let patientList = rp(url)
            .then(response => JSON.parse(response))
            .then(response => {console.log(response); return response} )
            .then(response => response.entry.map(patient => patient.resource))
            // .then(filterPatientsWithIDMap);

        return patientList;
    }
}

//include only patients in patient list which have mappings from gofhir ID to ga4gh callset ID

function filterPatientsWithIDMap(patients) {
    return patients.filter(patient => Object.keys(gofhirGA4GHIdMap).includes(patient.id));
}

function prepQueryString(args) {
    let queryArray = [];
    for(var key in args) {
        queryArray.push(`_has:${paramToResourceMap[key]}:patient:code=${args[key]}`);
    }
    return queryArray.join('&');
}