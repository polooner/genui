import { z } from 'zod';
import { MultiComponentTypes } from './schemas';

// Block Primitives
export const SmallBlockResponse = z.object({
  imageSearchQuery: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  data: z.string().optional().describe(
    "This should be included when there is a specific numerical value that should be " +
    "should be included. Include the metric, ideally using symbols or shorthands ($, yrs, etc.)")
}).describe(
  "A compact block with an image as a small circle on the left, a bolded title in the center, an optional smaller gray subtitle " +
  "underneath the title, and a larged bolded numerical data value on the right"
  )

export const MediumBlockResponse = z.object({
  title: z.string().describe('Title for the block'),
  text: z.string().describe('Body text for the block'),
}).describe("A medium sized square block. The image takes up the top half and the bottom half is text.");


export const MediumBlockQuery = z.object({
  imageSearchQuery: z.string().describe("Google Images search query"),
  shortDescription: z.string().describe("A short description (one sentence) for what the content of the block should be.")
})
export type MediumBlockQueryType = z.infer<typeof MediumBlockQuery>;

// Block Lists
export const Compact = z.object({
  blocks: z.array(SmallBlockResponse)
})
.describe(
  "Description:\n" +
  "A Compact element provides a list of small blocks stacked vertically. " +

  "Use Case:\n" +
  "Use this element when giving the user a list of information, each of which only requires a small title and subtitle, and " +
  "does not require a large amount of information. \n" +
  
  "Examples: \n" +
  "Q) Who are the ten most recent US presidents?\n" +
  "Q) What are the richest countries by GDP?\n" +
  "Q) What are the largest companies by employee count?"
  )

export const Carousel = z.object({
  blocks: z.array(MediumBlockQuery)
})
.describe(
  "Description:\n" +
  "A carousal element displays a series of medium blocks in a linear, scrollable format, allowing users to navigate through " +
  "information that follows a sequential order or flow. Each block can represent a step, a part of a whole, or any content " +
  "that benefits from being presented in a sequence.\n" +

  "Use Case:\n" +
  "Ideal for presenting information that requires a step-by-step approach, such as cooking recipes, DIY project instructions, " +
  "or a day plan for a tour. It can also be used to outline processes, timelines, or sequences where the order of information " +
  "is crucial.\n" +
  
  "Examples:\n" +
  "Q) How to make French Toast?\n" +
  "Q) What are the steps to change a tire?\n" +
  "Q) Can you outline a 3-day tour plan for Rome?"
  )

export const Focus = z.object({
    blocks: z.array(MediumBlockQuery),
})
.describe(
  "Description:\n" +
  "A Focus element organizes medium blocks on the left side, enabling users to select a block " +
  "for an enlarged view on the right side.\n\n" +
  
  "Use Case:\n" +
  "This layout is particularly useful for presenting categorical data that " +
  "requires a moderate to large amount of information for each item, facilitating an in-depth exploration without overwhelming the user. " +
  "Also ideal for applications where users need to compare and contrast detailed information across a range of options, such as " +
  "product comparisons, detailed listings, or in-depth content previews. It allows for a focused examination while keeping " +
  "other options accessible.\n" +
  
  "Examples:\n" +
  "Q) Tell me about the different types of wines from Italy.\n" +
  "Q) Can you explain the various climate zones on Earth?\n" +
  "Q) What are the major art movements in history?"
)

// UI Selection
export const UISelection = z.object({
  chainOfThought: z.string().describe("Think step by step about which UI element would be best for the user's request."),
  element: z.nativeEnum(MultiComponentTypes),
  content: z.union([Compact, Carousel, Focus])
})
.describe(
  'Your task is to select is to select the appropriate UI element for answering the user question. Rather than simply ' +
  'respond with text, you will use these visually rich components to elevate the quality of your responses. Each UI element ' + 
  'has a unqiue situation where it is best suited. Choose the best UI element to answer the question. ' +
  'When you select the UI element, you will populate it with data. For some UI elements, such as Compact, you will populate it with all of ' +
  'content it will contain. However, for other UI elements, such as Carousel and Focus, ' + 
  'you will instead respond with a list of short descriptions and image search queries for each block. Each block short description will be ' +
  'given to another AI model in a downstream step to populate all components in parallel. Therefore, the short description ' + 
  'should contain enough information for the AI to know what content it should be writing.'
)
export type UISelectionType = z.infer<typeof UISelection>;
