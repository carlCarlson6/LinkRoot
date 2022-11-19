import { fail, IResult, ok } from "typescript-monads";
import { DomainError } from "../../../shared/core/domain-error";
import { Root } from "../../core/root";
import { SlugBuilder } from "./slug-builder";
import { v4 as generateUuid } from "uuid";
import { Link } from "../../core/link";

type BuildRootData = {
    slug: string;
    owner: string;
    links: {
        url: string;
        text: string;
    }[];
};

export class RootBuilder {
    constructor(
        private readonly slugUniquenessValidator: SlugBuilder
    ) {}

    async execute(data: BuildRootData): Promise<IResult<Root, DomainError[]>> {
        const slugResult = await this.slugUniquenessValidator.execute(data.slug);
        return slugResult.match({
            ok: slug => ok(new Root(
                generateUuid(),
                slug,
                data.owner,
                data.links.map(l => new Link(generateUuid(), l.url, l.text))
            )),
            fail: error => fail([error])
        });
    }
}