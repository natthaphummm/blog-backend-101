import BaseRoute from "./base.route";
import PostController from "../controllers/post.controller";
import PostService from "../services/post.service";
import { validate } from "../middleware/validate.middleware";
import {
    Post,
    PostSchema,
    PostCreate,
    PostCreateSchema,
    PostUpdate,
    PostUpdateSchema,
} from "../schemas";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";

export class PostRoute extends BaseRoute {
    constructor() {
        super(new PostController(new PostService()));
    }

    protected initRoutes(): void {
        this.router.get("/", this.controller.getAll.bind(this.controller));
        this.registry.registerPath({
            method: "get",
            path: "/api/posts",
            tags: ["Posts"],
            summary: "Get all posts",
            responses: {
                200: {
                    description: "Posts retrieved",
                    content: {
                        "application/json": {
                            schema: zodToJsonSchema(
                                z.array(PostSchema)
                            ) as Post,
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
            path: "/api/posts/{id}",
            tags: ["Posts"],
            summary: "Get a post by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Post id",
                    required: true,
                    schema: {
                        type: "integer",
                        format: "int64",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Post retrieved",
                    content: {
                        "application/json": {
                            schema: PostSchema,
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
                },
                404: {
                    description: "Post not found",
                },
            },
        });

        this.router.post(
            "/",
            authenticate,
            authorize(["ADMIN"]),
            validate(PostCreateSchema),
            this.controller.create.bind(this.controller)
        );
        this.registry.registerPath({
            method: "post",
            path: "/api/posts",
            tags: ["Posts"],
            summary: "Create a post",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: zodToJsonSchema(PostCreateSchema) as PostCreate,
                    },
                },
            },
            responses: {
                201: {
                    description: "Post created",
                    content: {
                        "application/json": {
                            schema: PostSchema,
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
            validate(PostUpdateSchema),
            this.controller.update.bind(this.controller)
        );
        this.registry.registerPath({
            method: "put",
            path: "/api/posts/{id}",
            tags: ["Posts"],
            summary: "Update a post",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Post id",
                    required: true,
                    schema: {
                        type: "integer",
                        format: "int64",
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: zodToJsonSchema(PostUpdateSchema) as PostUpdate,
                    },
                },
            },
            responses: {
                200: {
                    description: "Post updated",
                    content: {
                        "application/json": {
                            schema: PostSchema,
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
                },
                404: {
                    description: "Post not found",
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
            path: "/api/posts/{id}",
            tags: ["Posts"],
            summary: "Delete a post",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Post id",
                    required: true,
                    schema: {
                        type: "integer",
                        format: "int64",
                    },
                },
            ],
            responses: {
                204: {
                    description: "Post deleted",
                },
                401: {
                    description: "Unauthorized",
                },
                404: {
                    description: "Post not found",
                },
            },
        });
    }
}

export default new PostRoute().getRouter();
