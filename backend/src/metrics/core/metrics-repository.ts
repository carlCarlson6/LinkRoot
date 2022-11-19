import { IResult } from "typescript-monads";
import { DomainError } from "../../shared/core/domain-error";
import { RootMetric } from "./root-metric";

export interface MetricsRepository {
    storeRootMetric(metric: RootMetric): Promise<IResult<{}, DomainError>>;
}