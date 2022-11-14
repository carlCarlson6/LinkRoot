import { Request, Response } from "express";
import { mapToDto } from "./view-root-dto";
import { ExpressEndpoint } from "../../../shared/infrastructure/express-endpoint";
import { UseCase } from "../../../shared/use-case";
import { FindRootQuery } from "../../find/find-root-query";
import { Root } from "../../root";
import { DataSource } from "typeorm";
import { FindRoot } from "../../find/find-root";
import { SupabaseRootsRepository } from "../db/supabase-roots-repository";

export class ExpressFindRootEndpoint extends ExpressEndpoint {
    constructor(
        private readonly useCase: UseCase<FindRootQuery, Root>,
    ) {
        super("/api/root");
    }

    configRoute(): void {
        this.router.get(
            "/:slug", 
            (request: Request, response: Response) => this.whenCalled(request, response));
    }

    async whenCalled(request: Request, response: Response): Promise<void> {
        const query = new FindRootQuery(request.params.slug);
        const result = await this.useCase.execute(query);
        result.match({
            ok: output => response.status(200).send({...mapToDto(output)}),
            fail: error => response.status(404).send({...error}),
        });
    }

    static build(dataSource: DataSource): ExpressEndpoint {
        return new ExpressFindRootEndpoint(
            new FindRoot(
                new SupabaseRootsRepository(dataSource)));
    }
}
