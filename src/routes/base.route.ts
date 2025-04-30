import { Router } from 'express';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { ApiRegistry } from '../utils/apiRegistry';

export default abstract class BaseRoute {
    protected readonly router: Router;

    protected readonly controller: any;
    protected readonly registry: OpenAPIRegistry;

    constructor(controller: any) {
        this.router = Router();
        this.controller = controller;
        this.registry = ApiRegistry.getInstance().getRegistry();
        this.initRoutes();
    }

    protected abstract initRoutes(): void;

    public getRouter(): Router {
        return this.router;
    }
}
