import express from 'express';
import {db} from "../database/db.js";

export const categoryRouter = express.Router();

categoryRouter.get("/", (req, res) => {

    const categories = db.prepare("SELECT * FROM categories").all();

    res.json({
        categories: categories
    });
});

categoryRouter.get("/:id", (req, res) => {

    const category = db.prepare("SELECT * FROM categories WHERE category_id = ?").get(req.params.id);

    if (!category) {
        return res.status(404).json({
            message: "Category not found"
        });
    }

    res.json({
        category: category
    });

});