import { MessageClient } from "@khaosdoctor/hermod";
import { BaseEntity, Column, DataSource, Entity, PrimaryColumn } from "typeorm";
import { DomainEvent } from "../../core/events/event";
import { EventHandler } from "../../core/events/event-handler";

export class HermodEventHandler {
    constructor(
        private readonly messageClient: MessageClient,
        private readonly eventHandler: EventHandler<DomainEvent>,
        private readonly dataSource: DataSource, // TODO - store processed event;
    ) {}

    listen(queueName: string) {
        this.messageClient.listenToQueue(queueName, async (message) => {
            const domainEvent: DomainEvent = JSON.parse(message?.content.toString()!);
            console.log("handling event =>", domainEvent.eventName, ":", domainEvent.eventId);
            try {
                await this.eventHandler.handle(domainEvent);
                this.messageClient.ackMessage(message!);
            }
            catch(e) {
                const error = e as Error;
                console.log("error handling message =>", domainEvent.eventName, ":", domainEvent.eventId, "-", error.message);
                this.messageClient.ackMessage(message!);
                await this.storeUnprocessedEvent(domainEvent, error);
            } 
        });
    }

    private async storeUnprocessedEvent(domainEvent: DomainEvent, error: Error) {
        const unprocessedEvent = new UnprocessedEvent();
        unprocessedEvent.eventId = domainEvent.eventId;
        unprocessedEvent.eventName = domainEvent.eventName;
        unprocessedEvent.eventPayload = JSON.stringify(domainEvent);
        unprocessedEvent.createdAt = new Date();
        unprocessedEvent.error = JSON.stringify({name: error.name, message: error.name, stack: error.stack});

        await this.dataSource.getRepository(UnprocessedEvent).save(unprocessedEvent);
    }
}

@Entity()
export class UnprocessedEvent extends BaseEntity {
    @PrimaryColumn({unique:true})
    eventId!: string;

    @Column()
    eventName!: string;

    @Column({type:"json"})
    eventPayload!: string;
 
    @Column()
    createdAt!: Date;

    @Column({type:"json"})
    error!: string;
}