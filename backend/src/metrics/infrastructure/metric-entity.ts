import e from "express";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { RootMetric } from "../core/root-metric";

@Entity()
export class MetricEntity extends BaseEntity {
    @PrimaryColumn({unique: true})
    id!: string;

    @Column()
    sessionId!: string;

    @Column()
    entityType!: "root" | "link";

    @Column()
    entityId!: string;

    @Column()
    stored!: Date;

    @Column({type: "json"})
    metadata!: string;
}

export const mapRootMetricToEntity = (domain: RootMetric) => {
    const entity = new MetricEntity();
    entity.id = domain.id;
    entity.sessionId = domain.sessionId;
    entity.entityType = "root";
    entity.entityId = domain.rootId;
    entity.stored = domain.storedAt;
    entity.metadata = JSON.stringify(domain.metadata);
    return entity;
};