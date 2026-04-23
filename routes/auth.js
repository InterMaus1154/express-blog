import express from "express";
import {db} from "../database/db.js";
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import {auth} from "../middleware/auth.js";
import {registerValidator, loginValidator} from "../validators/auth.js";
import {validate} from "../middleware/validate.js";
import {matchedData} from "express-validator";

export const authRouter = express.Router();

const generateToken = data => {
    return crypto.createHash("md5").update(data).digest("hex");
};

authRouter.post("/login", loginValidator, validate, async (req, res) => {

    try {

        const {identifier, password} = matchedData(req);

        const user = db.prepare("SELECT * FROM users WHERE email = ? OR username = ?").get(identifier, identifier);

        if (!user || !await bcrypt.compare(password, user.password)) {
            res.status(401).json({message: "Invalid credentials"});
            return;
        }

        const token = generateToken(user.email);

        db.prepare("UPDATE users SET token = ? WHERE user_id = ?").run(token, user.user_id);

        res.status(200).json({
            message: "Login successful",
            user: {
                username: user.username,
                email: user.email,
                created_at: user.created_at
            },
            token: token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error"
        });
    }


});

authRouter.post("/register", registerValidator, validate, async (req, res) => {

    try {

        const {username, email, password} = matchedData(req);

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

        const insert = db.transaction(() => {
            const {lastInsertRowid} = db
                .prepare("INSERT INTO users (username, email, password, token) VALUES (?,?,?,?)")
                .run(username, email, hash, token);

            return db.prepare("SELECT * FROM users WHERE user_id = ?").get(lastInsertRowid);
        });

        const newUser = insert();

        res.status(201).json({
            message: "User registered",
            user: {
                username: newUser.username,
                email: newUser.email,
                created_at: newUser.created_at
            },
            token: token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error"
        });
    }

});

authRouter.post("/logout", auth, (req, res) => {
    const user = req.user;

    db.prepare("UPDATE users SET token = NULL WHERE email = ?").run(user.email);

    res.status(200).json({
        message: "Successfully logged out"
    });

});

authRouter.head("/check-token", auth, (req, res) => {

});