import { DataSource } from "typeorm"
import {IMaybe, Maybe, none, some} from "typescript-monads";
import { Root } from "../core/root";
import { RootsRepository } from "../core/roots-repository";
import { mapToDomain, partialMapToEntity, RootEntity } from "./root-entity";

export class SupabaseRootsRepository implements RootsRepository {
    constructor(
        private readonly dataSource: DataSource
    ) {}

    async read(filter: Partial<Root>): Promise<IMaybe<Root>> {
        const rootEntity = await this.dataSource.getRepository(RootEntity).findOneBy(partialMapToEntity(filter));
        if(rootEntity === null){
            return none();
        }
            
        const root = mapToDomain(rootEntity)
        return some(root);
    }
    
}