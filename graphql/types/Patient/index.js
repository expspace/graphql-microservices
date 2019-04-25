export default `
  type Patient {
    resourceType: String
    id: String!
    gender: String!
    active: Boolean
    extension: [Extension]
    deceasedDateTime: String
    birthDate: String
    name: [Name]
    variants(start: String!, end: String!): [Variant]
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
    patients(
        conditionCode: String,
        observationCode: String,
        procedureCode: String,
        allergyInteranceCode: String,                
     ): [Patient]
  }
`;


