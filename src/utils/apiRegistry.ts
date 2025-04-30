import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export class ApiRegistry {
    private static instance: ApiRegistry;
    protected registry: OpenAPIRegistry;

    private constructor() {
        this.registry = new OpenAPIRegistry();
    }

    public static getInstance(): ApiRegistry {
        if (!ApiRegistry.instance) {
            ApiRegistry.instance = new ApiRegistry();
        }
        return ApiRegistry.instance;
    }

    public getRegistry(): OpenAPIRegistry {
        return this.registry;
    }

    public get definitions() {
        return this.registry.definitions;
    }
}

export default ApiRegistry.getInstance();
