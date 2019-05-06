var rp = require('request-promise');
var baseUrls = require('../config').BASE_SERVICE_URLS;

export default {
    getPatient(args) {
        return rp(`${baseUrls.baseUrlNodeFhirMongo}/Patient/${args.id}`)
            .then(response => JSON.parse(response));
    },

    getPatients(args) {
        let query = prepQueryParams(args);

        let url = `${baseUrls.baseUrlNodeFhirMongo}/Patient` + (query? `?${query}`: "");

        let patientList = rp(url)
            .then(response => JSON.parse(response))
            .then(response => response.entry.map(patient => patient.resource));

        return patientList;
    }

}

function prepQueryParams(args) {

    let queryString  = "";
    for(var prop in args) {
        let paramString = `${prop}=${args[prop]}`;
        queryString += paramString;
    }

    return queryString;
}