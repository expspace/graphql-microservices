var rp = require('request-promise');
var {baseServiceUrls, rnagetApiKey} = require('../config');

export default {
    getExpression(args) {

        let url = `${baseServiceUrls.deployedRnaget}/expressions/search?minExpression=ENSG00000000003%2C30%2CENSG00000000005%2C10&featureThresholdLabel=id`;

        let options = {
            method: "GET",
            uri: url,
            headers: {
                api_key: rnagetApiKey
            },
            // time: true,
            // resolveWithFullResponse: true
        };

        return rp(options)
            .then(JSON.parse)
            .then(res => rp(res[0].URL)) //TODO fetch json from all studies in array - only fetching first study for demo purposes
            .then(JSON.parse)
            .then(setNonDynamicKeys)
        
    },
}

/**
 * Transforms rnaget json response so that sample-ids are not used as dynamic keys which is needed
 * for graphql schemas.
 *
 */

function setNonDynamicKeys(rnagetResponse) {
    rnagetResponse.expression = Object.keys(rnagetResponse.expression)
        .map(key => {return {sampleId: key, values: rnagetResponse.expression[key]}});
    return rnagetResponse;
}

// function prepQueryString(args) {
//     let queryArray = [];
//     for(var key in args) {
//         if(key in paramToResourceMap) {
//             queryArray.push(`_has:${paramToResourceMap[key]}:patient:code=${args[key]}`);
//         }
//     }
//     return queryArray.join('&');
// }
