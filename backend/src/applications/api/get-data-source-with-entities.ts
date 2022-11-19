import { MetricEntity } from "../../metrics/infrastructure/metric-entity";
import { LinkEntity } from "../../roots/infrastructure/db/models/link-entity";
import { RootEntity } from "../../roots/infrastructure/db/models/root-entity";
import { UnprocessedEvent } from "../../shared/infrastructure/hermod/hermod-event-handler";
import { getDataSource } from "../../shared/infrastructure/type-orm/type-orm-data-source";

export const getDataSourceWithEntities = () => getDataSource([
    RootEntity, 
    LinkEntity, 
    MetricEntity, 
    UnprocessedEvent,
]);