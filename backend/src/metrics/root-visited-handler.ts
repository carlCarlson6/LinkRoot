import { randomUUID } from "crypto";
import { RootVisited } from "../shared/contracts/root-visited";
import { EventBus } from "../shared/core/events/event-bus";
import { EventHandler } from "../shared/core/events/event-handler";
import { StoreMetric } from "./core/store-metric";
import { RootVisitMetric } from "./core/root-visit-metric";
import { RootMetricStored } from "./core/root-metric-stored";

export class RootVisitedHandler implements EventHandler<RootVisited> {
    constructor(
        private readonly storeMetric: StoreMetric,
        private readonly eventBus: EventBus,
    ) {}

    async handle(domainEvent: RootVisited): Promise<void> {
        const rootMetric = new RootVisitMetric(
            randomUUID(),
            domainEvent.sessionId,
            domainEvent.rootId,
            new Date(domainEvent.producedAtMillis*1000), // TODO - review how calculation is down 
            domainEvent.metadata,
        );
        const result = await this.storeMetric(rootMetric);
        await result.match({
            ok: async _ => await this.onOk(rootMetric.rootId, rootMetric.id),
            fail: error => {throw error},
        });
    }

    async onOk(rootId: string, metricId: string) {
        await this.eventBus.dispatch(new RootMetricStored(
            randomUUID(), 
            Date.now(),
            metricId,
            rootId,
        ));
        console.log("event handled");
    }
}