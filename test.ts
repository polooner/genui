import Instructor from '@instructor-ai/instructor';
import OpenAI from 'openai';
import { UserSchema } from './lib/schemas';

// const oai = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_FILIP_ANTHROPIC_API_KEY,
//   organization: process.env.OPENAI_ORG_ID ?? undefined,
//   baseURL: 'https://api.anthropic.com/v1/messages',
// });
const oai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_FILIP_ANTHROPIC_API_KEY,
  //   organization: process.env.OPENAI_ORG_ID ?? undefined,
  baseURL: 'https://api.anthropic.com/v1/messages',
});

const client = Instructor({
  client: oai,
  mode: 'TOOLS',
});

// User will be of type z.infer<typeof UserSchema>
const user = await client.chat.completions.create({
  messages: [{ role: 'user', content: 'say hello world!' }],
  model: 'claude-3-opus-20240229',
  max_tokens: 2048,
  response_model: {
    schema: UserSchema,
    name: 'User',
  },
});

console.log(user);
