import { IHelloService } from "../interfaces";

export default class HelloService implements IHelloService {
    async sayHello(): Promise<string> {
        return "Hello from HelloService!";
    }
}
