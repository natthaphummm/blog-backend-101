import BaseRoute from "./base.route";
import PostController from "../controllers/post.controller";
import PostService from "../services/post.service";
import { validate } from "../middleware/validate.middleware";
import { PostCreateSchema, PostUpdateSchema } from "../schemas";
import { authenticate, authorize } from "../middleware/auth.middleware";

export class PostRoute extends BaseRoute {
    constructor() {
        super(new PostController(new PostService()));
    }

    protected initRoutes(): void {
        this.router.get(
            "/",
            authenticate,
            authorize(["ADMIN"]),
            this.controller.getAll.bind(this.controller)
        );
        this.router.get("/:id", this.controller.getById.bind(this.controller));
        this.router.post(
            "/",
            validate(PostCreateSchema),
            this.controller.create.bind(this.controller)
        );
        this.router.put(
            "/:id",
            validate(PostUpdateSchema),
            this.controller.update.bind(this.controller)
        );
        this.router.delete(
            "/:id",
            this.controller.delete.bind(this.controller)
        );
    }
}

export default new PostRoute().getRouter();
