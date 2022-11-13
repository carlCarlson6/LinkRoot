import { UseCaseOutput } from "../../shared/use-case";
import { Root } from "../root";

export interface FindRootOutput extends UseCaseOutput {
    root: Root;
}