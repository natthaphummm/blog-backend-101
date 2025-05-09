import BaseRoute from "./base.route";
import CourseController from "../controllers/course.controller";
import CourseService from "../services/course.service";
import { validateBody, validateQuery } from "../middleware/validate.middleware";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { authenticate, authorize } from "../middleware/auth.middleware";
import {
    Course,
    CourseSchema,
    CourseCreate,
    CourseCreateSchema,
    CourseUpdate,
    CourseUpdateSchema,
    CourseQuery,
    CourseQuerySchema,
} from "../schemas";

export class CourseRoute extends BaseRoute {
    constructor() {
        super(new CourseController(new CourseService()));
    }
    protected initRoutes(): void {
        this.router.get(
            "/",
            validateQuery(CourseQuerySchema),
            this.controller.getAll.bind(this.controller)
        );
        this.registry.registerPath({
            method: "get",
            path: "/api/courses",
            tags: ["Courses"],
            summary: "Get all courses",
            parameters: [
                {
                    name: "published",
                    in: "query",
                    description: "Filter by published status",
                    required: false,
                    schema: {
                        type: "boolean",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Courses retrieved",
                    content: {
                        "application/json": {
                            schema: zodToJsonSchema(
                                z.array(CourseSchema)
                            ) as Course,
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
            path: "/api/courses/{id}",
            tags: ["Courses"],
            summary: "Get a course by id",
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
                    description: "Course retrieved",
                    content: {
                        "application/json": {
                            schema: CourseSchema,
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
                },
            },
        });

        this.router.get(
            "/slug/:slug",
            this.controller.getBySlug.bind(this.controller)
        );
        this.registry.registerPath({
            method: "get",
            path: "/api/courses/slug/{slug}",
            tags: ["Courses"],
            summary: "Get a course by slug",
            parameters: [
                {
                    name: "slug",
                    in: "path",
                    description: "Course slug",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Course retrieved",
                    content: {
                        "application/json": {
                            schema: CourseSchema,
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
            validateBody(CourseCreateSchema),
            this.controller.create.bind(this.controller)
        );
        this.registry.registerPath({
            method: "post",
            path: "/api/courses",
            tags: ["Courses"],
            summary: "Create a course",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: zodToJsonSchema(
                            CourseCreateSchema
                        ) as CourseCreate,
                    },
                },
            },
            responses: {
                201: {
                    description: "Course created",
                    content: {
                        "application/json": {
                            schema: CourseSchema,
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
            validateBody(CourseUpdateSchema),
            this.controller.update.bind(this.controller)
        );
        this.registry.registerPath({
            method: "put",
            path: "/api/courses/{id}",
            tags: ["Courses"],
            summary: "Update a course",
            security: [{ bearerAuth: [] }],
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
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: zodToJsonSchema(
                            CourseUpdateSchema
                        ) as CourseUpdate,
                    },
                },
            },
            responses: {
                200: {
                    description: "Course updated",
                    content: {
                        "application/json": {
                            schema: CourseSchema,
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
            path: "/api/courses/{id}",
            tags: ["Courses"],
            summary: "Delete a course",
            security: [{ bearerAuth: [] }],
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
                204: {
                    description: "Course deleted",
                },
                401: {
                    description: "Unauthorized",
                },
            },
        });
    }
}

export default new CourseRoute().getRouter();
