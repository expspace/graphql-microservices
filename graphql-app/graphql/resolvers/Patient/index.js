
// The User schema.
import PatientService from "../../../services/patient-gofhir";
import VariantService from "../../../services/variant-ga4gh";
import {GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP} from "../../../gofhir-ga4gh-id-map";


export default {
    Query: {
        patient(_, args) {
            return PatientService.getPatient(args);
        },

        async patients_query(_, args) {

            let patientList = await PatientService.getPatients(args);
            patientList.forEach(patient => {
                patient.callSetId = GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP[patient.id];
            });

            let callSetIds = patientList.map(patient => GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP[patient.id]);
            let variantList = await VariantService.getVariants(callSetIds, args);



            return {
                patient_count : patientList.length,
                variant_count: variantList.length,
                patients : patientList,
                variants : variantList
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