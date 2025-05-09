import BaseRoute from "./base.route";
import PostController from "../controllers/post.controller";
import PostService from "../services/post.service";
import { validateBody, validateQuery } from "../middleware/validate.middleware";
import {
    Post,
    PostSchema,
    PostCreate,
    PostCreateSchema,
    PostUpdate,
    PostUpdateSchema,
    PostQuery,
    PostQuerySchema,
} from "../schemas";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { zodToJsonSchema } from "zod-to-json-schema";

export class PostRoute extends BaseRoute {
    constructor() {
        super(new PostController(new PostService()));
    }

    protected initRoutes(): void {
        this.router.get(
            "/",
            validateQuery(PostQuerySchema),
            this.controller.getAll.bind(this.controller)
        );
        this.registry.registerPath({
            method: "get",
            path: "/api/posts",
            tags: ["Posts"],
            summary: "Get all posts",
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
                    description: "Posts retrieved",
                    content: {
                        "application/json": {
                            schema: PostSchema,
                        },
                    },
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

        this.router.get(
            "/slug/:slug",
            this.controller.getBySlug.bind(this.controller)
        );
        this.registry.registerPath({
            method: "get",
            path: "/api/posts/slug/{slug}",
            tags: ["Posts"],
            summary: "Get a post by slug",
            parameters: [
                {
                    name: "slug",
                    in: "path",
                    description: "Post slug",
                    required: true,
                    schema: {
                        type: "string",
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
            validateBody(PostCreateSchema),
            this.controller.create.bind(this.controller)
        );
        this.registry.registerPath({
            method: "post",
            path: "/api/posts",
            tags: ["Posts"],
            summary: "Create a post",
            security: [{ bearerAuth: [] }],
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
            validateBody(PostUpdateSchema),
            this.controller.update.bind(this.controller)
        );
        this.registry.registerPath({
            method: "put",
            path: "/api/posts/{id}",
            tags: ["Posts"],
            summary: "Update a post",
            security: [{ bearerAuth: [] }],
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
            security: [{ bearerAuth: [] }],
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
