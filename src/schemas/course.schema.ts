import "zod-openapi/extend";
import { z } from "zod";

export const CourseSchema = z.object({
    id: z.number().openapi({
        description: "The unique identifier for the course",
        example: 1,
    }),
    title: z.string().openapi({
        description: "The title of the course",
        example: "Introduction to Programming",
    }),
    slug: z.string().openapi({
        description: "The slug of the course",
        example: "introduction-to-programming",
    }),
    image: z.string().openapi({
        description: "The image of the course",
        example: "https://example.com/image.jpg",
    }),
    excerpt: z.string().openapi({
        description: "The excerpt of the course",
        example: "This course will teach you the basics of programming.",
    }),
    description: z.string().openapi({
        description: "The description of the course",
        example: "This course will teach you the basics of programming.",
    }),
    published: z.boolean().openapi({
        description: "Whether the course is published or not",
        example: true,
    }),
    authorId: z.number().openapi({
        description: "The ID of the author of the course",
        example: 1,
    }),
    createdAt: z.date().openapi({
        description: "The date and time the course was created",
        example: "2023-01-01T00:00:00.000Z",
    }),
    updatedAt: z.date().openapi({
        description: "The date and time the course was last updated",
        example: "2023-01-01T00:00:00.000Z",
    }),
});

export const CourseCreateSchema = CourseSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const CourseUpdateSchema = CourseSchema.partial().omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export type Course = z.infer<typeof CourseSchema>;
export type CourseCreate = z.infer<typeof CourseCreateSchema>;
export type CourseUpdate = z.infer<typeof CourseUpdateSchema>;
