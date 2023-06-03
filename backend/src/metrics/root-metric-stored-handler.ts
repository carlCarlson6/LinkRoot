import { EventHandler } from "../shared/core/events/event-handler";
import { CalculatedVisitsMetric } from "./core/calculated-visits-metric";
import { FindRootMetrics } from "./core/find-metrics";
import { RootMetricStored } from "./core/root-metric-stored";
import { StoreMetric } from "./core/store-metric";

export class RootMetricStoredHandler implements EventHandler<RootMetricStored> {
    constructor(
        private readonly findAll: FindRootMetrics,
        private readonly store: StoreMetric,
    ) {}

    // TODO - re think implementation - maybe get
    async handle(domainEvent: RootMetricStored): Promise<void> {
        const rootMetrics = await this.findAll(domainEvent.rootId);
        const result = await this.store(new CalculatedVisitsMetric(
            domainEvent.rootId,
            "root",
            rootMetrics.length,
            new Date(domainEvent.producedAtMillis) // TODO  - review how to calculate it - load metric and increase +1
        ));
        result.mapFail(error => { throw error; });
    }
}