import { UseCaseOutput } from "../../../shared/core/use-case";
import { Root } from "../../core/root";

export interface FindRootOutput extends UseCaseOutput {
    root: Root;
}