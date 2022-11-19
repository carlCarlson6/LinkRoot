import { Entity, Column, BaseEntity, FindOptionsWhere, OneToMany, PrimaryColumn } from "typeorm"
import { Link } from "../../../core/link";
import { Root, Slug } from "../../../core/root"
import { LinkEntity } from "./link-entity";

@Entity()
export class RootEntity extends BaseEntity {
    @PrimaryColumn({unique: true}) 
    id!: string;
    
    @Column({ unique: true })
    slug!: string;
    
    @Column() 
    owner!: string;

    @OneToMany(() => LinkEntity, link => link.root)
    links!: LinkEntity[];
}

export const mapToDomain = (entity: RootEntity): Root => new Root(
    entity.id,
    new Slug(entity.slug),
    entity.owner,
    entity.links.map(l => new Link(
        l.id,
        l.url,
        l.text
    )),
);

export const partialMapToEntity = (partialDomain: Partial<Root>): FindOptionsWhere<RootEntity> => ({
    ...partialDomain,
    slug: partialDomain.slug?.value
});
