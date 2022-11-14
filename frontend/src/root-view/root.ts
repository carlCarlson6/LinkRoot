import {z} from "zod";
import { toZod } from "tozod";

export interface Root {
    slug:  string;
    links: Link[];
}

export interface Link {
    url:  string;
    text: string;
}

export const rootSchema: toZod<Root> = z.object({
    slug: z.string(),
    links: z.array(z.object({
        url: z.string(),
        text: z.string(),
    })),
});

export const mockRoot: Root = {
    slug: "carl",
    links: [
        {
            url: "https://www.linkedin.com/in/carlos-acitores-deval-a3914a1b/",
            text: "linkedin"
        },
        {
            url: "https://github.com/carlCarlson6",
            text: "github"
        }
    ]
}