import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { RootVisitMetric } from "../core/root-visit-metric";

@Entity()
export class VisitMetricEntity extends BaseEntity {
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

export const mapRootVisitMetricToEntity = (domain: RootVisitMetric) => {
    const entity = new VisitMetricEntity();
    entity.id = domain.id;
    entity.sessionId = domain.sessionId;
    entity.entityType = "root";
    entity.entityId = domain.rootId;
    entity.stored = domain.storedAt;
    entity.metadata = JSON.stringify(domain.metadata);
    return entity;
};