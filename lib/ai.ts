import Instructor from '@instructor-ai/instructor';
import OpenAI from 'openai';
import { SchemaType, SmallBlock, MediumBlock, UISelection } from './ai_schemas';
import { Messages } from './schemas';

const GPT4 = 'gpt-4-0125-preview'
const GPT3dot5 = 'gpt-3.5-turbo-0125'

const oai = new OpenAI({
  apiKey: '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',
});

const client = Instructor({
  client: oai,
  mode: 'FUNCTIONS',
});

async function createObjectGenerator(messages: Messages): Promise<any> {
  return await client.chat.completions.create({
    messages: messages,
    model: GPT4,
    response_model: {
      schema: UISelection,
      name: 'value extraction',
    },
    stream: true,
    seed: 1,
    max_retries: 3,
  });
}

async function makeUISelection(messages: Messages): Promise<any> {
  return await client.chat.completions.create({
    messages: messages,
    model: GPT4,
    response_model: {
      schema: UISelection,
      name: 'value extraction',
    },
    seed: 1,
    max_retries: 3,
  });
}

async function createSchemaAndGenerators(messages: Messages) {
  const uiSelection = await makeUISelection(messages);
  const generators: Promise<any>[] = [];
  if ('blocks' in uiSelection.element) {
    for (const block of uiSelection.element.blocks) {
      const generator = createObjectGenerator(messages);
      generators.push(generator);
    }
  }
return { uiElement: uiSelection.element, generators };

}

function sendMessage() {
  schema, blockGenerators = createSchemaAndGenerators();
}


const prompt1 = "Hey there, I'm curious to learn more about the wines of italy. Can you teach me the different types?"
const prompt2 = "What are top 5 largest US companies by revenue?"

