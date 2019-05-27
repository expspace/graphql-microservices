
import { mergeResolvers } from "merge-graphql-schemas";

import Patient from "./Patient/";

const resolvers = [Patient];

export default mergeResolvers(resolvers);