import { ExpressServer } from "../../shared/infrastructure/express/express-server";
import { buildRootEndpoints } from "../../roots/infrastructure/api/build-root-endpoints";
import { buildMiddlewares } from "../../shared/infrastructure/express/express-middleware";
import { BackendDependencies } from "../utils/backend-dependencies";

export const bootstrapApi = async ({dataSource, messageClient}: BackendDependencies) => {
    console.log("starting api");
    new ExpressServer()
        .applyMiddleware(buildMiddlewares())
        .addEndpoints(buildRootEndpoints({dataSource, messageClient}))
        .configure({port: process.env.API_PORT! ?Number(process.env.API_PORT!) : undefined})  // TODO - read from config
        .start();
    console.log("----------------");
};