export enum PriorityType {
    Low = 1,
    Medium = 2,
    High = 3
}
export interface TaskType {
    id: number;
    title: string;
    description: string;
    priority: PriorityType;
}