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

// State
const Message = z.object({
  role: z.enum(['human', 'AI']),
  content: z.union([z.string(), CompactSchema, CarouselSchema, FocusSchema]),
  type: z.nativeEnum(MultiComponentTypes),
});

const Messages = z.object({
  messages: z.array(Message),
});

const StateSchema = z.object({
  messages: Messages,
});

export type Message = z.infer<typeof Message>;
export type Messages = z.infer<typeof Messages>;
export type StateSchema = z.infer<typeof StateSchema>;

export { Message, Messages, StateSchema };
