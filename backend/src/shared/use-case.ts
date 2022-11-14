import { IResult } from "typescript-monads";
import { DomainError } from "./domain-error";

export interface UseCase<UseCaseInput, UseCaseOutput> {
    execute(input: UseCaseInput): Promise<IResult<UseCaseOutput, DomainError>>
}