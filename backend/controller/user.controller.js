import { where } from "sequelize";
import User from "../model/user.model.js";

// insert into users (name, email, password, contactNumber) values ("name", "email", "password", "contactNumber");
export const SignUp = (request, response, next) => {
    User.create({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        contactNumber: request.body.contactNumber,
        isActive: request.body.isActive,
        rollId: request.body.rollId
    })
        .then((result) => {
            return response.status(200).json({ message: "signUp successful.." })
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })
}

// select * from users where emial = ? and password = ?;
export const SignIn = (request, response, next) => {
    User.findOne({
        where: {
            email: request.body.email,
            password: request.body.password
        }
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ message: "signIn successful..", data: result })
            else
                return response.status(200).json({ message: "unautherized request....." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })
}

// select * from users;
export const List = (request, response, next) => {
    User.findAll()
        .then((result) => {
            return response.status(200).json({ data: result });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })
}

// delete from users where id = 3;
export const Remove = (request, response, next) => {
    User.destroy({ where: { id: request.body.id } })
        .then((result) => {
            if (result)
                return response.status(200).json({ message: "remove successfuly....." });
            else
                return response.status(200).json({ message: "unautherized request....." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })
}

// update users set name = 'raj thakur', contactNumber = "5654543432" where id = 5;
export const Update = (request, response, next) => {
    User.update({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        contactNumber: request.body.contactNumber,
        isActive: request.body.isActive,
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



// insert - create
// delete - destory
// update - update
// read - findAll
// search - findone