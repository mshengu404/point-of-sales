// controllers/auth.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../service/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public login = async (request: FastifyRequest, response: FastifyReply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    if (!email || !password) {
      return response
        .status(400)
        .send({ message: "Email and password are required" });
    }

    const result = await this.authService.login(email, password);

    if (result.success) {
      return response.send({ success: true, token: result.token });
    } else {
      return response
        .status(401)
        .send({ success: false, message: result.message });
    }
  };

  public signup = async (request: FastifyRequest, response: FastifyReply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return response
        .status(400)
        .send({ message: "Email and password are required" });
    }

    const result = await this.authService.signup(email, password);

    if (result.success) {
      return response.send({ success: true, token: result.token });
    } else {
      return response
        .status(400)
        .send({ success: false, message: result.message });
    }
  };
}
