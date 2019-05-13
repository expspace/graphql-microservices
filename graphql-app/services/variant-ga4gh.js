var rp = require('request-promise');
var baseUrls = require('../config').baseServiceUrls;
var {variantSetId, referenceName} = require('../config');

export default {
    getVariants(callSetId, args) {

        let options = {
            method: "POST",
            uri: `${baseUrls.localGA4GH}/variants/search`,
            body: {
                variantSetId: variantSetId,
                callSetIds: [callSetId],
                referenceName : referenceName,
                start: args.start,
                end: args.end
            },
            json: true
        };

        return rp(options)
            .then(res => res.variants)
    },
}