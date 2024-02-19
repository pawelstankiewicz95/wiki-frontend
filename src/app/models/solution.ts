import { SolutionSubject } from "./soultionSubject";
import { User } from "./user";

export interface Solution {
    id: number;
    user?: User;
    solutionSubject?: SolutionSubject;
    solutionSubjectId?: number;
    description: string;
    timeCreated?: Date;
    timeUpdated: Date;
}
