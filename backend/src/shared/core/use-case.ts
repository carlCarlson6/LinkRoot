import { IResult } from "typescript-monads";
import { DomainError } from "./domain-error";

export interface UseCase<T, R> {
    execute(input: T): Promise<IResult<R, DomainError[]>>
}