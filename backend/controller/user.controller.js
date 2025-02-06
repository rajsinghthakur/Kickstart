import User from "../model/user.model.js";
import { validationResult } from "express-validator";
import { Roll } from "../model/association.js";
import jwt from "jsonwebtoken";

//signup users
export const SignUp = async (request, response) => {
    //error validation message
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });
    //check user from database by email user is exist or not ?
    let user = await User.findOne({ where: { email: request.body.email }, raw: true });
    //if user email exist then check password is correct or not ?
    if (!user) {
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