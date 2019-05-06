import express from "express";
import expressGraphQL from "express-graphql";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from 'morgan'

import schema from "./graphql/";

const app = express();
const PORT = process.env.PORT || "8004";

app.use(morgan('dev'));

app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressGraphQL({
        schema,
        graphiql: true
    })
);


app.get('/', (req, res) => {
    res.send("test endpoint")
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));