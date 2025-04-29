import "zod-openapi/extend";
import { z } from "zod";

export const UserSchema = z.object({
    id: z.number().openapi({
        description: "The unique identifier for the user",
        example: 1,
    }),
    email: z.string().email().openapi({
        description: "The email of the user",
        example: "john.doe@example.com",
    }),
    password: z.string().openapi({
        description: "The password of the user",
        example: "password123",
    }),
    createdAt: z.date().openapi({
        description: "The date and time the user was created",
        example: "2023-01-01T00:00:00.000Z",
    }),
    updatedAt: z.date().openapi({
        description: "The date and time the user was last updated",
        example: "2023-01-01T00:00:00.000Z",
    }),
});

export const UserCreateSchema = UserSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const UserUpdateSchema = UserSchema.partial().omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const UserLoginSchema = UserSchema.pick({
    email: true,
    password: true,
});

export type User = z.infer<typeof UserSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
