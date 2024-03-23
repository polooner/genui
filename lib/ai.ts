import Instructor from '@instructor-ai/instructor';
import OpenAI from 'openai';
import { MultiUserSchema, UserSchema } from './schemas';

const oai = new OpenAI({
  apiKey: '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',
});

const client = Instructor({
  client: oai,
  mode: 'FUNCTIONS',
});

// User will be of type z.infer<typeof UserSchema>
const user = await client.chat.completions.create({
  messages: [{ role: 'user', content: 'Jason Liu is 30 years old' }],
  model: 'gpt-3.5-turbo',
  response_model: {
    schema: UserSchema,
    name: 'User',
  },
});

console.log(user);

const textBlock = 'Users are: Amy (26), John (32), Demetri (47)';

const extractionStream = await client.chat.completions.create({
  messages: [{ role: 'user', content: textBlock }],
  model: 'gpt-4-1106-preview',
  response_model: {
    schema: MultiUserSchema,
    name: 'value extraction',
  },
  stream: true,
  seed: 1,
});

for await (const result of extractionStream) {
  try {
    console.clear();
    console.log(result);
  } catch (e) {
    console.log(e);
    break;
  }
}
