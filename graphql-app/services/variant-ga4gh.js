var rp = require('request-promise');
var baseUrls = require('../config').BASE_SERVICE_URLS;
var constants = require('../constants');
var gofhirGA4GHIdMap = require('../gofhir-ga4gh-id-map').GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP;

export default {
    getVariants(patient, args) {

        let options = {
            method: "POST",
            uri: `${baseUrls.localGA4GH}variants/search`,
            body: {
                variantSetId: constants.VARIANT_SET_ID,
                callSetIds: [gofhirGA4GHIdMap[patient.id]],
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