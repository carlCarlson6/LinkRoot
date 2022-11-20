import { DomainEvent } from "../../shared/core/events/domain-event";

export class RootMetricStored implements DomainEvent {
    public readonly eventName = RootMetricStored.name;
    constructor(
        public readonly eventId: string,
        public readonly producedAtMillis: number,
        public readonly rootMetricId: string,
    ) {}
}