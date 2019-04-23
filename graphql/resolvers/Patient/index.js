
// The User schema.
import PatientService from "../../../services/patient";
import VariantService from "../../../services/variant";

export default {
    Query: {
        patient(_, args) {
            console.log('patient resolver');
            return PatientService.getPatient(args);
        },

        patients(_, args) {
            return PatientService.getPatients(args);
        },
    },

    Patient: {
        variants(patient, args) {
            console.log('variant resolver');
            console.log(patient.id);
            return VariantService.getVariants(patient, args) ;
        },
    },

};