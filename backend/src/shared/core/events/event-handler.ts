import { DomainEvent } from "./domain-event";

export interface EventHandler<T extends DomainEvent> {
    handle(domainEvent: T): Promise<void>;
}