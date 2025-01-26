import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfigration.js";

const Roll = sequelize.define("roll", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,// default size - 255
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

sequelize.sync()
    .then(() => {
        console.log("roll table created.....");
    })
    .catch((err) => {
        console.log("roll somthing wrong....");
        console.log(err);
    })

export default Roll;

// async , await