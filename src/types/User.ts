export type User = {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    projects: string[];
    ticketsCompleted: number;
}