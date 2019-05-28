var rp = require('request-promise');
var {baseServiceUrls, rnagetApiKey} = require('../config');

export default {
    getExpressions(featureNameList) {
        let query = prepQueryString(featureNameList);

        let url = `${baseServiceUrls.deployedRnaget}/expressions/search?${query}`;

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

function prepQueryString(featureNameList) {
    let queryArray = [];

    if(featureNameList) {
        queryArray.push('featureNameList=' + featureNameList.join(','));
    }
    queryArray.push('featureThresholdLabel=name');
    queryArray.push('output=json');

    return queryArray.join('&');
}
