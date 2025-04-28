import BaseRoute from "./base.route";
import HelloController from "../controllers/hello.controller";
import HelloService from "../services/hello.service";

export class HelloRoute extends BaseRoute {
    constructor() {
        super(new HelloController(new HelloService()));
    }

    protected initRoutes(): void {
        this.router.get("/", this.controller.hello.bind(this.controller));
    }
}

export default new HelloRoute().getRouter();
