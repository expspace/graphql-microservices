var rp = require('request-promise');
var {baseServiceUrls, variantSetId, referenceName, maxPageSize} = require('../config');

export default {
    getVariants(callSetIds, ga4ghInput) {

        let options = {
            method: "POST",
            uri: `${baseServiceUrls.localGA4GH}/variants/search`,
            body: {
                variantSetId: variantSetId,
                callSetIds: callSetIds,
                referenceName : referenceName,
                start: ga4ghInput.start,
                end: ga4ghInput.end,
                pageSize: maxPageSize,
                pageToken: ga4ghInput.pageToken
            },
            json: true,
            time: true,
            resolveWithFullResponse: true
        };

        return rp(options)
            .then(res => {
                return {
                    elapsedTimeGa4gh: res.elapsedTime,
                    nextPageToken: res.body.nextPageToken,
                    variantList: res.body.variants
                }})
    },
}