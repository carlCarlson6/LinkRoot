import { ExpressServer } from "../../shared/infrastructure/express/express-server";
import { config as readEnvConfig } from "dotenv";
import { buildRootEndpoints } from "../../roots/infrastructure/api/build-root-endpoints";
import { buildMiddlewares } from "../../shared/infrastructure/express/express-middleware";
import { getMessageClient } from "../../shared/infrastructure/hermod/get-message-client";
import { registerHandlers } from "./register-handler";
import { getDataSourceWithEntities } from "./get-data-source-with-entities";

export const bootstrapApiBackend = async () => {
    readEnvConfig();
    console.log("----------------\nstarting backend");

    console.log("connecting to db");
    const dataSource = await getDataSourceWithEntities().initialize();
    
    console.log("connecting to rabbitmq");
    const messageClient = getMessageClient();
    
    console.log("adding event handlers");
    registerHandlers({messageClient, dataSource});

    console.log("starting api");
    new ExpressServer()
        .applyMiddleware(buildMiddlewares())
        .addEndpoints(buildRootEndpoints({dataSource, messageClient}))
        .configure({port: process.env.API_PORT! ?Number(process.env.API_PORT!) : undefined})  // TODO - read from config
        .start();
    console.log("----------------");
};