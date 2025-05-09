import { Request, Response } from "express";
import { ILessonService } from "../interfaces";

export default class LessonController {
    constructor(private readonly service: ILessonService) {}

    async getAll(req: Request, res: Response) {
        const result = await this.service.getAll();
        res.status(200).json(result);
    }

    async getById(req: Request, res: Response) {
        const result = await this.service.getById(Number(req.params.id));
        res.status(200).json(result);
    }

    async getByCourseId(req: Request, res: Response) {
        const result = await this.service.getByCourseId(Number(req.params.id));
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
        res.status(204).json({ message: "Lesson deleted" });
    }
}
