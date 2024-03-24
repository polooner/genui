import { z } from 'zod';

// Component Blocks
enum BlockTypes {
  small = 'small',
  medium = 'medium',
}

export const SmallBlockSchema = z.object({
  imgUrl: z.string().url().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  data: z.string().optional(),
});
export type SmallBlockSchemaType = z.infer<typeof SmallBlockSchema>;

export const MediumBlockSchema = z.object({
  imgUrl: z.string().url().optional(),
  title: z.string(),
  text: z.string().optional(),
});
export type MediumBlockSchemaType = z.infer<typeof MediumBlockSchema>;

export const TextBlockSchema = z.object({
  text: z.string(),
});

// MultiComponents
enum MultiComponentTypes {
  compact = 'compact',
  carousel = 'carousel',
  focus = 'focus',
  text = 'text',
}

export const CompactSchema = z.object({
  blocks: z.array(SmallBlockSchema),
});

export const CarouselSchema = z.object({
  blocks: z.array(MediumBlockSchema),
  scrollPosition: z.number().int(),
});

export const FocusSchema = z.object({
  blocks: z.array(MediumBlockSchema),
  activeBlock: z.number().int(),
});

export const SingleTextBlockSchema = z.object({
  blocks: z.array(TextBlockSchema).max(1),
});

// Generator
export const GeneratorJobSchema = z.object({
  generator: z.any(),
  blockIdx: z.number().int(),
  imgURL: z.string().url().optional(),
});
export type GeneratorJobType = z.infer<typeof GeneratorJobSchema>;

export const ActiveGenerators = z.object({
  generators: z.array(GeneratorJobSchema),
  currentComponentType: z.nativeEnum(MultiComponentTypes),
});
export type ActiveGeneratorsType = z.infer<typeof ActiveGenerators>;

// OpenAI Messages (for AI use only)
enum OpenAIMessageRoleType {
  user = 'user',
  assistant = 'assistant',
  system = 'system',
  function = 'function',
}

const OpenAIMessage = z.object({
  role: z.nativeEnum(OpenAIMessageRoleType),
  content: z.string(),
  name: z.string().optional(),
});
type OpenAIMessagesType = z.infer<typeof OpenAIMessage>[];

// State Messages (for frontend use)
enum MessageRoleType {
  human = 'human',
  ai = 'AI',
}

const Message = z.object({
  role: z.nativeEnum(MessageRoleType),
  content: z.union([
    SingleTextBlockSchema,
    CompactSchema,
    CarouselSchema,
    FocusSchema,
  ]),
  type: z.nativeEnum(MultiComponentTypes).optional(),
});
type MessageType = z.infer<typeof Message>;
type MessagesType = z.infer<typeof Message>[];

// State
const StateSchema = z.object({
  messages: z.array(Message),
  openAIMessages: z.array(OpenAIMessage),
  activeGenerators: ActiveGenerators,
});
type StateSchemaType = z.infer<typeof StateSchema>;


export {
  ActiveGeneratorsType,
  MessageType,
  MessageRoleType,
  MessagesType,
  MultiComponentTypes,
  OpenAIMessageRoleType,
  OpenAIMessagesType,
  StateSchemaType,
};
