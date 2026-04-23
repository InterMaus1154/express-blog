import express from 'express';

export const postRouter = express.Router();


postRouter.post('/', (req, res) => {
    res.json({
        data: req.body
    })
});