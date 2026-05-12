const nodemailer = require("nodemailer");

async function sendMail(toEmail, subject, text) {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: toEmail,
        subject: subject,
        text: text,
        attachments: [
            {
                filename: "resume.pdf",
                path: "./resume.pdf"
            }
        ]
    };

    return transporter.sendMail(mailOptions);
}

module.exports = sendMail;