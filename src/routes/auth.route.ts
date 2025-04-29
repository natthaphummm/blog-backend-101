import BaseRoute from "./base.route";
import AuthController from "../controllers/auth.controller";
import AuthService from "../services/auth.service";
import { validate } from "../middleware/validate.middleware";
import { UserCreateSchema, UserLoginSchema } from "../schemas";

export class AuthRoute extends BaseRoute {
    constructor() {
        super(new AuthController(new AuthService()));
    }

    protected initRoutes(): void {
        this.router.post(
            "/register",
            validate(UserCreateSchema),
            this.controller.register.bind(this.controller)
        );
        this.router.post(
            "/login",
            validate(UserLoginSchema),
            this.controller.login.bind(this.controller)
        );
        this.router.post(
            "/logout",
            this.controller.logout.bind(this.controller)
        );
        this.router.post(
            "/refresh-token",
            this.controller.refreshToken.bind(this.controller)
        );
    }
}

export default new AuthRoute().getRouter();
