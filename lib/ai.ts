import Instructor from '@instructor-ai/instructor';
import OpenAI from 'openai';
import { MediumBlockQuery, UISelection } from './ai_schemas';
import { OpenAIMessageRoleType, OpenAIMessages } from './schemas';
import { fetchTopImageUrl } from './utils/query_image';

const GPT4 = 'gpt-4-0125-preview';
const GPT3dot5 = 'gpt-3.5-turbo-0125';

const oai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

const client = Instructor({
  client: oai,
  mode: 'FUNCTIONS',
});

async function createObjectGenerator(messages: OpenAIMessages): Promise<any> {
  return await client.chat.completions.create({
    messages: messages,
    model: GPT3dot5,
    response_model: {
      schema: MediumBlockQuery,
      name: 'value extraction',
    },
    stream: true,
    seed: 1,
    max_retries: 3,
  });
}

export async function makeUISelection(messages: OpenAIMessages): Promise<any> {
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

function createBlockInstructionMessages(
  messages: OpenAIMessages,
  block: MediumBlockQuery
): OpenAIMessages {
  const newMessages = [...messages];
  const instructionMessage = {
    role: OpenAIMessageRoleType.user,
    content: `You will be populating the information in a block of content. 
Here is the description for the block you will be populating:\n 
${block.shortDescription}`,
  };
  newMessages.push(instructionMessage);
  return newMessages;
}

export async function createGenerators(
  uiSelection: UISelection,
  messages: OpenAIMessages
) {
  const activeGenerators: ActiveGenerators = [];
  activeGenerators.currentComponentType = uiSelection.element;
  uiSelection.content.blocks.forEach(async (block, index) => {
    const blockInstructionMessages = createBlockInstructionMessages(
      messages,
      block
    );
    const generator = await createObjectGenerator(blockInstructionMessages);
    const imgURL = await fetchTopImageUrl(block);
    activeGenerators.push({ generator, blockIdx: index, imgURL });
  });
  return activeGenerators;
}

const prompt2 = 'What are top 5 largest US companies by revenue?';

const messages = [{ role: 'user', content: prompt2 }];
// const generators = await createGenerators(messages);
// console.log(generators);
// generators.forEach(generator => {
//   console.log(generator.imgURL);
// });
