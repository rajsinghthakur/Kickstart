import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfigration.js";

const Roll = sequelize.define("roll", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roll: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

sequelize.sync()
    .then(() => {
        console.log("Roll table created.....");
    })
    .catch((err) => {
        console.log("Roll table somthing wrong....");
        console.log(err);
    })

export default Roll;