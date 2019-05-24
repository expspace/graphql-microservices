export default `
  type Expression {
    expression: [SampleValues]
    features: [String]
    units: String
    study: String
  }
  
  type SampleValues {
    sampleId: String
    values: [Float]    
  }  
`;