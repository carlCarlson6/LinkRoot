import { CorrelationId } from "../../../shared/core/correlation-id";
import { Root } from "../../core/root";

export type VisitRootOkResult = {
    correlationId: CorrelationId;
    root: Root;
};
