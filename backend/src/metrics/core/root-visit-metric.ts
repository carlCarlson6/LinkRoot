import { RequestMetadata } from "../../shared/contracts/request-metadata"
import { Metric } from "./metric";

export class RootVisitMetric implements Metric {
    constructor(
        public id: string,
        public sessionId: string,
        public rootId: string,
        public storedAt: Date,
        public metadata: RequestMetadata,
    ) {}
}
