import { Question } from "./question.model";

export interface Quiz {
    id? : number;
    title?: string;
    question?: Question [];
}
