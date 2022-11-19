import { Domain } from "domain";
import { IResult, ok, fail } from "typescript-monads";
import { DomainError } from "../../../shared/core/domain-error";
import { Slug } from "../../core/root";
import { RootsRepository } from "../../core/roots-repository";

export class SlugBuilder {
    constructor(
        private readonly repo: RootsRepository,
    ) {}

    async execute(slug: string): Promise<IResult<Slug, DomainError>> {
        const slugCandidate = new Slug(slug);
        return await this.validateUniquesness(slugCandidate);
    }

    async validateUniquesness(slugCandidate: Slug): Promise<IResult<Slug, DomainError>> {
        const maybeRoot = await this.repo.read({slug: slugCandidate});
        return maybeRoot.match({
            some: _ => fail(new SlugAlreadyInUse(slugCandidate.value)),
            none: () => ok(slugCandidate)
        });
    }
}

export class SlugAlreadyInUse extends DomainError {
    constructor(slug: string) {
        super("SlugAlreadyInUse", `${slug} is already in use`);
    }
}