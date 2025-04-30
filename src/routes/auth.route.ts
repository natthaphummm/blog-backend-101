import BaseRoute from './base.route';
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';
import { validate } from '../middleware/validate.middleware';
import {
    UserCreate,
    UserCreateSchema,
    UserCreateResponseSchema,
    UserLogin,
    UserLoginSchema,
    UserLoginResponseSchema,
} from '../schemas';
import { zodToJsonSchema } from 'zod-to-json-schema';

export class AuthRoute extends BaseRoute {
    constructor() {
        super(new AuthController(new AuthService()));
    }

    protected initRoutes(): void {
        this.router.post(
            '/register',
            validate(UserCreateSchema),
            this.controller.register.bind(this.controller),
        );
        this.registry.registerPath({
            method: 'post',
            path: '/api/auth/register',
            tags: ['Auth'],
            summary: 'Register a new user',
            requestBody: {
                content: {
                    'application/json': {
                        schema: zodToJsonSchema(UserCreateSchema) as UserCreate,
                    },
                },
            },
            responses: {
                201: {
                    description: 'User created',
                    content: {
                        'application/json': {
                            schema: UserCreateResponseSchema,
                        },
                    },
                },
                400: {
                    description: 'Bad request',
                },
                409: {
                    description: 'User already exists',
                },
            },
        });

        this.router.post(
            '/login',
            validate(UserLoginSchema),
            this.controller.login.bind(this.controller),
        );
        this.registry.registerPath({
            method: 'post',
            path: '/api/auth/login',
            tags: ['Auth'],
            summary: 'Login a user',
            requestBody: {
                content: {
                    'application/json': {
                        schema: zodToJsonSchema(UserLoginSchema) as UserLogin,
                    },
                },
            },
            responses: {
                200: {
                    description: 'User logged in',
                    content: {
                        'application/json': {
                            schema: UserLoginResponseSchema,
                        },
                    },
                },
                401: {
                    description: 'Invalid password',
                },
                404: {
                    description: 'User not found',
                },
            },
        });

        this.router.post(
            '/logout',
            this.controller.logout.bind(this.controller),
        );
        this.registry.registerPath({
            method: 'post',
            path: '/api/auth/logout',
            tags: ['Auth'],
            summary: 'Logout a user',
            responses: {
                200: {
                    description: 'User logged out',
                },
                401: {
                    description: 'Unauthorized',
                },
            },
        });

        this.router.post(
            '/refresh-token',
            this.controller.refreshToken.bind(this.controller),
        );
        this.registry.registerPath({
            method: 'post',
            path: '/api/auth/refresh-token',
            tags: ['Auth'],
            summary: 'Refresh a token',
            responses: {
                200: {
                    description: 'Token refreshed',
                    content: {
                        'application/json': {
                            schema: UserLoginResponseSchema,
                        },
                    },
                },
                401: {
                    description: 'Unauthorized',
                },
            },
        });
    }
}

export default new AuthRoute().getRouter();
