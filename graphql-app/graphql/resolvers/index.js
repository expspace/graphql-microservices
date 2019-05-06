
import { mergeResolvers } from "merge-graphql-schemas";

import Patient from "./Patient/";
import Variant from "./Variant/";


const resolvers = [Patient, Variant];

export default mergeResolvers(resolvers);