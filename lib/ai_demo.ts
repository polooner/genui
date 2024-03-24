import Instructor from '@instructor-ai/instructor';
import OpenAI from 'openai';
import { makeUISelection, createGenerators } from './ai';
import { OpenAIMessages, OpenAIMessageRoleType } from './schemas';
import { UISelection } from './ai_schemas';

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

const response2 = {
  "chainOfThought": "To answer the user's question on the top 5 largest US companies by revenue, a Compact element is the best choice. This element allows for a concise and straightforward presentation of each company, including its name, a relevant image, and the respective revenue. This format is perfectly suited for displaying ranked lists, such as the largest companies by revenue.",
  "element": "compact",
  "content": {
    "blocks": [
      {
        "imageSearchQuery": "Walmart logo",
        "title": "Walmart",
        "subtitle": "Retail",
        "data": "$572.8 billion"
      },
      {
        "imageSearchQuery": "Amazon.com logo",
        "title": "Amazon.com",
        "subtitle": "E-commerce & Cloud Computing",
        "data": "$469.8 billion"
      },
      {
        "imageSearchQuery": "ExxonMobil logo",
        "title": "ExxonMobil",
        "subtitle": "Oil & Gas",
        "data": "$285.6 billion"
      },
      {
        "imageSearchQuery": "Apple Inc. logo",
        "title": "Apple",
        "subtitle": "Consumer Electronics & Software",
        "data": "$274.5 billion"
      },
      {
        "imageSearchQuery": "CVS Health logo",
        "title": "CVS Health",
        "subtitle": "Healthcare",
        "data": "$268.7 billion"
      }
    ]
  }
}
const response2String: string = JSON.stringify(response2);


const messages = [
  {role: OpenAIMessageRoleType.user, content: prompt2 },
  {role: OpenAIMessageRoleType.function, content: response2String, name: 'UISelection' },
  {role: OpenAIMessageRoleType.user, content: prompt1}
]

const uiSelection = await makeUISelection(messages);
console.log(JSON.stringify(uiSelection, null, 2))

// {role: OpenAIMessageRoleType.tool, content: []}
// console.clear();
// console.log("Most recent result")
// console.log(JSON.stringify(mostRecentResult, null, 2));
