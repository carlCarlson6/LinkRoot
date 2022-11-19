import { LinkEntity } from "../../roots/infrastructure/db/models/link-entity";
import { RootEntity } from "../../roots/infrastructure/db/models/root-entity";
import { getDataSource } from "../../shared/infrastructure/type-orm/type-orm-data-source";

export const getDataSourceWithEntities = () => getDataSource([RootEntity, LinkEntity]);