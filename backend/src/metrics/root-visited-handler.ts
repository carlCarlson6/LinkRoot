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
        const rootMetric: RootVisitMetric = {
            id: randomUUID(),
            sessionId: domainEvent.sessionId,
            rootId: domainEvent.rootId,
            storedAt: new Date(domainEvent.producedAtMillis*1000), // TODO - review how calculation is down 
            metadata: domainEvent.metadata,
        };
        const result = await this.storeMetric(rootMetric);
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