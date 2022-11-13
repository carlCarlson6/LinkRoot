import { Request, Response, Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export interface ExpressEndpoint {
    readonly path: string;
    readonly router: Router;
    configRoute(): void;
    whenCalled(request: Request, response: Response): Promise<void>;
}

export abstract class BaseExpressEndpoint implements ExpressEndpoint {
    readonly router: Router = Router();
    
    constructor(
        readonly path: string,
    ) {
        this.configRoute();
    }

    abstract configRoute(): void;
    abstract whenCalled(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<void>;
}