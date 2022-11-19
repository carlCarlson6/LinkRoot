import { NextFunction, Request, Response } from "express";
import { expressjwt } from "express-jwt";

export type ExpressMiddleware = (request: Request, response: Response, next: NextFunction) => Promise<void>;

export const consoleLogRequestMiddleware: ExpressMiddleware = async (request, response, next) => {
    console.info("new request to |", request.method, request.originalUrl);
    next();
}

export const errorHandlingMiddleware: ExpressMiddleware = async (request, response, next) => {
    try {
        next();
    }
    catch(e) {
        console.error("something happened", e);
    }
}

export const buildMiddlewares = () => [
    errorHandlingMiddleware,
    consoleLogRequestMiddleware,
];

export const checkJwt: ExpressMiddleware = expressjwt({
    secret: "secret",
    audience: "{YOUR_API_IDENTIFIER}",
    issuer: "https://YOUR_DOMAIN/",
    algorithms: [ "RS256" ]
  });