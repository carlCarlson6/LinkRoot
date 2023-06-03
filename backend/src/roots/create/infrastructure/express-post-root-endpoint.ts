import { Request, Response } from "express";
import { UseCase } from "../../../shared/core/use-case";
import { ExpressEndpoint } from "../../../shared/infrastructure/express/express-endpoint";
import { CreateRootCommand } from "../create-root-command";
import { Root } from "../../core/root";
import { mapToDto } from "../../infrastructure/api/view-root-dto";

// TODO - add authentication
export class ExpressPostRootEndpoint extends ExpressEndpoint {
    constructor(
        private readonly useCase: UseCase<CreateRootCommand, Root>,
    ) {
        super("/api/root");
    }

    configRoute(): void {
        this.router.post(
            "",
            (request, response) => this.whenCalled(request, response));
    }

    async whenCalled(request: Request<any, any, CreateRootCommand>, response: Response): Promise<void> {
        const result = await this.useCase.execute(request.body);
        result.match({
            ok: output => response.status(201).send({...mapToDto(output)}),
            fail: error => response.status(500).send({...error}),
        });
    }
}
