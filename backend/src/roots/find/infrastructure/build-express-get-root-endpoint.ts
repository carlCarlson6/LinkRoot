import { MessageClient } from "@khaosdoctor/hermod";
import { DataSource } from "typeorm";
import { HermodEventBus } from "../../../shared/infrastructure/hermod/hermod-event-bus";
import { TypeOrmRootsRepository } from "../../infrastructure/db/type-orm-roots-repository";
import { VisitRoot } from "../visit-root";
import { ExpressGetRootEndpoint } from "./express-get-root-endpoint";

export const buildExpressGetRootEndpoint = (dataSource: DataSource, messageClient: MessageClient) =>
    new ExpressGetRootEndpoint(
        new VisitRoot(
            new TypeOrmRootsRepository(dataSource),
            new HermodEventBus(messageClient)));