var rp = require('request-promise');
var {baseServiceUrls, variantSetId, referenceName, maxPageSize} = require('../config');

export default {
    getVariants(callSetIds, args) {

        let options = {
            method: "POST",
            uri: `${baseServiceUrls.localGA4GH}/variants/search`,
            body: {
                variantSetId: variantSetId,
                callSetIds: callSetIds,
                referenceName : referenceName,
                start: args.start,
                end: args.end,
                pageSize: maxPageSize
            },
            json: true,
            time: true,
            resolveWithFullResponse: true
        };

        return rp(options)
            .then(res => {
                return {
                    variantList: res.body.variants,
                    elapsedTimeGa4gh: res.elapsedTime
                }})
    },
}