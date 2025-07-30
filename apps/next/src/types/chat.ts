interface IChat {
  question: string;
  answer?: {
    id: number;
    word: string;
    color: string;
  }[];
  solution?: string;
}
