export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Server error";
    err.statusCode = err.statusCode || 500;

    if (err.name === "CastError") {
        err.message = `Invalid ${err.path}`;
        err.statusCode = 400;
    }
    res.status(err.statusCode).json({ success: false, message: err.message });
}

export const asyncErrorCatcher = (func) => {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch(next);
    }
};