export const sendJsonToken = async (user, res, message, statusCode) => {
    const token = await user.generateToken();

    res.status(statusCode).cookie("token", token, { expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) }).json({
        success: true,
        message: message,
        token
    });
};