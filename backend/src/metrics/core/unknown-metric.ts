import { DomainError } from "../../shared/core/domain-error";

export class UnknownMetric extends DomainError {
    constructor() {
        super(UnknownMetric.name, "the metric is not defined");
    }
}