import Roll from "../model/roll.model.js";

// insert into Roll (name, isActive);
export const Add = (request, response) => {
    Roll.create({
        name: request.body.name,
        isActive: request.body.isActive
    })
        .then((result) => {
            return response.status(200).json({ message: "Roll added successfully.." })
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })
}

// select * from Roll;
export const List = (request, response) => {
    Roll.findAll()
        .then((result) => {
            return response.status(200).json({ data: result });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error.." })
        })
}


// select * from Roll where id = ?;
export const Search = (request, response) => {
    Roll.findOne({
        where: {
            id: request.body.id
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


// delete from Roll where id = 3;
export const Remove = (request, response) => {
    Roll.destroy({ where: { id: request.body.id } })
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

// update Roll set name = 'raj thakur', contactNumber = "5654543432" where id = 5;
export const Update = (request, response) => {
    Roll.update({
        name: request.body.name,
        isActive: request.body.isActive
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