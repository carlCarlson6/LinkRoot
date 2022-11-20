import {fail, ok, IResult} from "typescript-monads";
import {RootBySlugQuery} from "./core/root-by-slug-query";
import { RootsRepository } from "../core/roots-repository";
import { RootNotFound } from "./core/root-not-found";
import { Root, Slug } from "../core/root";
import { DomainError } from "../../shared/core/domain-error";
import { EventBus } from "../../shared/core/events/event-bus";
import { randomUUID } from "crypto";
import { CorrelationId } from "../../shared/core/correlation-id";
import { RequestMetadata } from "../../shared/contracts/request-metadata";
import { RootVisited } from "../../shared/contracts/root-visited";
import { VisitRootUseCase } from "./core/visit-root-use-case";
import { VisitRootOkResult } from "./core/visit-root-ok-result";

export class VisitRoot implements VisitRootUseCase {
    constructor(
        private readonly repository: RootsRepository,
        private readonly eventBus: EventBus,
    ) {}

    async execute({slug}: RootBySlugQuery): Promise<IResult<(metadata: RequestMetadata) => Promise<VisitRootOkResult>, DomainError[]>> {
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