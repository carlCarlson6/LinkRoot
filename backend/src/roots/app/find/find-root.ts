import {fail, ok, IResult} from "typescript-monads";
import {FindRootQuery} from "./find-root-query";
import {FindRootOutput} from "./find-root-output";
import { UseCase } from "../../../shared/core/use-case";
import { RootsRepository } from "../../core/roots-repository";
import { DomainError } from "../../../shared/core/domain-error";
import { RootNotFound } from "../../core/root-not-found";

export class FindRoot implements UseCase<FindRootQuery, FindRootOutput> {
    constructor(
        private readonly repository: RootsRepository,
    ) {}

    async execute({rootName}: FindRootQuery): Promise<IResult<FindRootOutput, DomainError>> {
        const maybeRoot = await this.repository.read({name: rootName});
        return maybeRoot.match({
            some: root => ok({root}),
            none: () => fail(new RootNotFound())
        });
    }
}