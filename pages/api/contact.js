import nodemailer from "nodemailer"

export default async function ContactAPI(req, res) {
    const {email, subject, message} = req.body
    //TODO: add testing to confirm recieving valid inputs

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.user,
            pass: process.env.pass,
        },
    });

    const mailOptions = {
        from: "jelc2718@gmail.com",
        replyTo: email,
        to: "jelc2718@gmail.com",  //TODO: add leqi, etc.
        subject: `[whats-new] message from ${email}`,
        html:`
            <p>Subject: ${subject}</p>
            <p>Message: ${message}</p>
        `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          throw new Error(error);
        } else {
          console.log("message sent");
          return true;
        }
      });
};
    // try {
    //     const mail = await transporter.sendMail(mailOptions);
    //     console.log("Message sent:", mail.messageId);

    //     res.status(200).jprocess.envson({ message: "success" });
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({ message: "Could not send email. Your message was not sent."});
    // }

    // return res.status(200).json({message: "success"})
