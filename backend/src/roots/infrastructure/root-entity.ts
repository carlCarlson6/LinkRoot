import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, FindOptionsWhere } from "typeorm"
import { Root } from "../core/root"

@Entity()
export class RootEntity extends BaseEntity {
    id!: number
    firstName!: string
    lastName!: string
    isActive!: boolean
}

export function mapToDomain(entity: RootEntity): Root {
    throw new Error("not implemented");
} 

export function partialMapToEntity(partialDomain: Partial<Root>): FindOptionsWhere<RootEntity> {
    throw new Error("not implemented");
}