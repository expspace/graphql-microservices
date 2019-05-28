export default `
  type PatientQueryResponse {
    patient_count: Int
    variant_count: Int
    gofhir_response_time: Int
    ga4gh_response_time: Int
    
    patients: [Patient]
    
    variantNextPageToken: String
    variants: [Variant]
    
    rnaExpressions: Expression
  }
  
  type Patient {
    resourceType: String
    id: String!
    callSetId: String
    sampleId: String
    gender: String!
    active: Boolean
    extension: [Extension]
    deceasedDateTime: String
    birthDate: String
    name: [Name]
    variants: [Variant]
  }
  
  type Name {
    use: String
    family: String
    given: [String]
  }
  
  type Extension {
    url: String
    valueCodeableConcept : ValueCodeableConcept
  }
  
  type ValueCodeableConcept {
    coding : [Code]
    text: String
  }
  
  type Code {
    system : String
    code : String
    display: String
  }
  
  type Query {
    patient(id: String!): Patient
    filter_patients(
        conditionCode: String,
        observationCode: String,
        procedureCode: String,
        allergyIntoleranceCode: String,   
                     
        start: String,
        end: String,
        pageToken: String
        
        featureNameList: [String]
     ): PatientQueryResponse
  }   
`;


