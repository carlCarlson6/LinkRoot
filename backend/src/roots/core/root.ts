import {Link} from "./link";
import {Image} from "./image";

export class Root {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly image: Image,
        readonly owner: string,
        readonly links: Link[]
    ) {}
}

