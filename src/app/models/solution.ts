import { SolutionSubject } from "./soultionSubject";

export interface Solution {
    id: number;
    // user: User; //to do
    solutionSubject?: SolutionSubject;
    solutionSubjectId?: number;
    description: string;
    timeCreated: Date;
    timeUpdated: Date;
}
