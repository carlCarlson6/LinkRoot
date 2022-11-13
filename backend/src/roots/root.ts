import {Link} from "./link";

export class Root {
    constructor(
        readonly id: string,
        readonly slug: string,
        readonly owner: string,
        readonly links: Link[],
    ) {}
}

