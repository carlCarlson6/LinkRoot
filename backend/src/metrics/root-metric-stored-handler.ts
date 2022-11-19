import { EventHandler } from "../shared/core/events/event-handler";
import { MetricsRepository } from "./core/metrics-repository";
import { RootMetricStored } from "./core/root-metric-stored";

export class RootMetricStoredHandler implements EventHandler<RootMetricStored> {
    constructor(
        private readonly repo: MetricsRepository,
    ) {}

    handle(domainEvent: RootMetricStored): Promise<void> {
        throw new Error("Method not implemented.");
    }
}