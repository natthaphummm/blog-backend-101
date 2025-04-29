import BaseRoute from "./base.route";
import CourseController from "../controllers/course.controller";
import CourseService from "../services/course.service";
import { validate } from "../middleware/validate.middleware";
import { CourseCreateSchema, CourseUpdateSchema } from "../schemas";

export class CourseRoute extends BaseRoute {
    constructor() {
        super(new CourseController(new CourseService()));
    }
    protected initRoutes(): void {
        this.router.get("/", this.controller.getAll.bind(this.controller));
        this.router.get("/:id", this.controller.getById.bind(this.controller));
        this.router.post(
            "/",
            validate(CourseCreateSchema),
            this.controller.create.bind(this.controller)
        );
        this.router.put(
            "/:id",
            validate(CourseUpdateSchema),
            this.controller.update.bind(this.controller)
        );
        this.router.delete(
            "/:id",
            this.controller.delete.bind(this.controller)
        );
    }
}

export default new CourseRoute().getRouter();
