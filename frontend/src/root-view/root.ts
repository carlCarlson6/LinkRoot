import {z} from "zod";
import { toZod } from "tozod";

export interface RootModel {
    slug:  string;
    links: LinkModel[];
}

export interface LinkModel {
    url:  string;
    text: string;
}

export const rootSchema: toZod<RootModel> = z.object({
    slug: z.string(),
    links: z.array(z.object({
        url: z.string(),
        text: z.string(),
    })),
});

export const mockRoot: RootModel = {
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