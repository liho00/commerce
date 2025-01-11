import { createOpenAI } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';

const openrouter = createOpenAI({
  apiKey:
    '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',
  baseURL: 'https://openrouter.ai/api/v1',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  // Call the language model
  const result = await streamText({
    model: openrouter('openai/gpt-3.5-turbo'),
    messages: convertToCoreMessages(messages),
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      // implement your own logic here, e.g. for storing messages
      // or recording token usage
    },
  });

  // Respond with the stream
  return result.toDataStreamResponse();
}
