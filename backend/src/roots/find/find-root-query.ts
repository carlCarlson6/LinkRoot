import { UseCaseInput } from "../../shared/use-case";

export class FindRootQuery implements UseCaseInput {
    constructor(
        public readonly slug: string,
    ) {
        if (!slug) {
            throw Error("invalid slug");
        }
        if (slug.length === 0) {
            throw Error("invalid slug");
        }
    }
}