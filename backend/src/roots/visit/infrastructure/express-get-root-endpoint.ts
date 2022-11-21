import { Request, Response } from "express";
import { mapToDto } from "../../infrastructure/api/view-root-dto";
import { ExpressEndpoint } from "../../../shared/infrastructure/express/express-endpoint";
import { RootBySlugQuery } from "../core/root-by-slug-query";
import { RootNotFound } from "../core/root-not-found";
import { DomainError } from "../../../shared/core/domain-error";
import { VisitRootUseCase } from "../core/visit-root-use-case";
import { RequestMetadata } from "../../../shared/contracts/request-metadata";
import { VisitRootOkResult } from "../core/visit-root-ok-result";

export class ExpressGetRootEndpoint extends ExpressEndpoint {
    constructor(
        private readonly useCase: VisitRootUseCase,
    ) {
        super("/api/root");
    }

    configRoute(): void {
        this.router.get(
            "/:slug", 
            (request, response) => this.whenCalled(request, response));
    }

    async whenCalled(request: Request, response: Response): Promise<void> {
        console.log(request.ip, request.httpVersion);
        const query = new RootBySlugQuery(request.params.slug);
        const result = await this.useCase.execute(query);
        result.match({
            ok: outputFunc => this.handleSuccess(request, response, outputFunc),
            fail: errors => this.handleErrors(errors, response),
        });
    }

    async handleSuccess(request: Request, response: Response, getRoot: (metadata: RequestMetadata) => Promise<VisitRootOkResult>) {
        const {root, correlationId} = await getRoot({ip: request.ip, httpVersion: request.httpVersion});
        return response.status(200).send({
            ...mapToDto(root),
            correlationId
        })
    }

    async handleErrors(errors: DomainError[], response: Response) {
        const error = errors.find(() => true);
        if (!error) return response.status(500).send({message: "uncontrolled error - no additional info ):"});
        if (!(error instanceof RootNotFound)) return response.status(500).send({
            message: `${error.message}`,
            type: `${error.name}`
        });
        return response.status(404).send({
            message: `${error.message}`,
            type: `${error.name}`
        });
    }
}
