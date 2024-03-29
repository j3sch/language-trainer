export interface IHistory {
  id?: number;
  question: string;
  answer: string;
  solution: string;
  user_id?: string;
  favorite: boolean | null;
  percentage: number;
}
