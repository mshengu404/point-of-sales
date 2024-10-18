import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user";
import { ILogin } from "../interface/login.interface";

export class AuthService {
  private readonly jwtSecret: string;
  private readonly tokenExpiry: string = "1h";

  constructor() {
    this.jwtSecret =
      process.env.JWT_SECRET ||
      "$2b$12$F9l0ebUHICgO3xnYyfa0EOclTnGAq/87nckImnhuA8RsdK7MqRpzm";
  }

  public login = async (email: string, password: string): Promise<ILogin> => {
    try {
      const user = await User.findOne({ where: { email } });
      if (
        !user ||
        !(await bcrypt.compare(password, user.dataValues.password))
      ) {
        return { success: false, message: "Invalid credentials" };
      }

      const token = this.generateToken(user.dataValues.id);
      return { success: true, token };
    } catch (error) {
      console.error("error", error);
      return { success: false, message: "Login failed" };
    }
  };

  public signup = async (email: string, password: string): Promise<ILogin> => {
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return { success: false, message: "User already exists" };
      }

      const hashedPassword = await User.hashPassword(password);
      const newUser = await User.create({
        email,
        password: hashedPassword,
      });

      const token = this.generateToken(newUser.id);
      return { success: true, token };
    } catch (error) {
      console.error("error", error);
      return { success: false, message: "Signup failed" };
    }
  };

  private generateToken = (userId: number): string => {
    return jwt.sign({ userId }, this.jwtSecret, {
      expiresIn: this.tokenExpiry,
    });
  };
}
