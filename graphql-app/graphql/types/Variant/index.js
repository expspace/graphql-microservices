export default `
  type Variant {
    variantSetId: String
    start: String
    end: String
    filtersApplied: Boolean
    filtersPassed: Boolean
    referenceBases: String
    names: [String]
    alternateBases: [String]
    referenceName: Int
    id: String
    calls: [Call]
  }
  
  type Call {
    callSetName: String
    genotype: [Int]
    callSetId: String
    phaseset: String
  }
  
`;