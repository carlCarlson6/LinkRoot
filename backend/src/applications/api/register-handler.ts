import { MessageClient } from "@khaosdoctor/hermod"
import { DataSource } from "typeorm"
import { RootMetricStored } from "../../metrics/core/root-metric-stored"
import { TypeOrmMetricsRepository } from "../../metrics/infrastructure/type-orm-metrics-repository"
import { RootMetricStoredHandler } from "../../metrics/root-metric-stored-handler"
import { RootVisitedHandler } from "../../metrics/root-visited-handler"
import { RootVisited } from "../../shared/contracts/root-visited"
import { DomainEvent } from "../../shared/core/events/event"
import { EventHandler } from "../../shared/core/events/event-handler"
import { HermodEventBus } from "../../shared/infrastructure/hermod/hermod-event-bus"
import { HermodEventHandler } from "../../shared/infrastructure/hermod/hermod-event-handler"

type Dependencies = {
    messageClient: MessageClient,
    dataSource: DataSource,
}

export const registerHandlers = ({messageClient, dataSource}: Dependencies) => {
    const handlersAndQueues: {handler: EventHandler<DomainEvent>, queueName: string}[] = [
        {
            handler: new RootVisitedHandler(new TypeOrmMetricsRepository(dataSource), new HermodEventBus(messageClient)),
            queueName: RootVisited.name,
        },
        {
            handler: new RootMetricStoredHandler(new TypeOrmMetricsRepository(dataSource)),
            queueName: RootMetricStored.name,
        }
    ];
    handlersAndQueues.forEach(x => new HermodEventHandler(messageClient, x.handler).listen(x.queueName))
};