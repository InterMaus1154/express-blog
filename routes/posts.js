import express from 'express';
import {db} from "../database/db.js";
import {postValidator} from "../validators/post.js";
import {validate} from "../middleware/validate.js";

export const postRouter = express.Router();

postRouter.get('/',(req, res) => {

});

postRouter.get('/', (req, res) => {

    const posts = db.prepare("SELECT * FROM posts p INNER JOIN post_categories pc ON pc.post_id = p.post_id").all();

    res.json({
        posts: posts
    });
});

postRouter.post('/', postValidator, validate, (req, res) => {
    res.json({
        data: req.body
    })
});
