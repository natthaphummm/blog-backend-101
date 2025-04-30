import 'zod-openapi/extend';
import { z } from 'zod';

export const TokenSchema = z.object({
    id: z.number().openapi({
        description: 'The unique identifier for the token',
        example: 1,
    }),
    refreshToken: z.string().openapi({
        description: 'The refresh token value',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    }),
    userId: z.number().openapi({
        description: 'The ID of the user associated with the token',
        example: 1,
    }),
    revoked: z.boolean().openapi({
        description: 'Whether the token has been revoked',
        example: false,
    }),
    createdAt: z.date().openapi({
        description: 'The date and time the token was created',
        example: '2023-01-01T00:00:00.000Z',
    }),
});

export type Token = z.infer<typeof TokenSchema>;
