import { NextFunction, Request, Response } from "express";

export type ExpressMiddleware = (request: Request, response: Response, next: NextFunction) => Promise<void>;

export const consoleLogRequestMiddleware: ExpressMiddleware = async (request, _, next) => {
    console.info("new request to =>", request.method, request.originalUrl);
    next();
}

export const errorHandlingMiddleware: ExpressMiddleware = async (request, _, next) => {
    try {
        next();
    }
    catch(e) {
        console.error("something happened", e);
    }
}