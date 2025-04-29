import "zod-openapi/extend";
import { z } from "zod";

export const LessonSchema = z.object({
    id: z.number().openapi({
        description: "The unique identifier for the lesson",
        example: 1,
    }),
    courseId: z.number().openapi({
        description: "The ID of the course the lesson belongs to",
        example: 1,
    }),
    title: z.string().openapi({
        description: "The title of the lesson",
        example: "Introduction to Programming",
    }),
    content: z.string().openapi({
        description: "The content of the lesson",
        example: "This is the content of the lesson.",
    }),
    order: z.number().openapi({
        description: "The order of the lesson in the course",
        example: 1,
    }),
    createdAt: z.date().openapi({
        description: "The date and time the lesson was created",
        example: "2023-01-01T00:00:00.000Z",
    }),
    updatedAt: z.date().openapi({
        description: "The date and time the lesson was last updated",
        example: "2023-01-01T00:00:00.000Z",
    }),
});

export const LessonCreateSchema = LessonSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const LessonUpdateSchema = LessonSchema.partial().omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export type Lesson = z.infer<typeof LessonSchema>;
export type LessonCreate = z.infer<typeof LessonCreateSchema>;
export type LessonUpdate = z.infer<typeof LessonUpdateSchema>;
