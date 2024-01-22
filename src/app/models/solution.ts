import { SolutionSubject } from "./soultionSubject";

export interface Solution {
    id: number;
    // user: User; //to do
    subject: SolutionSubject;
    description: string;
    timeCreated: string;
    timeUpdated: string;
}
