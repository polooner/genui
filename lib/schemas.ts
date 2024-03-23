import { z } from "zod";


// Component Blocks
enum BlockTypes {
  small = "small",
  medium = "medium"
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
})

// MultiComponents
enum MultiComponentTypes {
  compact = "compact",
  carousal = "carousal",
  focus = "focus",
}

const CompactSchema = z.object({
  blocks: z.array(SmallBlockSchema)
})

const CarousalSchema = z.object({
  blocks: z.array(MediumBlockSchema),
  scrollPosition: z.number().int()
})

const FocusSchema = z.object({
  blocks: z.array(MediumBlockSchema),
  activeBlock: z.number().int()
})

// State
const Message = z.object({
  role: z.enum(['human', 'AI']),
  content: z.union([
    z.string(), CompactSchema, CarousalSchema, FocusSchema
  ]),
  type: z.nativeEnum(MultiComponentTypes)
})

const Messages = z.object({
  messages: z.array(Message)
  })

const StateSchema = z.object({
  messages: Messages,
})

type Message = z.infer<typeof Message>;
type Messages = z.infer<typeof Messages>;
type StateSchema = z.infer<typeof StateSchema>;

export { Message, Messages, StateSchema }