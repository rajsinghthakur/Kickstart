import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Kickstart", "root", "Raj@882714", {
    host: "localhost",
    dialect: "mysql",
    timezone: "+05:30",
});

sequelize.authenticate()
    .then(() => {
        console.log("database connected")
    })
    .catch((err) => {
        console.log("database connected failed")
        console.log(err)
    });

export default sequelize;


// db - database connection

// model - tables create

// controller - data transfer

// routes - controll routes

// app - conect