import {db} from "../database/db.js";

export const auth = (req, res, next) => {
    if (!req.headers['authorization'] || !req.headers['authorization'].startsWith("Bearer")) {
        return res.status(401).json({"message": "Unauthorized"});
    }

    const token = req.headers['authorization'].split('Bearer ')[1];

    const user = db.prepare("SELECT * FROM users WHERE token = ?").get(token);

    if (!user) {
        return res.status(401).json({"message": "Unauthorized"});
    }

    req.user = user;

    next();
};
