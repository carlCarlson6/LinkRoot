import { DataSource } from "typeorm"
import {IMaybe, none, some} from "typescript-monads";
import { Root } from "../../root";
import { RootsRepository } from "../../roots-repository";
import { mapToDomain, partialMapToEntity, RootEntity } from "./root-entity";
import { LinkEntity } from "./link-entity";

export class SupabaseRootsRepository implements RootsRepository {
    constructor(
        private readonly dataSource: DataSource
    ) {}

    async read(filter: Partial<Root>): Promise<IMaybe<Root>> {
        const rootEntity = await this.dataSource.getRepository(RootEntity).findOneBy(partialMapToEntity(filter));
        if (rootEntity === null) {
            return none();
        }
        
        const links = await this.dataSource.getRepository(LinkEntity).findBy({
            root: {
                id: rootEntity?.id
            }
        });
        rootEntity!.links = links;
        return some(mapToDomain(rootEntity));
    }    
}
