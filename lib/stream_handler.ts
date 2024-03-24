import {
  ActiveGeneratorsType,
  StateSchemaType,
  MultiComponentTypes,
  SmallBlockSchema,
  SmallBlockSchemaType,
  MediumBlockSchema,
  MediumBlockSchemaType,
} from './schemas';

function isGeneratorEmpty(content: any): boolean {
    return content === undefined || content.done === true;
  }

export async function updateState(
  activeGenerators: ActiveGeneratorsType,
  currentState: StateSchemaType
) {
    console.log("Updating State, activeGenerators: ", activeGenerators);
    let updatedState = { ...currentState };
    try {
        // Process an iteration of the generators
        let removeGeneratorIds: number[] = [];
        for (const generatorJob of activeGenerators.generators) {
            const generator = generatorJob.generator
            const imgUrl: string | undefined = generator.imgURL;
            
            let content = await generator.next();
            console.log("generator: ", generator)
            console.log("Content: ", content)

            if (isGeneratorEmpty(content)) {
                console.log("Generator is empty")
                removeGeneratorIds.push(generator.blockIdx);
            } else {
                // Ensure the object structure is as expected before accessing
                if (!updatedState.messages[generator.blockIdx]?.content) {
                    console.error('Message block or content is undefined', generator.blockIdx);
                    continue; // Skip this iteration if the structure is not as expected
                }
                
                console.log("Updating block: ", generator.blockIdx)
                // Still have content coming in
                if (
                activeGenerators.currentComponentType === MultiComponentTypes.compact
                ) {
                updatedState.messages[generator.blockIdx].content.blocks[
                    generator.blockIdx
                ] = createSmallBlock(content, imgUrl);
                } else if (
                activeGenerators.currentComponentType ===
                    MultiComponentTypes.carousel ||
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
        console.log("Updated State after updateState: ", updatedState)
        return updatedState;
}


function createSmallBlock(content: SmallBlockSchemaType, imgUrl: string): any {
  let block = SmallBlockSchema.parse({
    imgUrl: imgUrl,
    title: content.title,
    subtitle: content.subtitle,
    data: content.data,
  });

  return block;
}

function createMediumBlock(content: MediumBlockSchemaType, imgUrl: string): any {
  let block = MediumBlockSchema.parse({
    imgUrl: imgUrl,
    title: content.title,
    text: content.text,
  });

  return block;
}
