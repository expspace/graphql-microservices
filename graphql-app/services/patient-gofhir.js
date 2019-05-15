var rp = require('request-promise');
var {baseServiceUrls, maxPageSize} = require('../config');
var paramToResourceMap = require('../constants').GQL_PARAM_TO_RESOURCE_MAP;

export default {
    getPatient(args) {
        return rp(`${baseServiceUrls.localGofhir}/Patient/${args.id}`)
            .then(response => JSON.parse(response));
    },

    getPatients(args) {
        let query = prepQueryString(args);

        let url = `${baseServiceUrls.localGofhir}/Patient?_count=${maxPageSize}` + (query? `&${query}`: "");

        return rp({time: true, url: url, resolveWithFullResponse: true})
            .then(response => {
                return {
                    elapsedTimeGofhir : response.elapsedTime,
                    patientList : JSON.parse(response.body).entry.map(patient => patient.resource)
                }
            })
    }
}

function prepQueryString(args) {
    let queryArray = [];
    for(var key in args) {
        if(key in paramToResourceMap) {
            queryArray.push(`_has:${paramToResourceMap[key]}:patient:code=${args[key]}`);
        }
    }
    return queryArray.join('&');
}