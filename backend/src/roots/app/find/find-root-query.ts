import { UseCaseInput } from "../../../shared/core/use-case";

export interface FindRootQuery extends UseCaseInput {
    rootName: string
}