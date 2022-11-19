import {Link} from "./link";

export class Root {
    constructor(
        readonly id: string,
        readonly slug: Slug,
        readonly owner: string,
        readonly links: Link[],
    ) {}
}

export class Slug {
    constructor(
        readonly value: string,
    ) {
        this.value = value;
        if (!this.value) {
            throw Error("invalid slug");
        }
        if (this.value.length === 0) {
            throw Error("invalid slug");
        }
    }
}