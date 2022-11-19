import { fail, IResult, ok } from "typescript-monads";
import { DomainError } from "../../shared/core/domain-error";
import { UseCase } from "../../shared/core/use-case";
import { Root } from "../core/root";
import { RootBuilder } from "./core/root-builder";
import { RootsRepository } from "../core/roots-repository";
import { CreateRootCommand } from "./create-root-command";

export class RootCreator implements UseCase<CreateRootCommand, Root> {
    constructor(
        private readonly repo: RootsRepository,
        private readonly builder: RootBuilder,
    ) {}
    
    async execute(input: CreateRootCommand): Promise<IResult<Root, DomainError[]>> {
        const rootResult = await this.builder.execute(input);
        return await (rootResult
            .map(root => this.storeRoot(root))
            .unwrap());
    }

    async storeRoot(root: Root): Promise<IResult<Root, DomainError[]>> {
        const result = await this.repo.save(root);
        return result.match({
            ok: _ => ok(root),
            fail: error => fail([error])
        });
    }
}