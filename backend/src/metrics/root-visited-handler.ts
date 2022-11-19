import { randomUUID } from "crypto";
import { RootVisited } from "../shared/contracts/root-visited";
import { EventBus } from "../shared/core/events/event-bus";
import { EventHandler } from "../shared/core/events/event-handler";
import { MetricsRepository } from "./core/metrics-repository";
import { RootMetric } from "./core/root-metric";
import { RootMetricStored } from "./core/root-metric-stored";

export class RootVisitedHandler implements EventHandler<RootVisited> {
    constructor(
        private readonly repo: MetricsRepository,
        private readonly eventBus: EventBus,
    ) {}

    async handle(domainEvent: RootVisited): Promise<void> {
        const rootMetric: RootMetric = {
            id: randomUUID(),
            sessionId: domainEvent.sessionId,
            rootId: domainEvent.rootId,
            storedAt: new Date(domainEvent.producedAtMillis*1000),
            metadata: domainEvent.metadata,
        };
        const result = await this.repo.storeRootMetric(rootMetric);
        await result.match({
            ok: async _ => await this.onOk(rootMetric.rootId),
            fail: error => {throw error},
        });
    }

    async onOk(rootId: string) {
        await this.eventBus.dispatch(new RootMetricStored(
            randomUUID(), 
            Date.now(),
            rootId,
        ));
        console.log("event handled");
    }
}