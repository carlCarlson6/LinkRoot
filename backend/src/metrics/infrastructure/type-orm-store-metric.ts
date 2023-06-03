import { DataSource } from "typeorm";
import { fail, IResult, ok } from "typescript-monads";
import { DomainError } from "../../shared/core/domain-error";
import { Metric } from "../core/metric";
import { StoreMetric } from "../core/store-metric";
import { RootVisitMetric } from "../core/root-visit-metric";
import { UnknownMetric } from "../core/unknown-metric";
import { mapLinkVisitMetricToEntity, mapRootVisitMetricToEntity, VisitMetricEntity } from "./visit-metric-entity";
import { CalculatedVisitsMetric } from "../core/calculated-visits-metric";
import { LinkVisitMetric } from "../core/link-visit-metric";
import { CalculatedVisitsMetricEntity, mapToCalculatedVisitsMetricEntity } from "./calculated-visits-metric-entity";

type StoreVisitMetricEntity = (entity: VisitMetricEntity) => Promise<IResult<{}, DomainError>>;
export const storeVisitMetricEntityWithTypeOrm = (dataSource: DataSource): StoreVisitMetricEntity => async (entity: VisitMetricEntity): Promise<IResult<{}, DomainError>> => {
    try {
        await dataSource.getRepository(VisitMetricEntity).save(entity);
        return ok({});
    }
    catch(e) {
        const error = e as Error;
        return fail(new DomainError("storeRootMetric-error", `there was an error while storing a visit metric - ${error.message}`))
    }
}

type StoreCalculatedVisitsMetricMetricEntity = (entity: CalculatedVisitsMetricEntity) => Promise<IResult<{}, DomainError>>;
export const storeCalculatedVisitsMetricMetricEntityTypeOrm = (dataSource: DataSource): StoreCalculatedVisitsMetricMetricEntity => async (entity: CalculatedVisitsMetricEntity): Promise<IResult<{}, DomainError>> => {
    try {
        await dataSource.getRepository(CalculatedVisitsMetricEntity).save(entity, {});
        return ok({});
    }
    catch(e) {
        const error = e as Error;
        console.log(error.message)
        return fail(new DomainError("CalculatedVisitsMetricEntity-error", `there was an error while storing a calculated visits metric - ${error.message}`));
    }
}

export const storeMetricWithTypeOrm = (storeVisitMetricEntity: StoreVisitMetricEntity, storeCalculatedVisitsMetricMetricEntity: StoreCalculatedVisitsMetricMetricEntity): StoreMetric => async (metric: Metric): Promise<IResult<{}, DomainError>> => {
    console.log(metric);
    if (metric instanceof RootVisitMetric) {
        return await storeVisitMetricEntity(mapRootVisitMetricToEntity(metric));
    }
    if (metric instanceof LinkVisitMetric) {
        return await storeVisitMetricEntity(mapLinkVisitMetricToEntity(metric));
    }
    if (metric instanceof CalculatedVisitsMetric) {
        return await storeCalculatedVisitsMetricMetricEntity(mapToCalculatedVisitsMetricEntity(metric));
    }
    
    return fail(new UnknownMetric());
}