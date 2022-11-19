import { DataSource } from "typeorm";
import { fail, IResult, ok } from "typescript-monads";
import { DomainError } from "../../shared/core/domain-error";
import { MetricsRepository } from "../core/metrics-repository";
import { RootMetric } from "../core/root-metric";
import { mapRootMetricToEntity, MetricEntity } from "./metric-entity";

export class TypeOrmMetricsRepository implements MetricsRepository {
    constructor(
        private readonly dataSource: DataSource,
    ) {}

    async storeRootMetric(metric: RootMetric): Promise<IResult<{}, DomainError>> {
        try {
            await this.dataSource.getRepository(MetricEntity).save(mapRootMetricToEntity(metric));
            return ok({});
        }
        catch {
            return fail(new DomainError("storeRootMetric-error", `there was an error while storing a root metric ${metric}`))
        }
    }
}