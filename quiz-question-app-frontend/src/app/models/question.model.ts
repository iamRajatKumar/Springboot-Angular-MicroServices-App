import { Options } from "./options.model";

export interface Question {
    questionId?: number;
    question: string;
    quizId: number;
    options?: Options[];
//    correctAnswer: string;
}
