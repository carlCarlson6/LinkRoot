import { DomainEvent } from "../core/events/domain-event";
import { RequestMetadata } from "./request-metadata";

export class RootVisited implements DomainEvent {
    public readonly eventName: string = RootVisited.name;
    constructor(
        public readonly eventId: string,
        public readonly producedAtMillis: number,
        public readonly rootId: string,
        public readonly sessionId: string,
        public readonly metadata: RequestMetadata,
    ) {}    
}