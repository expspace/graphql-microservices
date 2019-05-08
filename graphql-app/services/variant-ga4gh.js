var rp = require('request-promise');
var baseUrls = require('../config').BASE_SERVICE_URLS;
var constants = require('../constants');

export default {
    getVariants(callSetId, args) {

        let options = {
            method: "POST",
            uri: `${baseUrls.localGA4GH}variants/search`,
            body: {
                variantSetId: constants.VARIANT_SET_ID,
                callSetIds: [callSetId],
                referenceName : constants.REFERENCE_NAME,
                start: args.start,
                end: args.end
            },
            json: true
        };

        return rp(options)
            .then(res => res.variants)
    },
}