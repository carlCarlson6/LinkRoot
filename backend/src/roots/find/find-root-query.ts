export class FindRootQuery {
    public readonly slug: string

    constructor(slug: string,) {
        this.slug = slug;
        if (!this.slug) {
            throw Error("invalid slug");
        }
        if (this.slug.length === 0) {
            throw Error("invalid slug");
        }
    }
}