import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import { ExpressEndpoint } from "../shared/infrastructure/express-endpoint";

export class ExpressServer {
    private readonly app: Express = express();

    constructor(
        private readonly endpoints: ExpressEndpoint[]
    ) {}

    applyMiddleware(): ExpressServer {
        this.app.use(express.json());
        this.app.use(cors());
        return this;
    }

    addEndpoints(): ExpressServer {
        this.endpoints.forEach(
            endpoint => this.app.use(endpoint.path, endpoint.router)
        );
        return this;
    }

    configure(): ExpressServer {
        this.app.set('port', process.env.API_PORT || 4000);
        return this;
    }
    
    start() {
        this.app.listen(
            this.app.get('port'), 
            '0.0.0.0', 
            () => console.log('the server is running on', this.app.get('port'))
        );
    }
}