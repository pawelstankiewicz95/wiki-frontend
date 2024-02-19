import { User } from "./user";

export interface SolutionSubject {
    id: number;
    user?: User;
    title: string;
    timeCreated?: Date;
    timeUpdated?: Date;
}
