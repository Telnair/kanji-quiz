export enum QuizType {
  Meanings = 'Meanings',
  Kanji = 'Kanji',
}

export interface QuizElement {
  kanji: string;
  meaning: string;
}

export interface QuestionItem {
  questionItem: QuizElement;
  suggestions: QuizElement[];
}

export interface GetQuestionSettings {
  quizType: QuizType;
  exclude: Set<string>;
  upTo: number;
  startFrom: number;
  isRandom: boolean;
}

export type RangeValue = number | null;

export type IncorrectAnswer = [ QuizElement, QuizElement ];