import { z } from 'zod';

// Component Blocks
enum BlockTypes {
  small = 'small',
  medium = 'medium',
}

const SmallBlockSchema = z.object({
  imgUrl: z.string().url(),
  title: z.string(),
  subtitle: z.string().optional(),
  data: z.string().optional(),
});

const MediumBlockSchema = z.object({
  imgUrl: z.string().url(),
  title: z.string(),
  data: z.string().optional(),
});

// MultiComponents
enum MultiComponentTypes {
  compact = 'compact',
  carousal = 'carousal',
  focus = 'focus',
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
const Message = z.object({
  role: z.enum(['human', 'AI']),
  content: z.union([z.string(), CompactSchema, CarousalSchema, FocusSchema]),
  type: z.nativeEnum(MultiComponentTypes),
});

// State
const StateSchema = z.object({
  messages: z.array(Message),
  openAIMessages: z.array(OpenAIMessage),
});

type Message = z.infer<typeof Message>;
type Messages = z.infer<typeof Message>[];
type OpenAIMessages = z.infer<typeof OpenAIMessage>[];
type StateSchema = z.infer<typeof StateSchema>;

export {
  Message,
  Messages,
  MultiComponentTypes,
  OpenAIMessageRoleType,
  OpenAIMessages,
  StateSchema,
};
