
// The User schema.
import PatientService from "../../../services/patient-gofhir";
import VariantService from "../../../services/variant-ga4gh";
import {GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP} from "../../../gofhir-ga4gh-id-map";


export default {
    Query: {
        patient(_, args) {
            return PatientService.getPatient(args);
        },

        patients(_, args) {
            return PatientService.getPatients(args);
        },
    },

    Patient: {
        variants(patient, args) {
            let callSetId = GOFHIR_ID_TO_GA4GH_CALLSET_ID_MAP[patient.id];
            return VariantService.getVariants(callSetId, args);
        },
    },

};