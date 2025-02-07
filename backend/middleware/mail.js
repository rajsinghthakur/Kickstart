import nodemailer from 'nodemailer';

const mailServise = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'raj.thakur@softude.com', pass: 'uefr jurg sxww snas' }
});

const SendMail = (emailId, subject, emailtemplate) => {
    const mailDetails = {
        from: 'Information@Kickstart.com',
        to: emailId,
        subject: subject,
        html: emailtemplate
    };

    mailServise.sendMail(mailDetails, function (error, info) {
        if (error) {
            return response.status(200).json({ Message: 'Error to sending email', error });
        } else {
            console.log('Email sent successfully...');
        }
    });
};

export default SendMail;