import { z } from 'zod';

const UserSchema = z.object({
  // Description will be used in the prompt
  age: z.number().describe('The age of the user'),
  name: z.string(),
});

const MultiUserSchema = z.object({
  users: z.array(UserSchema),
});

const ImageBlock = z.object({
  imageSearchQuery: z.string(),
  title: z.string().describe('Title for the block'),
  text: z.string().describe('Body text for the block'),
});

const MultiImageBlockRequest = z
  .object({
    blocks: z.array(
      z.object({
        shortDescription: z
          .string()
          .describe(
            'A short description (one sentence or less) for the content/focus of the block'
          ),
      })
    ),
  })
  .describe(
    'The UI element is a list of Image blocks. ' +
      'It contains a large image, a title, and a body of text. ' +
      'Select this element when '
  );

export { MultiUserSchema, UserSchema };
