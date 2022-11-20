import { config as readEnvConfig } from "dotenv";
import { getMessageClient } from "../shared/infrastructure/hermod/get-message-client";
import { bootstrapApi } from "./api/bootstrap-api";
import { bootstrapEventHandlers } from "./event-handlers/bootstrap-event-handlers";
import { getDataSourceWithEntities } from "./utils/get-data-source-with-entities";

export const bootrapBackend = async () => {
    readEnvConfig();
    console.log("----------------\nstarting backend");

    const dataSource = await getDataSourceWithEntities().initialize();
    const messageClient = getMessageClient();
    const dependencies = {messageClient, dataSource};

    bootstrapEventHandlers(dependencies);
    bootstrapApi(dependencies);
}