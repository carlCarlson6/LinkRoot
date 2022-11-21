import { DataSource } from "typeorm";
import { RequestMetadata } from "../../shared/contracts/request-metadata";
import { FindRootMetrics } from "../core/find-metrics";
import { RootVisitMetric } from "../core/root-visit-metric";
import { VisitMetricEntity } from "./visit-metric-entity";

export const findAllRootMetricsWithTypeOrm = (dataSource: DataSource): FindRootMetrics => async (rootId: string) => {
    const entities = await dataSource.getRepository(VisitMetricEntity).findBy({entityId: rootId, entityType: "root"});
    return entities.map(e => new RootVisitMetric(
        e.id,
        e.sessionId,
        e.entityId,
        e.stored,
        JSON.parse(e.metadata) as RequestMetadata
    ));
};