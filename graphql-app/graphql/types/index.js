import { mergeTypes } from "merge-graphql-schemas";

import Patient from "./Patient/";
import Variant from "./Variant/";
import Expression from "./Expression/";

const typeDefs = [Patient, Variant, Expression];

export default mergeTypes(typeDefs, { all: true });