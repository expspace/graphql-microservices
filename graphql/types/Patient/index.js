export default `
  type Patient {
    id: String!
    gender: String!
    active: Boolean
    deceasedBoolean: Boolean
    resourceType: String
    birthDate: String
    name: [Name]
    variants(start: String!, end: String!): [Variant]
  }
  
  type Query {
    patient(id: String!): Patient
    patients(gender: String): [Patient]
  }
  
  type Name {
    use: String
    family: String
    given: [String]
  }
`;


