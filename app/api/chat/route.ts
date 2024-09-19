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
    model: openrouter('qwen/qwen-2-7b-instruct'),
    messages: convertToCoreMessages(messages),
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      // implement your own logic here, e.g. for storing messages
      // or recording token usage
    },
  });

  // Respond with the stream
  return result.toDataStreamResponse();
}
