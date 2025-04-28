import { Request, Response } from "express";
import { IHelloService } from "../interfaces";

export default class HelloController {
    constructor(private readonly service: IHelloService) {}

    async hello(req: Request, res: Response) {
        const result = await this.service.sayHello();
        res.status(200).json(result);
    }
}
