import { config as readEnvConfig } from "dotenv";
import { ExpressServer } from "./applications/express-server";
import { FindRoot } from "./roots/find/find-root";
import { ExpressFindRootEndpoint } from "./roots/infrastructure/api/express-find-root-endpoint";
import { SupabaseRootsRepository } from "./roots/infrastructure/db/supabase-roots-repository";
import { getDataSource } from "./roots/infrastructure/db/type-orm-data-source";

const bootstrapBackend = async () => {
    console.log("starting backend");

    const dataSource = getDataSource();
    const initializedDataSource = await dataSource.initialize();

    const endpoints = [
        new ExpressFindRootEndpoint(
            new FindRoot(
                new SupabaseRootsRepository(initializedDataSource))),
    ];

    console.log("starting api");
    new ExpressServer(endpoints)
        .applyMiddleware()
        .addEndpoints()
        .configure()
        .start();
};

readEnvConfig();
bootstrapBackend();