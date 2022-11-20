import { DataSource } from "typeorm";
import { fail, IResult, ok } from "typescript-monads";
import { DomainError } from "../../shared/core/domain-error";
import { Metric } from "../core/metric";
import { StoreMetric } from "../core/store-metric";
import { RootVisitMetric } from "../core/root-visit-metric";
import { UnknownMetric } from "../core/unknown-metric";
import { mapRootVisitMetricToEntity, VisitMetricEntity } from "./metric-entity";

type StoreVisitMetricEntity = (entity: VisitMetricEntity) => Promise<IResult<{}, DomainError>>
export const storeVisitMetricEntityWithTypeOrm = (dataSource: DataSource): StoreVisitMetricEntity => async (entity: VisitMetricEntity): Promise<IResult<{}, DomainError>> => {
    try {
        await dataSource.getRepository(VisitMetricEntity).save(entity);
        return ok({});
    }
    catch {
        return fail(new DomainError("storeRootMetric-error", `there was an error while storing a root metric ${entity}`))
    }
}

export const storeMetricWithTypeOrm = (storeVisitMetricEntity: StoreVisitMetricEntity): StoreMetric => async (metric: Metric): Promise<IResult<{}, DomainError>> => {
    if (metric instanceof RootVisitMetric) {
        return await storeVisitMetricEntity(mapRootVisitMetricToEntity(metric));
    }
    
    return fail(new UnknownMetric());
}