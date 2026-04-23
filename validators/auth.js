import {body} from "express-validator";

export const registerValidator = [
    body('username').notEmpty().isLength({min: 5, max: 50}).escape(),
    body('email').notEmpty().isLength({max: 250}).escape(),
    body('password').notEmpty().isLength({min: 8})
];

export const loginValidator = [
    body('identifier').notEmpty().escape(),
    body('password').notEmpty()
];
