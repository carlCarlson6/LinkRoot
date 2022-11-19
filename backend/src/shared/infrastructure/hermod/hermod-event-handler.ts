import { MessageClient } from "@khaosdoctor/hermod";
import { DomainEvent } from "../../core/events/event";
import { EventHandler } from "../../core/events/event-handler";

export class HermodEventHandler<T extends DomainEvent> {
    constructor(
        private readonly messageClient: MessageClient,
        private readonly eventHandler: EventHandler<T>,
    ) {}

    listen(queueName: string) {
        this.messageClient.listenToQueue(queueName, async (message) => {
            console.log("handling event", queueName);
            console.log("event content", JSON.parse(message?.content.toString()!));
            try {
                await this.eventHandler.handle(JSON.parse(message?.content.toString()!));
                this.messageClient.ackMessage(message!);
            }
            catch(e) {
                console.log("error handling message");
            } 
        });
    }
}