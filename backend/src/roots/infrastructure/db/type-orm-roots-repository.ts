import { DataSource } from "typeorm"
import {IMaybe, IResult, none, some} from "typescript-monads";
import { Root } from "../../core/root";
import { RootsRepository } from "../../core/roots-repository";
import { LinkEntity } from "./models/link-entity";
import { mapToDomain, partialMapToEntity, RootEntity } from "./models/root-entity";

export class TypeOrmRootsRepository implements RootsRepository {
    constructor(
        private readonly dataSource: DataSource
    ) {}

    save(root: Root): Promise<IResult<{}, Error>> {
        throw new Error("Method not implemented.");
    }

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
