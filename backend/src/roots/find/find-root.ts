import {fail, ok, IResult} from "typescript-monads";
import {FindRootQuery} from "./find-root-query";
import { RootsRepository } from "../core/roots-repository";
import { RootNotFound } from "./root-not-found";
import { UseCase } from "../../shared/core/use-case";
import { Root, Slug } from "../core/root";
import { DomainError } from "../../shared/core/domain-error";
import { EventBus } from "../../shared/core/events/event-bus";
import { randomUUID } from "crypto";
import { CorrelationId } from "../../shared/core/correlation-id";
import { RequestMetadata } from "../../shared/contracts/request-metadata";
import { RootVisited } from "../../shared/contracts/root-visited";

export type FindRootUseCase = UseCase<FindRootQuery, (metadata: RequestMetadata) => Promise<FindRootOkResult>>;
export type FindRootOkResult = {
    correlationId: CorrelationId;
    root: Root;
}

export class FindRoot implements FindRootUseCase {
    constructor(
        private readonly repository: RootsRepository,
        private readonly eventBus: EventBus,
    ) {}

    async execute({slug}: FindRootQuery): Promise<IResult<(metadata: RequestMetadata) => Promise<FindRootOkResult>, DomainError[]>> {
        const maybeRoot = await this.repository.read({slug: new Slug(slug)});
        return maybeRoot.match({
            some: root => ok(this.handleFoundRoot(root)),
            none: () => fail([new RootNotFound(slug)])
        });
    }

    handleFoundRoot(root: Root) {
        return async (metadata: RequestMetadata) => {
            const correlationId: CorrelationId = randomUUID();
            await this.eventBus.dispatch(new RootVisited(
                randomUUID(),
                Date.now(),
                root.id,
                correlationId,
                metadata,
            ));
            return { root, correlationId };
        }
    }
}