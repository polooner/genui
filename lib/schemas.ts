import { z } from 'zod';

const UserSchema = z.object({
  // Description will be used in the prompt
  age: z.number().describe('The age of the user'),
  name: z.string(),
});

const MultiUserSchema = z.object({
  users: z.array(UserSchema),
});

const ListBlock = z.object({
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

const MultiListBlock = z.object({
  listBlocks: z.array(
    ListBlock
  )
}).describe(
  "Use this element when giving the user a list of information, each of which only requires a small title and subtitle, and " +
  "does not require a large amount of information. \n" +
  "Examples: \n" +
  "Q) Who are the ten most recent US presidents?\n" +
  "Q) What are the richest countries by GDP?\n" +
  "Q) What are the largest companies by employee count?"
  )

const ImageBlock = z.object({
  imageSearchQuery: z.string(),
  title: z.string().describe('Title for the block'),
  text: z.string().describe('Body text for the block'),
}).describe("A medium sized square block. The image takes up the top half and the bottom half is text.");

const MultiImageBlockRequest = z
  .object({
    blocks: z.array(
      z.object({
        shortDescription: z
          .string()
          .describe(
            'A short description (one sentence) for what the content of the block should be.'
          ),
      })
    ),
  })
  .describe(
    "Use this element teaching the user about categorial content with multiple elements which need a moderate " + 
    "to large amount of information."
  )

const UISelection = z.object({
  chainOfThought: z.string().describe("Think step by step about which UI element would be best for the user's request."),
  element: z.union([MultiListBlock, MultiImageBlockRequest])
}).describe(
  'Your task is to select is to select the appropriate UI element for answering the user question. Rather than simply ' +
  'respond with text, you will use these visually rich components to elevate the quality of your responses. Each UI element ' + 
  'has a unqiue situation where it is best suited. Choose the best UI element to answer the question. ' +
  'When you select the UI element, you will populate it with data. For some UI elements, you will populate it with all of ' +
  'content it will contain, such as the ImageBlock object. However, for other objects which contain lists of components, ' + 
  'you will instead respond with a list of short description for each component. Each component description will be ' +
  'given to another AI model in a downstream step to populate all components in parallel. Therefore, the short description ' + 
  'should contain enough information for the AI to know what content it should be writing.'
)

export { MultiUserSchema, UserSchema, ImageBlock, MultiImageBlockRequest, UISelection };
