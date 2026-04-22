import express from 'express';

import {authRouter} from "./routes/auth.js";

const app = express();

const __dirname = import.meta.dirname;

app.use(express.json());
app.use(express.static("public", {extensions: ['html']}));

app.use(authRouter);


app.listen(3000, () => {
    console.log("Server running on 3000");
});
