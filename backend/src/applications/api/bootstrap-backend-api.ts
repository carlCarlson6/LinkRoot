import { ExpressFindRootEndpoint } from "../../roots/infrastructure/api/express-find-root-endpoint";
import { getDataSource } from "../../roots/infrastructure/db/type-orm-data-source";
import { ExpressServer } from "./express-server";
import { config as readEnvConfig } from "dotenv";
import { consoleLogRequestMiddleware, errorHandlingMiddleware, ExpressMiddleware } from "../../shared/infrastructure/express-middleware";
import { ExpressEndpoint } from "../../shared/infrastructure/express-endpoint";
import { DataSource } from "typeorm";

export const buildEndpoints = (dependencies: {dataSource: DataSource}): ExpressEndpoint[] => [
    ExpressFindRootEndpoint.build(dependencies.dataSource),
];

export const buildMiddlewares = (): ExpressMiddleware[] => [
    errorHandlingMiddleware,
    consoleLogRequestMiddleware
];

export const bootstrapApiBackend = async () => {
    readEnvConfig();
    console.log("----------------\nstarting backend");
    console.log("connecting to db")
    const dataSource = await getDataSource().initialize();
    
    console.log("starting api");
    new ExpressServer()
        .applyMiddleware(buildMiddlewares())
        .addEndpoints(buildEndpoints({dataSource}))
        .configure()
        .start();
    console.log("----------------");
};