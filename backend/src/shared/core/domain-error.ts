export class DomainError extends Error {
    constructor(errorName: string, errorMessage: string) {
        super();
        this.message = errorMessage;
        this.name = errorName;
    }
}