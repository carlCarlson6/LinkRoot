import { MessageClient } from "@khaosdoctor/hermod";
import { EventBus } from "../../core/events/event-bus";
import { DomainEvent } from "../../core/events/event";

export class HermodEventBus implements EventBus {
    constructor(
        private readonly publisher: MessageClient,
    ) {}
    
    async dispatch(event: DomainEvent): Promise<void> {
        try {
            console.log("sending event", event);
            const isPublished = await this.publisher.postMessage(event, event.eventName);
            if (!isPublished) {
                throw new Error("publish post message failed");
            }
        }
        catch(error) {
            let message = 'unknown Error'
            if (error instanceof Error) message = error.message
            throw new Error(`can not publush event ${event} - ${message}`);
        }
    }
}