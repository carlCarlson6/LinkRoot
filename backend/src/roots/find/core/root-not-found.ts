import { DomainError } from "../../../shared/core/domain-error";

export class RootNotFound extends DomainError {
    constructor(slug: string) {
        super("RootNotFound",`root not found with slug: ${slug}`);
    }
}