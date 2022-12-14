import { RootMetricStored } from "../../metrics/core/root-metric-stored";
import { findAllRootMetricsWithTypeOrm } from "../../metrics/infrastructure/type-orm-find-root-metrics";
import { storeCalculatedVisitsMetricMetricEntityTypeOrm, storeMetricWithTypeOrm, storeVisitMetricEntityWithTypeOrm } from "../../metrics/infrastructure/type-orm-store-metric";
import { RootMetricStoredHandler } from "../../metrics/root-metric-stored-handler";
import { RootVisitedHandler } from "../../metrics/root-visited-handler";
import { RootVisited } from "../../shared/contracts/root-visited";
import { DomainEvent } from "../../shared/core/events/domain-event";
import { EventHandler } from "../../shared/core/events/event-handler";
import { HermodEventBus } from "../../shared/infrastructure/hermod/hermod-event-bus";
import { HermodEventHandler } from "../../shared/infrastructure/hermod/hermod-event-handler";
import { BackendDependencies } from "../utils/backend-dependencies";

export const bootstrapEventHandlers = ({messageClient, dataSource}: BackendDependencies) => {
    console.log("adding event handlers");
    const storeMetric = storeMetricWithTypeOrm(storeVisitMetricEntityWithTypeOrm(dataSource), storeCalculatedVisitsMetricMetricEntityTypeOrm(dataSource));
    const handlersAndQueues: {handler: EventHandler<DomainEvent>, queueName: string}[] = [
        {
            handler: new RootVisitedHandler(
                storeMetric, 
                new HermodEventBus(messageClient)),
            queueName: RootVisited.name,
        },
        {
            handler: new RootMetricStoredHandler(
                findAllRootMetricsWithTypeOrm(dataSource), 
                storeMetric),
            queueName: RootMetricStored.name,
        }
    ];
    handlersAndQueues.forEach(x => new HermodEventHandler(messageClient, x.handler, dataSource).listen(x.queueName))
};