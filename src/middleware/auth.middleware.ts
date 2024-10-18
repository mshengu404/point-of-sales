import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import User from "../model/user";

export const authenticateJWT = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply
      .status(401)
      .send({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      throw new Error("JWT secret is not defined");
    }

    const decoded = jwt.verify(token, secretKey);
    request.user = decoded as User;
  } catch (error) {
    return reply
      .status(403)
      .send({ message: "Forbidden: Invalid token", error: error });
  }
};
