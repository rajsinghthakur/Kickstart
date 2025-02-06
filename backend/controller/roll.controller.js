import { validationResult } from "express-validator";
import { User } from "../model/association.js";
import Roll from "../model/roll.model.js";

//add roll
export const Add = async (request, response) => {
    //error validation message
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    let roll = await Roll.findOne({ where: { roll: request.body.roll }, raw: true });

    if (roll == null) {
        Roll.create({
            roll: request.body.roll,
            isActive: request.body.isActive
        })
            .then((result) => {
                return response.status(200).json({ message: "Roll added successfully.." })
            })
            .catch((err) => {
                return response.status(500).json({ error: "Internal server error.." })
            })
    } else {
        return response.status(401).json({ message: "record is already exist" });
    }
}

//Roll list;
export const List = (request, response) => {
    Roll.findAll({ include: [{ model: User, as: "users" }] })
        .then((result) => {
            if (result)
                return response.status(200).json({ data: result })
            else
                return response.status(200).json({ message: "Record not found....." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error.." })
        })
}


// search
export const Search = (request, response) => {
    //error validation message
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Roll.findOne({
        where: {
            id: request.body.id
        }
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ data: result })
            else
                return response.status(200).json({ message: "Record not found....." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error.." })
        })
}


// remove
export const Remove = (request, response) => {
    //error validation message
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Roll.destroy({ where: { id: request.body.id } })
        .then((result) => {
            if (result)
                return response.status(200).json({ message: "Record remove successfuly....." });
            else
                return response.status(200).json({ message: "Record not found....." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error.." })
        })
}

// update
export const Update = (request, response) => {
    //error validation message
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Roll.update({
        roll: request.body.roll,
        isActive: request.body.isActive
    }, {
        where: { id: request.body.id }
    })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: "Record update successfuly....." });
            else
                return response.status(200).json({ message: "Record not found....." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })
}