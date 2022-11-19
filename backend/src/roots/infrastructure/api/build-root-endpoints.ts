import { MessageClient } from "@khaosdoctor/hermod";
import { DataSource } from "typeorm";
import { buildExpressPostRootEndpoint } from "../../create/infrastructure/build-express-post-root-endpoint";
import { buildExpressGetRootEndpoint } from "../../find/infrastructure/build-express-get-root-endpoint";

export type EndpointsDependencies = {
    dataSource: DataSource;
    messageClient: MessageClient;
}

export const buildRootEndpoints = ({dataSource, messageClient}: EndpointsDependencies) => [
    buildExpressGetRootEndpoint(dataSource, messageClient),
    buildExpressPostRootEndpoint(dataSource),
];
