import { z } from 'zod';

// Component Blocks
enum BlockTypes {
  small = 'small',
  medium = 'medium',
}

export const SmallBlockSchema = z.object({
  imgUrl: z.string().url(),
  title: z.string(),
  subtitle: z.string().optional(),
  data: z.string().optional(),
});

export const MediumBlockSchema = z.object({
  imgUrl: z.string().url(),
  title: z.string(),
  data: z.string().optional(),
});

export const TextBlockSchema = z.object({
  text: z.string()
});

// MultiComponents
enum MultiComponentTypes {
  compact = 'compact',
  carousal = 'carousal',
  focus = 'focus',
  text = 'text'
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
  blocks: z.array(TextBlockSchema).max(1)
})

// Generator 
export const GeneratorSchema = z.object({
  generator: z.any(),
  blockIdx: z.number().int(),
  imgURL: z.string().url().optional()
})

export const ActiveGenerators = z.object({
  generators: z.array(GeneratorSchema),
  currentComponentType: z.nativeEnum(MultiComponentTypes)
})

// OpenAI Messages (for AI use only)
enum OpenAIMessageRoleType {
  user = 'user',
  assistant = 'assistant',
  system = 'system',
  tool = 'tool'
}

const OpenAIMessage = z.object({
  role: z.nativeEnum(OpenAIMessageRoleType),
  content: z.string(),
  tool_call_id: z.string().optional(),
});

// State Messages (for frontend use)
enum MessageRoleType {
  human = 'human',
  ai = 'AI'
}

const Message = z.object({
  role: z.nativeEnum(MessageRoleType),
  content: z.union([SingleTextBlockSchema, CompactSchema, CarouselSchema, FocusSchema]),
  type: z.nativeEnum(MultiComponentTypes).optional(),
});

// State
const StateSchema = z.object({
  messages: z.array(Message),
  openAIMessages: z.array(OpenAIMessage),
  activeGenerators: ActiveGenerators
});

type Message = z.infer<typeof Message>;
type Messages = z.infer<typeof Message>[];
type OpenAIMessages = z.infer<typeof OpenAIMessage>[];
type StateSchema = z.infer<typeof StateSchema>;

export {
  MessageRoleType,
  Message,
  Messages,
  MultiComponentTypes,
  OpenAIMessageRoleType,
  OpenAIMessages,
  StateSchema,
};
