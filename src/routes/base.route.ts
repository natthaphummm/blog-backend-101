import { Router } from "express";

export default abstract class BaseRoute {
    protected readonly router: Router;
    protected readonly controller: any;

    constructor(controller: any) {
        this.router = Router();
        this.controller = controller;
        this.initRoutes();
    }

    protected abstract initRoutes(): void;

    public getRouter(): Router {
        return this.router;
    }
}
