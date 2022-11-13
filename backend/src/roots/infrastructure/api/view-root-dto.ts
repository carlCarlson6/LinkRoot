import { Root } from "../../root";

export type ViewRootDto = {
    slug: string;
    links: {
        url: string;
        text: string;
    }[];
};

export const mapToDto = (root: Root): ViewRootDto => ({
    slug: root.slug,
    links: root.links.map(link => ({
        url: link.url,
        text: link.text,
    })),
});