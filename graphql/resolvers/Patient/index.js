
// The User schema.
// import PatientService from "../../../services/patient-nodemongo";
import PatientService from "../../../services/patient-gofhir";
import VariantService from "../../../services/variant-ga4gh";

export default {
    Query: {
        patient(_, args) {
            // console.log('patient resolver');
            return PatientService.getPatient(args);
        },

        patients(_, args) {
            return PatientService.getPatients(args);
        },
    },

    Patient: {
        variants(patient, args) {
            // console.log('variant resolver');
            return VariantService.getVariants(patient, args);
        },
    },

};