import { Metric } from "./metric";

export class CalculatedVisitsMetric implements Metric {
    constructor(
        public entityId: string,
        public entityType: "root" | "link",
        public count: number,
        public lastVisit: Date,
    ) {}
}
