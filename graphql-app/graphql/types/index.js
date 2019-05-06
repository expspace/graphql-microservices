import { mergeTypes } from "merge-graphql-schemas";

import Patient from "./Patient/";
import Variant from "./Variant/";

const typeDefs = [Patient, Variant];

export default mergeTypes(typeDefs, { all: true });