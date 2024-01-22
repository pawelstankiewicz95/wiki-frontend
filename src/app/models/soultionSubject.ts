import { Category } from "./category";

export interface SolutionSubject {
    id: number;
    //user: User; // to do
    title: string;
    timeCreated: Date;
    timeUpdated: Date;
    category: Category;
}
