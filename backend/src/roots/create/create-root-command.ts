
export type CreateRootCommand = {
    slug: string;
    owner: string;
    links: {
        url: string;
        text: string;
    }[];
};
