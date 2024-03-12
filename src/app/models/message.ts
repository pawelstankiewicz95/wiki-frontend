import { User } from "./user";

export interface Message {
    id: number;
    message: string;
    timeCreated: Date;
    user: User;
}
