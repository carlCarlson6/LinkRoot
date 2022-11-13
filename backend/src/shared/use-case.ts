import {IResult, Result} from "typescript-monads";
import {DomainError} from "./domain-error";

export interface UseCaseInput {}
export interface UseCaseOutput {}

export interface UseCase<UseCaseInput, UseCaseOutput> {
    execute(input: UseCaseInput): Promise<IResult<UseCaseOutput, DomainError>>
}