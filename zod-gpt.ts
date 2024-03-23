import { AnthropicChatApi, } from 'llm-api';
import { completion, } from 'zod-gpt';
import { UserSchema } from './lib/ai_schemas';

const client = new AnthropicChatApi(
  {
    apiKey:
      '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',
  },
  { stream: true }
);

const response = await completion(client, 'Jason is 30 years old', {
  schema: UserSchema,

  //   messageHistory: [
  //     {
  //       role: 'user',
  //       content: 'Jason is 30 years old',
  //     },
  //   ],
});

console.log(response.);
