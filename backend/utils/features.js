import DataUriParser from "datauri/parser.js";
import path from "path";

export const sendJsonToken = async (user, res, message, statusCode) => {
    const token = await user.generateToken();

    res.status(statusCode).cookie("token", token,
        {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        }).json({
            success: true,
            message: message
        });
};
//Pretvara file u Base64 string
export const getDataUri = (file) => {
    const parser = new DataUriParser();
    const name = path.extname(file.originalname).toString();

    return parser.format(name, file.buffer);
};