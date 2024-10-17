import { FastifyInstance } from "fastify/types/instance";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";

export class AuthRoute {

    public authController: AuthController;

    constructor(public _app: FastifyInstance) {
        this.authController = new AuthController();
    }

    initialize = () => {
        this._app.post("/signup", this.authController.signup);
        this._app.post("/login", this.authController.login);
    }
}
