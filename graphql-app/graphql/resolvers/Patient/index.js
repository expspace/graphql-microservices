
// The User schema.
import PatientService from "../../../services/patient-gofhir";
import VariantService from "../../../services/variant-ga4gh";
import ExpressionService from "../../../services/expression-rnaget";
import {GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP} from "../../../gofhir-ga4gh-id-map";


export default {
    Query: {
        patient(_, args) {
            return PatientService.getPatient(args);
        },

        async patients_query(_, args) {

            let {elapsedTimeGofhir, patientList} = await PatientService.getPatients(args);

            patientList.forEach(patient => {
                patient.callSetId = GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP[patient.id];
            });

            let callSetIds = patientList.map(patient => GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP[patient.id]);
            let {elapsedTimeGa4gh, nextPageToken, variantList} = await VariantService.getVariants(callSetIds, args);

            let rnagetExpressions = await ExpressionService.getExpression();

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