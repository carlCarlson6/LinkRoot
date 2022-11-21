import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { CalculatedVisitsMetric } from "../core/calculated-visits-metric";

@Entity()
export class CalculatedVisitsMetricEntity extends BaseEntity {
    @PrimaryColumn() entityId!: string;
    @Column() entityType!: "root" | "link";
    @Column({type: "integer"}) count!: number;
    @Column() lastVisit!: Date;
}

export const mapToCalculatedVisitsMetricEntity = (domain: CalculatedVisitsMetric): CalculatedVisitsMetricEntity => {
    const entity = new CalculatedVisitsMetricEntity();
    entity.entityId = domain.entityId;
    entity.entityType = domain.entityType;
    entity.count = domain.count;
    entity.lastVisit = domain.lastVisit;
    return entity;
}