import { SolutionSubject } from "./soultionSubject";

export interface Solution {
    id: number;
    // user: User; //to do
    solutionSubject: SolutionSubject;
    description: string;
    timeCreated: string;
    timeUpdated: string;
}
