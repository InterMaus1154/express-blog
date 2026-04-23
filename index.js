import express from 'express';

import {authRouter} from "./routes/auth.js";
import {logger} from './middleware/logger.js';
import {auth} from "./middleware/auth.js";
import {postRouter} from "./routes/posts.js";

const app = express();

const __dirname = import.meta.dirname;

app.use(express.json());
app.use(express.static("public", {extensions: ['html']}));

app.use(logger);

app.use(authRouter);
app.use("/posts", auth, postRouter);


app.listen(3000, () => {
    console.log("Server running on 3000");
});
