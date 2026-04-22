import express from "express";
import {db} from "../database/db.js";
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

export const authRouter = express.Router();

const generateToken = data => {
    return crypto.createHash("md5").update(data).digest("hex");
};

authRouter.post("/login", async (req, res) => {


    const {identifier, password} = req.body;

    const user = db.prepare("SELECT * FROM users WHERE email = ? OR username = ?").get(identifier, identifier);

    if (!user || !await bcrypt.compare(password, user.password)) {
        res.status(401).json({message: "Invalid credentials"});
        return;
    }

    const token = generateToken(user.email);

    db.prepare("UPDATE users SET token = ?").run(token);

    res.status(200).json({
        message: "Login successful",
        user: {
            username: user.username,
            email: user.email,
            created_at: user.created_at
        },
        token: token
    });
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
    const token = generateToken(email);

    db.prepare("INSERT INTO users (username, email, password, token) VALUES (?,?,?,?)")
        .run(username, email, hash, token);


    res.status(201).json({
        message: "User registered",
        user: {
            username: username,
            email: email,
            created_at: user.created_at
        },
        token: token
    });
});