import "fastify";
import User from "../model/user";

declare module "fastify" {
  interface FastifyRequest {
    user?: User;
  }
}
