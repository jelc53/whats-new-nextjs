// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer"

export default async function ContactAPI(req, res) {
    const {email, subject, message} = req.body
    //TODO: add testing to confirm recieving valid inputs

    const transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: USER,
            pass: PASSWORD,
        },
    });


    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if(error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
    
    const mailData = {
        from: {
            name: 'whats-new-admin',
            address: 'jelc2718@gmail.com'
        },
        replyTo: email,
        to: "jelc2718@gmail.com",  //TODO: add leqi, etc.
        subject: `[whats-new] message from ${email}`,
        html:`
            <p>Subject: ${subject}</p>
            <p>Message: ${message}</p>
        `,
    };

    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });

    res.status(200).json({ status: "OK"});

};
