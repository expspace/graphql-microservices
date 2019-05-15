var rp = require('request-promise');
var baseUrls = require('../config').baseServiceUrls;
var {variantSetId, referenceName} = require('../config');

export default {
    getVariants(callSetIds, args) {

        let options = {
            method: "POST",
            uri: `${baseUrls.localGA4GH}/variants/search`,
            body: {
                variantSetId: variantSetId,
                callSetIds: callSetIds,
                referenceName : referenceName,
                start: args.start,
                end: args.end
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