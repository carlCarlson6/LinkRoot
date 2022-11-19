import { DomainEvent } from "./event";

export interface EventBus {
    dispatch(event: DomainEvent): Promise<void>;
}