var rp = require('request-promise');
var baseUrls = require('../config').BASE_SERVICE_URLS;
var paramToResourceMap = require('../constants').GQL_PARAM_TO_RESOURCE_MAP;

export default {
    getPatient(args) {
        return rp(`${baseUrls.localGofhir}/Patient/${args.id}`)
            .then(response => JSON.parse(response));
    },

    getPatients(args) {
        let query = prepQueryString(args);

        let url = `${baseUrls.localGofhir}/Patient` + (query? `?${query}`: "");

        let patientList = rp(url)
            .then(response => JSON.parse(response))
            .then(response => response.entry.map(patient => patient.resource))

        return patientList;
    }
}

function prepQueryString(args) {
    let queryArray = [];
    for(var key in args) {
        queryArray.push(`_has:${paramToResourceMap[key]}:patient:code=${args[key]}`);
    }
    return queryArray.join('&');
}