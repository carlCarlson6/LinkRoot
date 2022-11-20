import { DomainEvent } from "./domain-event";

export interface EventBus {
    dispatch(event: DomainEvent): Promise<void>;
}