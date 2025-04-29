import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { config } from "./config/env";

import { errorHandler, notFound } from "./middleware/error";

import postRoute from "./routes/post.route";
import courseRoute from "./routes/course.route";

export default class Server {
    private readonly app: Express;
    private readonly port: number;

    constructor() {
        this.app = express();
        this.port = config.server.port;

        this.initMiddlewares();
        this.initRoutes();
    }

    private initMiddlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(
            rateLimit({
                windowMs: 1 * 60 * 1000,
                max: 60,
                standardHeaders: true,
                legacyHeaders: false,
            })
        );
    }

    private initRoutes() {
        this.app.use("/api/v1/posts", postRoute);
        this.app.use("/api/v1/courses", courseRoute);

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
