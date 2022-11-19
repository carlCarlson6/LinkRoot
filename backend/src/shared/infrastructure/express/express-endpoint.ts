import { Request, Response, Router } from "express";

export abstract class ExpressEndpoint {
    readonly router: Router = Router();
    
    constructor(
        readonly path: string,
    ) {
        this.configRoute();
    }

    abstract configRoute(): void;
    abstract whenCalled(request: Request, response: Response): Promise<void>;
}