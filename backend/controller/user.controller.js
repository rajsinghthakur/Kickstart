import User from "../model/user.model.js";
import { validationResult } from "express-validator";
import { Roll } from "../model/association.js";
import jwt from "jsonwebtoken";
import SendMail from "../middleware/mail.js";
import generateOTP from "../middleware/generateOTP.js";

//signup users
export const SignUp = async (request, response) => {
    //error validation message
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });
    //check user from database by email user is exist or not ?
    let emalTemplate, subject;
    let user = await User.findOne({ where: { email: request.body.email }, raw: true });

    //if user email exist then check password is correct or not ?
    if (!user) {
        let otp = generateOTP();
        emalTemplate = `<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>Email Template</title> <style> body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; } .email-container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; } .header { background: #23180d; padding: 10px; text-align: start; } .logo{ display:flex; align-items:center; } .logo img { width: 80px; } .name { width:100%; height:100%; display:flex; justify-content:center; align-items:center; text-align: center;} .company-name { color: #ffffff; font-size: 24px; font-weight: bold; display: inline-block; margin-left: 10px; text-align: start; } .content { padding: 20px; font-size: 16px; color: #333; } .social-links { text-align: center; padding: 10px; } .social-links img { width: 30px; margin: 0 5px; } .button { display: inline-block; padding: 10px 20px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; } .footer { text-align: center; font-size: 14px; color: #777; background-color: #E7E9EB; padding: 10px 20px; } </style> </head> <body> <div class="email-container"> <div class="header"> <div class="logo"> <img src="https://cdn4.iconfinder.com/data/icons/seo-and-digital-marketing-2-2/128/60-512.png" alt="Dancing Goat Logo"> <div class="name"><span class="company-name">KICKSTART</span></div> </div> </div> <div class="content"> <h2>Welcome to Kickstart!</h2> <p>Your One Time Password is :${otp}</p> <a href="#" class="button">Go to Dashboard</a> </div> <div class="social-links"> <a href="#"><img src="https://www.buscopng.com/wp-content/uploads/2021/03/Facebook-logo-circular-1024x1024.png" alt="Facebook"></a> <a href="#"><img src="https://freelogopng.com/images/all_img/1658587303instagram-png.png" alt="Instagram"></a> </div> <div class="footer"> <p>&copy; 2025 Kickstart. All Rights Reserved.</p> </div> </div> </body> </html>`
        subject = 'Welcome to Kickstart! Your OTP! 🎉'
        SendMail(request.body.email, subject, emalTemplate);
        //create user using create methord
        User.create({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            contactNumber: request.body.contactNumber,
            isDeleted: request.body.isDeleted,
            rollId: request.body.rollId
        })
            //promise response
            .then((result) => {
                emalTemplate = '<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>Email Template</title> <style> body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; } .email-container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; } .header { background: #23180d; padding: 10px; text-align: start; } .logo{ display:flex; align-items:center; } .logo img { width: 80px; } .name { width:100%; height:100%; display:flex; justify-content:center; align-items:center; text-align: center;} .company-name { color: #ffffff; font-size: 24px; font-weight: bold; display: inline-block; margin-left: 10px; text-align: start; } .content { padding: 20px; font-size: 16px; color: #333; } .social-links { text-align: center; padding: 10px; } .social-links img { width: 30px; margin: 0 5px; } .button { display: inline-block; padding: 10px 20px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; } .footer { text-align: center; font-size: 14px; color: #777; background-color: #E7E9EB; padding: 10px 20px; } </style> </head> <body> <div class="email-container"> <div class="header"> <div class="logo"> <img src="https://cdn4.iconfinder.com/data/icons/seo-and-digital-marketing-2-2/128/60-512.png" alt="Dancing Goat Logo"> <div class="name"><span class="company-name">KICKSTART</span></div> </div> </div> <div class="content"> <h2>Welcome to Kickstart!</h2> <p>Your registration was successful. You can now access all our features and services.</p> <a href="#" class="button">Go to Dashboard</a> </div> <div class="social-links"> <a href="#"><img src="https://www.buscopng.com/wp-content/uploads/2021/03/Facebook-logo-circular-1024x1024.png" alt="Facebook"></a> <a href="#"><img src="https://freelogopng.com/images/all_img/1658587303instagram-png.png" alt="Instagram"></a> </div> <div class="footer"> <p>&copy; 2025 Kickstart. All Rights Reserved.</p> </div> </div> </body> </html> '
                subject = 'Welcome to Kickstart! Registration Successful 🎉'
                SendMail(request.body.email, subject, emalTemplate);
                return response.status(200).json({ message: "SignUp successful....." })
            })
            .catch((error) => {
                return response.status(500).json({ error: "Internal server error.....", error })
            })
    }
    else {
        return response.status(402).json({ error: "The email id is already exist" });
    }
}

