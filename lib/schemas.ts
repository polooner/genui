import { z } from 'zod';

const UserSchema = z.object({
  // Description will be used in the prompt
  age: z.number().describe('The age of the user'),
  name: z.string(),
});

const MultiUserSchema = z.object({
  users: z.array(UserSchema),
});

const MultiImageBlock = z.object({});

export { MultiUserSchema, UserSchema };
