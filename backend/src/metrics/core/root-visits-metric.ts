import { Metric } from "./metric";

export class RootVisitsMetric implements Metric {
    constructor(
        public rootId: string,
        public count: number,
        public lastVisit: Date,
    ) {}
}
