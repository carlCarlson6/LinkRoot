import { IResult } from "typescript-monads";
import { DomainError } from "../../shared/core/domain-error";
import { Metric } from "./metric";

export type StoreMetric = (metric: Metric) => Promise<IResult<{}, DomainError>>;