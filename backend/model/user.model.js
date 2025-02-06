import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfigration.js";
import bcyrpt from "bcryptjs";

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            let saltkey = bcyrpt.genSaltSync(10);
            let encryptedPassword = bcyrpt.hashSync(value, saltkey);
            this.setDataValue("password", encryptedPassword);
        }
    },
    contactNumber: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    rollId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Rolls",
            key: "id"
        }
    }
});

User.checkPassword = (originalPassword, encryptedPassword) => {
    console.log("check Password called....");
    return bcyrpt.compareSync(originalPassword, encryptedPassword);
}

sequelize.sync()
    .then(() => {
        console.log("User table created.....");
    })
    .catch((err) => {
        console.log("User table somthing wrong....");
        console.log(err);
    })

export default User;