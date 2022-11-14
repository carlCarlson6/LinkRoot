import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import { ExpressEndpoint } from "../../shared/infrastructure/express-endpoint";
import { ExpressMiddleware } from '../../shared/infrastructure/express-middleware';

export class ExpressServer {
    private readonly app: Express = express();

    applyMiddleware(customMiddlewares: ExpressMiddleware[] = []): ExpressServer {
        this.app.use(express.json());
        this.app.use(cors());
        customMiddlewares.forEach(
            middleware => this.app.use(middleware)
        );
        return this;
    }

    addEndpoints(endpoints: ExpressEndpoint[] = []): ExpressServer {
        endpoints.forEach(
            endpoint => this.app.use(endpoint.path, endpoint.router)
        );
        return this;
    }

    configure(): ExpressServer {
        this.app.set('port', process.env.API_PORT || 4000); // TODO - read port form config
        return this;
    }
    
    start() {
        this.app.listen(
            this.app.get("port"), 
            "0.0.0.0", // todo read from config
            () => console.info("the server is running on", this.app.get("port"), "\n----------------")
        );
    }
}