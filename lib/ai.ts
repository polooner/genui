import Instructor from '@instructor-ai/instructor';
import OpenAI from 'openai';
import { ImageBlock, MultiImageBlockRequest, UISelection } from './schemas';

const GPT4 = 'gpt-4-0125-preview'
const GPT3dot5 = 'gpt-3.5-turbo-0125'

const oai = new OpenAI({
  apiKey: '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',
});

const client = Instructor({
  client: oai,
  mode: 'FUNCTIONS',
});

const prompt1 = "Hey there, I'm curious to learn more about the wines of italy. Can you teach me the different types?"
const prompt2 = "What are top 5 largest US companies by revenue?"

const extractionStream = await client.chat.completions.create({
  messages: [{ role: 'user', content: prompt1 }],
  model: GPT4,
  response_model: {
    schema: UISelection,
    name: 'value extraction',
  },
  stream: true,
  seed: 1,
  max_retries: 3,
});

let mostRecentResult: any;
for await (const result of extractionStream) {
  try {
    console.clear();
    // Convert the object to a string with indentation for readability
    console.log(result);
    mostRecentResult = result;
  } catch (e) {
    console.log(e);
    break;
  }
}

console.clear();
console.log("Most recent result")
console.log(JSON.stringify(mostRecentResult, null, 2));
