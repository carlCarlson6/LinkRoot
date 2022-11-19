import { DataSource } from "typeorm";
import { TypeOrmRootsRepository } from "../../infrastructure/db/type-orm-roots-repository";
import { RootBuilder } from "../core/root-builder";
import { SlugBuilder } from "../core/slug-builder";
import { RootCreator } from "../root-creator";
import { ExpressPostRootEndpoint } from "./express-post-root-endpoint";

export const buildExpressPostRootEndpoint = (dataSource: DataSource) => {
    const repo = new TypeOrmRootsRepository(dataSource);
    return new ExpressPostRootEndpoint(
        new RootCreator(
            repo,
            new RootBuilder(
                new SlugBuilder(repo)
            )));
}
