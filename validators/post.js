import {body} from "express-validator";
import {db} from "../database/db.js";

export const postValidator = [
    body('title').notEmpty().isLength({max: 200}).escape(),
    body('body').notEmpty().escape(),
    body('categories').notEmpty().isArray({min: 1}),
    body('categories.*').isInt().custom((id) => {
        const category = db.prepare("SELECT * FROM categories WHERE category_id = ?").get(id);
        if (!category) {
            throw new Error(`Category ${id} does not exist`);
        }
        return true;
    })
];