import { RequestMetadata } from "../../shared/contracts/request-metadata"

export type RootMetric = {
    id: string,
    sessionId: string,
    rootId: string,
    storedAt: Date,
    metadata: RequestMetadata,
}