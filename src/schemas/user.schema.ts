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
    role: z.enum(["ADMIN", "USER"]).openapi({
        description: "The role of the user",
        example: "USER",
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
    role: true,
    createdAt: true,
    updatedAt: true,
});

export const UserUpdateSchema = UserSchema.partial().omit({
    id: true,
    role: true,
    createdAt: true,
    updatedAt: true,
});

export const UserLoginSchema = UserSchema.pick({
    email: true,
    password: true,
});

export const UserCreateResponseSchema = UserSchema.omit({
    id: true,
    password: true,
    createdAt: true,
    updatedAt: true,
});

export const UserLoginResponseSchema = z.object({
    accessToken: z.string().openapi({
        description: "The access token for the user",
        example:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    }),
    refreshToken: z.string().openapi({
        description: "The refresh token for the user",
        example:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    }),
    user: UserSchema.pick({
        id: true,
        email: true,
        role: true,
    }),
});

export const UserPayloadSchema = UserSchema.pick({
    id: true,
    role: true,
});

export type User = z.infer<typeof UserSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserCreateResponse = z.infer<typeof UserCreateResponseSchema>;
export type UserLoginResponse = z.infer<typeof UserLoginResponseSchema>;
export type UserPayload = z.infer<typeof UserPayloadSchema>;
