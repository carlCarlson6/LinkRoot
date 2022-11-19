import { Root } from "../../core/root";

export type ViewRootDto = {
    slug: string;
    links: {
        url: string;
        text: string;
    }[];
};

export const mapToDto = (root: Root): ViewRootDto => ({
    slug: root.slug.value,
    links: root.links.map(link => ({
        url: link.url,
        text: link.text,
    })),
});