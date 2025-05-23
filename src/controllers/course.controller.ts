import { Request, Response } from "express";
import { ICourseService } from "../interfaces";

interface ValidRequest extends Request {
    validatedQuery?: any;
}

export default class CourseController {
    constructor(private readonly service: ICourseService) {}

    async getAll(req: ValidRequest, res: Response) {
        const result = await this.service.getAll(req.validatedQuery);
        res.status(200).json(result);
    }

    async getById(req: Request, res: Response) {
        const result = await this.service.getById(Number(req.params.id));
        res.status(200).json(result);
    }

    async getBySlug(req: Request, res: Response) {
        const result = await this.service.getBySlug(req.params.slug);
        res.status(200).json(result);
    }

    async create(req: Request, res: Response) {
        const result = await this.service.create(req.body);
        res.status(201).json(result);
    }

    async update(req: Request, res: Response) {
        const result = await this.service.update(
            Number(req.params.id),
            req.body
        );
        res.status(200).json(result);
    }

    async delete(req: Request, res: Response) {
        await this.service.delete(Number(req.params.id));
        res.status(204).json({ message: "Course deleted" });
    }
}
