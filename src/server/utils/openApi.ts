import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

interface Props {
  question: string;
  answer: string;
}

export async function gptCheckAnswer(props: Props) {
  const { question, answer } = props;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 512,
    messages: [
      {
        role: "system",
        content: "You are my teacher who checks the translation and grammar.",
      },
      {
        role: "assistant",
        content: "Translating text: 'Ich habe gestern Fußball gespielt.'",
      },
      {
        role: "user",
        content: "Answer: 'I played yesterday tennis.'",
      },
      {
        role: "assistant",
        content: "Correct: 'I played soccer yesterday.'",
      },
      {
        role: "assistant",
        content:
          "Translating text: 'Das war doch gar nicht so schlecht, oder?'",
      },
      {
        role: "user",
        content: "Answer: 'That wasn't so bad, was it?'",
      },
      {
        role: "assistant",
        content: "Correct: 'Correct'",
      },
      {
        role: "assistant",
        content: `Translating text: '${question}'`,
      },
      {
        role: "user",
        content: `Answer: '${answer}'`,
      },
    ],
  });

  return completion.data.choices[0]?.message;
}
