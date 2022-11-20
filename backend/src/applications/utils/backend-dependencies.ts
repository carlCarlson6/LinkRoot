import { MessageClient } from "@khaosdoctor/hermod";
import { DataSource } from "typeorm";

export type BackendDependencies = {
    messageClient: MessageClient;
    dataSource: DataSource;
};
