import { DomainEvent } from "./event";

export interface EventHandler<T extends DomainEvent> {
    handle(domainEvent: T): Promise<void>;
}