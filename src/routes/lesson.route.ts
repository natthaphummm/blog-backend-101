import BaseRoute from "./base.route";
import LessonController from "../controllers/lesson.controller";
import LessonService from "../services/lesson.service";
import { validateBody } from "../middleware/validate.middleware";
import {
    Lesson,
    LessonSchema,
    LessonCreate,
    LessonCreateSchema,
    LessonUpdate,
    LessonUpdateSchema,
} from "../schemas";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";
export class LessonRoute extends BaseRoute {
    constructor() {
        super(new LessonController(new LessonService()));
    }

    protected initRoutes(): void {
        this.router.get("/", this.controller.getAll.bind(this.controller));
        this.registry.registerPath({
            method: "get",
            path: "/api/lessons",
            tags: ["Lessons"],
            summary: "Get all lessons",
            responses: {
                200: {
                    description: "Lessons retrieved",
                    content: {
                        "application/json": {
                            schema: zodToJsonSchema(
                                z.array(LessonSchema)
                            ) as Lesson,
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
                },
            },
        });

        this.router.get("/:id", this.controller.getById.bind(this.controller));
        this.registry.registerPath({
            method: "get",
            path: "/api/lessons/{id}",
            tags: ["Lessons"],
            summary: "Get lesson by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Lesson id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Lesson retrieved",
                    content: {
                        "application/json": {
                            schema: zodToJsonSchema(LessonSchema) as Lesson,
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
                },
            },
        });

        this.router.get(
            "/course/:id",
            this.controller.getByCourseId.bind(this.controller)
        );
        this.registry.registerPath({
            method: "get",
            path: "/api/lessons/course/{id}",
            tags: ["Lessons"],
            summary: "Get lessons by course id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Course id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Lessons retrieved",
                    content: {
                        "application/json": {
                            schema: zodToJsonSchema(
                                z.array(LessonSchema)
                            ) as Lesson,
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
                },
            },
        });

        this.router.post(
            "/",
            authenticate,
            authorize(["ADMIN"]),
            validateBody(LessonCreateSchema),
            this.controller.create.bind(this.controller)
        );
        this.registry.registerPath({
            method: "post",
            path: "/api/lessons",
            tags: ["Lessons"],
            summary: "Create a lesson",
            requestBody: {
                content: {
                    "application/json": {
                        schema: zodToJsonSchema(LessonCreateSchema) as Lesson,
                    },
                },
            },
            responses: {
                201: {
                    description: "Lesson created",
                    content: {
                        "application/json": {
                            schema: zodToJsonSchema(LessonSchema) as Lesson,
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
                },
            },
        });

        this.router.put(
            "/:id",
            authenticate,
            authorize(["ADMIN"]),
            validateBody(LessonUpdateSchema),
            this.controller.update.bind(this.controller)
        );

        this.registry.registerPath({
            method: "put",
            path: "/api/lessons/{id}",
            tags: ["Lessons"],
            summary: "Update a lesson",
            requestBody: {
                content: {
                    "application/json": {
                        schema: zodToJsonSchema(LessonUpdateSchema) as Lesson,
                    },
                },
            },
            responses: {
                200: {
                    description: "Lesson updated",
                    content: {
                        "application/json": {
                            schema: zodToJsonSchema(LessonSchema) as Lesson,
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
                },
            },
        });

        this.router.delete(
            "/:id",
            authenticate,
            authorize(["ADMIN"]),
            this.controller.delete.bind(this.controller)
        );
        this.registry.registerPath({
            method: "delete",
            path: "/api/lessons/{id}",
            tags: ["Lessons"],
            summary: "Delete a lesson",
            responses: {
                200: {
                    description: "Lesson deleted",
                },
                401: {
                    description: "Unauthorized",
                },
            },
        });
    }
}

export default new LessonRoute().getRouter();