//signin method
export const SignIn = async (request, response) => {
    //error validation message
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });
    //get user email and password from request body
    let emalTemplate = '<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>Email Template</title> <style> body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; } .email-container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; } .header { background: #23180d; padding: 10px; text-align: start; } .logo{ display:flex; align-items:center; } .logo img { width: 80px; } .name { width:100%; height:100%; display:flex; justify-content:center; align-items:center; text-align: center;} .company-name { color: #ffffff; font-size: 24px; font-weight: bold; display: inline-block; margin-left: 10px; text-align: start; } .content { padding: 20px; font-size: 16px; color: #333; } .social-links { text-align: center; padding: 10px; } .social-links img { width: 30px; margin: 0 5px; } .button { display: inline-block; padding: 10px 20px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; } .footer { text-align: center; font-size: 14px; color: #777; background-color: #E7E9EB; padding: 10px 20px; } </style> </head> <body> <div class="email-container"> <div class="header"> <div class="logo"> <img src="https://cdn4.iconfinder.com/data/icons/seo-and-digital-marketing-2-2/128/60-512.png" alt="Dancing Goat Logo"> <div class="name"><span class="company-name">KICKSTART</span></div> </div> </div> <div class="content"> <h2>Welcome to Kickstart!</h2> <p>LogIn successful. You can now access all our features and services.</p> <a href="#" class="button">Go to Dashboard</a> </div> <div class="social-links"> <a href="#"><img src="https://www.buscopng.com/wp-content/uploads/2021/03/Facebook-logo-circular-1024x1024.png" alt="Facebook"></a> <a href="#"><img src="https://freelogopng.com/images/all_img/1658587303instagram-png.png" alt="Instagram"></a> </div> <div class="footer"> <p>&copy; 2025 Kickstart. All Rights Reserved.</p> </div> </div> </body> </html> '
    let subject = 'Welcome to Kickstart! LogIn Successful 🎉'
    let email = request.body.email;
    let password = request.body.password;
    //check user from database by email user is exist or not ?
    let user = await User.findOne({ where: { email: email }, raw: true });
    //if user exist then check password is correct or not ?
    if (user) {
        //compare password with user password and check
        if (User.checkPassword(password, user.password)) {
            let payload = user;
            // Secret key for token verification
            let secretKey = 'fdfjfjrwieroerivxcnmvnnvrweiorddfsdfdlkfjlfjljlraj';
            // Generate token with jwt.sign(payload, secretKey, { expiresIn: '1m' })
            let token = jwt.sign(payload, secretKey, { expiresIn: '15m' });
            // return token to user
            SendMail(email, subject, emalTemplate);
            return response.status(200).json({ message: "Sign In Success", token: token });
        } else {
            return response.status(401).json({ error: "Unauthorized user" });
        }
    }
    else {
        return response.status(401).json({ error: "Unauthorized user" });
    }
}

//list of users
export const List = (request, response) => {
    User.findAll({ include: [{ model: Roll, as: "roll" }] })
        .then((result) => {
            return response.status(200).json({ data: result });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error....." })
        })
}

//soft delete function/action
export const SoftDelete = (request, response) => {
    //error validation message
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });
    //update
    User.update({
        isDeleted: request.body.isDeleted
    }, {
        where: { id: request.body.id }
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ message: "deleted successfuly....." });
            else
                return response.status(200).json({ message: "unautherized request....." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error....." })
        })
}

//update user details
export const Update = (request, response, next) => {
    //error validation message
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });
    //update
    User.update({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        contactNumber: request.body.contactNumber,
        isDeleted: request.body.isDeleted,
        rollId: request.body.rollId
    }, {
        where: { id: request.body.id }
    })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: "update successfuly....." });
            else
                return response.status(200).json({ message: "unautherized request....." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })
}