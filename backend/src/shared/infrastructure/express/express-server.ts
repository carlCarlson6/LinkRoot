import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import { ExpressEndpoint } from "./express-endpoint";
import { checkJwt, ExpressMiddleware } from './express-middleware';
import bodyParser from 'body-parser';
import { ExpressServerConfiguration } from './express-server-configuration';

export class ExpressServer {
    private readonly app: Express = express();
    private serverConfig = {
        port: 4000,
        host: "0.0.0.0"
    };

    applyMiddleware(customMiddlewares: ExpressMiddleware[] = []): ExpressServer {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        customMiddlewares.forEach(
            middleware => this.app.use(middleware)
        );
        return this;
    }

    addEndpoints(endpoints: ExpressEndpoint[] = []): ExpressServer {
        endpoints.forEach(
            endpoint => this.app.use(endpoint.path, endpoint.router)
        );

        this.app.get('/timesheets', checkJwt, function(req, res){
            res.status(201).send({message: "This is the POST /timesheets endpoint"});
        })

        return this;
    }

    configure({port, host}: ExpressServerConfiguration): ExpressServer {
        this.serverConfig.port = port ?? this.serverConfig.port;
        this.serverConfig.host = host ?? this.serverConfig.host;
        return this;
    }
    
    start() {
        this.app.listen(
            this.serverConfig.port, 
            this.serverConfig.host,
            () => console.info("the server is running on", this.serverConfig.port, "\n----------------")
        );
    }
}