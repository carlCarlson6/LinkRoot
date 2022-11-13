import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { RootEntity } from "./root-entity";

@Entity()
export class LinkEntity extends BaseEntity {
    @PrimaryColumn({unique: true}) 
    id!: string;

    @Column() 
    url!: string;
    
    @Column() 
    text!: string;

    @ManyToOne(() => RootEntity, root => root.links)
    root!: RootEntity;
}
