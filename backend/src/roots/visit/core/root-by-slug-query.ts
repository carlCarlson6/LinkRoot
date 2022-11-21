export class RootBySlugQuery {
    constructor(
        public readonly slug: string
    ) {
        if (!this.slug) {
            throw Error("invalid slug");
        }
        if (this.slug.length === 0) {
            throw Error("invalid slug");
        }
    }
}