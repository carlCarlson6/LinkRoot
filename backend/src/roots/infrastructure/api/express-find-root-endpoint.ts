import { Request, Response } from "express";
import { mapToDto } from "./view-root-dto";
import { BaseExpressEndpoint } from "../../../shared/infrastructure/express-endpoint";
import { UseCase } from "../../../shared/use-case";
import { FindRootQuery } from "../../find/find-root-query";
import { FindRootOutput } from "../../find/find-root-output";

export class ExpressFindRootEndpoint extends BaseExpressEndpoint {
    
    constructor(
        private readonly useCase: UseCase<FindRootQuery, FindRootOutput>,
    ) {
        super("/api/root");
    }

    configRoute(): void {
        this.router.get(
            "/:slug", 
            (request: Request, response: Response) => this.whenCalled(request, response));
    }

    async whenCalled(request: Request, response: Response): Promise<void> {
        const slug = request.params.slug;
        console.log("request params", request.params);
        const result = await this.useCase.execute({slug});
        result.match({
            ok: output => response.status(200).send({...mapToDto(output.root)}),
            fail: error => response.status(404).send({...error}),
        });
    }
}
