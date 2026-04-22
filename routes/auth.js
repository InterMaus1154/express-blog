import express from "express";

export const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
    console.log(req.body);
    res.json({message: "Received"})
});