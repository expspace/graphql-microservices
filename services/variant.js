var rp = require('request-promise');
var baseUrls = require('../config').BASE_SERVICE_URLS;

//base url ga4gh api

const VARIANT_SET_ID = "WyJ0ZXN0ZGF0YXNldCIsInZzIiwiZ2E0Z2gtZXhhbXBsZS1kYXRhIl0";
const REFERENCE_NAME = "1";

export default {
    getVariants(patient, args) {

        let options = {
            method: "POST",
            uri: `${baseUrls.baseGA4GHUrl}variants/search`,
            body: {
                variantSetId: VARIANT_SET_ID,
                callSetIds: [patient.id],
                referenceName : REFERENCE_NAME,
                start: args.start,
                end: args.end
            },
            json: true
        };

        return rp(options)
            .then(res => res.variants);
    },
}