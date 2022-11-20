export interface DomainEvent { 
    eventId: string;
    producedAtMillis: number;   
    eventName: string;
}
