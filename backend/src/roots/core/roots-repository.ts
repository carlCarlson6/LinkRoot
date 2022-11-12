import {IMaybe} from "typescript-monads";
import { Root } from "./root";

export interface RootsRepository {
    read(filter: Partial<Root>): Promise<IMaybe<Root>>
}