import Roll from "./roll.model.js";
import User from "./user.model.js";

Roll.hasMany(User, {
    foreignKey: "rollId",
    as: "users"
});

User.belongsTo(Roll, {
    foreignKey: "rollId",
    as: "roll"
});

export { User, Roll };
