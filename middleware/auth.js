export const auth = (req, res, next) => {

    if (!req.headers['Authorization'] || !req.headers['Authorization'].startsWith("Bearer")) {
        return res.status(401).json({"message": "Unauthorized"});
    }

    next();
};
