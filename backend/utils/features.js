import DataUriParser from "datauri/parser.js";
import path from "path";
import nodemailer, { createTransport } from "nodemailer";

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

export const sendEmail = async (subject, to, message) => {
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transport.sendMail({
        from: "mr_ecommerce@gmail.com",
        to: to,
        subject: subject,
        text: message,
    });
}