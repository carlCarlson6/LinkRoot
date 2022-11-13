import {fail, ok, IResult} from "typescript-monads";
import {FindRootQuery} from "./find-root-query";
import {FindRootOutput} from "./find-root-output";
import { RootsRepository } from "../roots-repository";
import { DomainError } from "../../shared/domain-error";
import { RootNotFound } from "./root-not-found";
import { UseCase } from "../../shared/use-case";

export class FindRoot implements UseCase<FindRootQuery, FindRootOutput> {
    constructor(
        private readonly repository: RootsRepository,
    ) {}

    async execute({slug}: FindRootQuery): Promise<IResult<FindRootOutput, DomainError>> {
        const maybeRoot = await this.repository.read({slug});
        return maybeRoot.match({
            some: root => ok({root}),
            none: () => fail(new RootNotFound())
        });
    }
}