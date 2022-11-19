import {IMaybe, IResult} from "typescript-monads";
import { Root } from "./root";

export interface RootsRepository {
    save(root: Root): Promise<IResult<{}, Error>>
    read(filter: Partial<Root>): Promise<IMaybe<Root>>
}