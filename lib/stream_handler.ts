import {
  ActiveGeneratorsType,
  MediumBlockSchema,
  MultiComponentTypes,
  SmallBlockSchema,
  StateSchema,
} from './schemas';

function isGeneratorEmpty(content: { text: string }): boolean {
  return content.text.length > 20;
}

export async function updateState(
  activeGenerators: ActiveGeneratorsType,
  currentState: StateSchema
): any {
  let updatedState = { ...currentState };
  try {
    // Process an iteration of the generators
    let removeGeneratorIds: number[] = [];
    for (const generatorJob of activeGenerators.generators) {
      const generator = generatorJob.generator
      const imgUrl: string | undefined = generator.imgURL;

      let content = await generator.next();

      if (isGeneratorEmpty(content)) {
        removeGeneratorIds.push(generator.blockIdx);
      } else {
        // Still have content coming in
        if (
          activeGenerators.currentComponentType === MultiComponentTypes.compact
        ) {
          updatedState.messages[generator.blockIdx].content.blocks[
            generator.blockIdx
          ] = createSmallBlock(content, imgUrl);
        } else if (
          activeGenerators.currentComponentType ===
            MultiComponentTypes.carousal ||
          activeGenerators.currentComponentType === MultiComponentTypes.focus
        ) {
          updatedState.messages[generator.blockIdx].content.blocks[
            generator.blockIdx
          ] = createMediumBlock(content, imgUrl);
        }
      }
    }

        // Remove generators after processing all
        removeGeneratorIds.forEach((blockIdx: int) => {
            updatedState.activeGenerators.generators = updatedState.activeGenerators.generators.filter((gen: { blockIdx: int }) => gen.blockIdx !== blockIdx);
            // TODO: ADD MESSAGE TO updatedState.openAIMessages
            }
        );
    } catch (error) {
        console.error('Error processing generators:', error);
    }
    return updatedState;
    

}

function deleteGenerator(gen_idx: number, activeGenerators: ActiveGenerators): void {
    // Delete Generator from list
    activeGenerators.generators = activeGenerators.generators.filter(gen => gen.blockIdx !== gen_idx);
}

function createSmallBlock(content: Object, imgUrl: string): any {
  let block = SmallBlockSchema.parse({
    imgUrl: imgUrl,
    title: content.title,
    subtitle: content.subtitle,
    data: content.data,
  });

  return block;
}

function createMediumBlock(content: Object, imgUrl: string): any {
  let block = MediumBlockSchema.parse({
    imgUrl: imgUrl,
    title: content.title,
    text: content.text,
  });

  return block;
}
