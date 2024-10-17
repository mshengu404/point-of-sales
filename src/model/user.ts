import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;       // Declare public attributes
  public email!: string;    // Declare public attributes
  public password!: string;  // Declare public attributes

  // Method to hash the password
  public static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Use a reasonable salt round (10 is common)
    return await bcrypt.hash(password, saltRounds);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: async (user: User) => {
        console.log("Before creating user:", user);
        // Ensure we are hashing the original password value from user
        user.password = await User.hashPassword(user.dataValues.password); // Use user.password directly
      },
    },
  }
);

export default User;
