import express from 'express';
import {db} from './database/db.js';
import {auth} from "./middleware/auth.js";
import {fileRouter} from "./routes/files.js";
import {authRouter} from "./routes/auth.js";

const app = express();

const __dirname = import.meta.dirname;

app.use(express.json());
app.use(express.static("public", {extensions: ['html']}));


app.use(authRouter);

app.get("/", auth, (req, res) => {
    res.status().json();
});


app.listen(3000, () => {
    console.log("Server running on 3000");
});
