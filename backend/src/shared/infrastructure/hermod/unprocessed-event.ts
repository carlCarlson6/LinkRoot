import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class UnprocessedEvent extends BaseEntity {
    @PrimaryColumn({ unique: true })
    eventId!: string;

    @Column()
    eventName!: string;

    @Column({ type: "json" })
    eventPayload!: string;

    @Column()
    createdAt!: Date;

    @Column({ type: "json" })
    error!: string;
}
