
// The User schema.
import PatientService from "../../../services/patient-gofhir";
import VariantService from "../../../services/variant-ga4gh";
import ExpressionService from "../../../services/expression-rnaget";
import {GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP} from "../../../service-id-map";
import {GOFHIR_ID_TO_RNAGET_SAMPLE_ID_MAP} from "../../../service-id-map";


export default {
    Query: {
        patient(_, args) {
            return PatientService.getPatient(args);
        },

        async filter_patients(_, args) {

            let {elapsedTimeGofhir, patientList} = await PatientService.getPatients(args);

            let sampleIdList = [];

            patientList.forEach(patient => {
                patient.callSetId = GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP[patient.id];
                patient.sampleId = GOFHIR_ID_TO_RNAGET_SAMPLE_ID_MAP[patient.id];
                sampleIdList.push(GOFHIR_ID_TO_RNAGET_SAMPLE_ID_MAP[patient.id]);
            });

            let callSetIds = patientList.map(patient => GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP[patient.id]);

            let results = await Promise.all([VariantService.getVariants(callSetIds, args),
                ExpressionService.getExpression(args.featureIDs)]);

            let {elapsedTimeGa4gh, nextPageToken, variantList} = results[0];

            let rnagetExpressions = results[1];
            rnagetExpressions.expression = rnagetExpressions.expression.filter(sample => sampleIdList.includes(sample.sampleId));

            return {
                patient_count : patientList.length,
                variant_count: variantList.length,
                gofhir_response_time: elapsedTimeGofhir,
                ga4gh_response_time: elapsedTimeGa4gh,
                patients : patientList,
                variantNextPageToken : nextPageToken,
                variants : variantList,
                rnaExpressions : rnagetExpressions
            };
        },
    },

    /** tried to resolve variant data as a nested patient field but it resulted in many calls to the ga4gh api **/

    // Patient: {
    //     variants(patient, args) {
    //         let callSetId = GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP[patient.id];
    //         return VariantService.getVariants(callSetId, args);
    //     },
    // },

};