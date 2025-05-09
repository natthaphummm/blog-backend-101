import "zod-openapi/extend";
import { boolean, z } from "zod";

export const PostSchema = z.object({
    id: z.number().openapi({
        description: "The unique identifier for the post",
        example: 1,
    }),
    title: z.string().openapi({
        description: "The title of the post",
        example: "My First Post",
    }),
    slug: z.string().openapi({
        description: "The slug of the post",
        example: "my-first-post",
    }),
    image: z.string().openapi({
        description: "The image of the post",
        example: "https://example.com/image.jpg",
    }),
    excerpt: z.string().openapi({
        description: "The excerpt of the post",
        example: "This is a short excerpt of my first post.",
    }),
    content: z.string().openapi({
        description: "The content of the post",
        example: "This is the content of my first post.",
    }),
    published: z.boolean().openapi({
        description: "Whether the post is published or not",
        example: true,
    }),
    authorId: z.number().openapi({
        description: "The ID of the author of the post",
        example: 1,
    }),
    createdAt: z.date().openapi({
        description: "The date and time the post was created",
        example: "2023-01-01T00:00:00.000Z",
    }),
    updatedAt: z.date().openapi({
        description: "The date and time the post was last updated",
        example: "2023-01-01T00:00:00.000Z",
    }),
});

export const PostCreateSchema = PostSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const PostUpdateSchema = PostSchema.partial().omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const PostQuerySchema = z.object({
    published: z.preprocess(
        (val) => (val === "true" ? true : val === "false" ? false : val),
        z.boolean().optional()
    ),
});

export type Post = z.infer<typeof PostSchema>;
export type PostCreate = z.infer<typeof PostCreateSchema>;
export type PostUpdate = z.infer<typeof PostUpdateSchema>;
export type PostQuery = z.infer<typeof PostQuerySchema>;
