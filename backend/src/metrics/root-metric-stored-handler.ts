import { DomainError } from "../shared/core/domain-error";
import { EventHandler } from "../shared/core/events/event-handler";
import { RootMetricStored } from "./core/root-metric-stored";
import { StoreMetric } from "./core/store-metric";

export class RootMetricStoredHandler implements EventHandler<RootMetricStored> {
    constructor(
        private readonly repo: StoreMetric,
    ) {}

    handle(domainEvent: RootMetricStored): Promise<void> {
        throw new DomainError("NOT-IMPLETEMENTED", "Method not implemented.");
    }
}