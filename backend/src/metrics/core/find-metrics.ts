import { RootVisitMetric } from "./root-visit-metric";

export type FindRootMetrics = (rootId: string) => Promise<RootVisitMetric[]>;