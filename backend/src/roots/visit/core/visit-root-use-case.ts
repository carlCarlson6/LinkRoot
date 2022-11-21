import { RootBySlugQuery } from "./root-by-slug-query";
import { UseCase } from "../../../shared/core/use-case";
import { RequestMetadata } from "../../../shared/contracts/request-metadata";
import { VisitRootOkResult } from "./visit-root-ok-result";

export type VisitRootUseCase = UseCase<RootBySlugQuery, (metadata: RequestMetadata) => Promise<VisitRootOkResult>>;
