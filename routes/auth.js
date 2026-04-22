import express from "express";
import {db} from "../database/db.js";
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

export const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
    console.log(req.body);
    res.json({message: "Received"})
});

authRouter.post("/register", async (req, res) => {
    const {username, email, password} = req.body;

    // check for duplicate email/username
    const user = db
        .prepare("SELECT * FROM users WHERE username = ? OR email = ?")
        .get(username, email);

    if (user) {
        return res.status(422).json({
            message: "Username or email already exists"
        });
    }

    // hash the password
    const hash = await bcrypt.hash(password, 10);

    // create md5 token for auth
    const token = crypto.createHash("md5").update(email).digest("hex");

    db.prepare("INSERT INTO users (username, email, password, token) VALUES (?,?,?,?)")
        .run(username, email, hash, token);


    res.status(201).json({
        message: "User registered",
        user: {
            username: username,
            email: email
        },
        token: token
    });
});