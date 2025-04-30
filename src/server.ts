import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/env';

import { errorHandler, notFound } from './middleware/error.middleware';
import { ApiRegistry } from './utils/apiRegistry';

import postRoute from './routes/post.route';
import courseRoute from './routes/course.route';
import authRoute from './routes/auth.route';

import {
    OpenAPIRegistry,
    OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';

export default class Server {
    private readonly app: Express;
    private readonly port: number;
    private readonly apiRegistry: OpenAPIRegistry;

    constructor() {
        this.app = express();
        this.port = config.server.port;
        this.apiRegistry = ApiRegistry.getInstance().getRegistry();

        this.initMiddlewares();
        this.initRoutes();
    }

    private initMiddlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(
            rateLimit({
                windowMs: 1 * 60 * 1000,
                max: 60,
                standardHeaders: true,
                legacyHeaders: false,
            }),
        );
    }

    private initRoutes() {
        this.apiRegistry.registerComponent('securitySchemes', 'bearerAuth', {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter JWT token',
        });

        this.app.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(
                new OpenApiGeneratorV3(
                    this.apiRegistry.definitions,
                ).generateDocument({
                    openapi: '3.0.0',
                    info: {
                        title: 'API Documentation',
                        version: '1.0.0',
                    },
                }),
            ),
        );
        this.app.use('/api/posts', postRoute);
        this.app.use('/api/courses', courseRoute);
        this.app.use('/api/auth', authRoute);

        this.app.use(notFound);
        this.app.use(errorHandler);
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

    static bootstrap() {
        return new Server();
    }
}
