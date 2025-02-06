import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Kickstart", "root", "Raj@882714", {
    host: "localhost",
    dialect: "mysql",
    timezone: "+05:30",
});

sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully.....")
    })
    .catch((err) => {
        console.log("Database connected failed.....")
        console.log(err)
    });

export default sequelize;