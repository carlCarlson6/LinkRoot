import { mockRoot, RootModel, rootSchema } from "./root";

const delay = (milliseconds: number) => new Promise(res => setTimeout(res, milliseconds));

export const fetchMockRoot = async (slug: string): Promise<RootModel> => {
    await delay(9999999999);
    return mockRoot;
}

export const feathRoot = async (slug: string): Promise<RootModel> => {
    console.log("env url", import.meta.env.VITE_BASE_URL);
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/root/${slug}`);
    const jsonData = await response.json();
    
    if (!response.ok) {
        const errorJsonData = jsonData as { message: string; type: string }
        throw new Error(errorJsonData.type);   
    }
    return rootSchema.parse(jsonData);
};