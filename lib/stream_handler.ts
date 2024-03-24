import { z } from 'zod';

import { ActiveGenerators, SmallBlockSchema, MediumBlockSchema, MultiComponentTypes, StateSchema } from './schemas';

async function updateState(activeGenerators: ActiveGenerators, currentState: StateSchema): any {
    try {
        let removeGeneratorIds = []
        // Process an iteration of the generators
        for (let gen_idx = 0; gen_idx < activeGenerators.generators.length; gen_idx++) {
            const generator = activeGenerators.generators[gen_idx];
            const imgUrl = generator.imgURL
            
            let content = await generator.generate();

            if (finishedTokens(content)) {
                deleteGenerator(gen_idx, generator);
            } else { // Still have content coming in
                if (activeGenerators.currentComponentType === MultiComponentTypes.compact) {
                    currentState.messages[gen_idx].content.blocks[gen_idx] = createSmallBlock(content, imgUrl)
                } else if (schema === MultiComponentTypes.carousal || schema === MultiComponentTypes.focus){
                    currentState.messages[gen_idx].content.blocks[gen_idx] = createMediumBlock(content, imgUrl)
                }
            }
        }
    } catch (error) {
        console.error('Error processing generators:', error);
    }
    // ADD Set State
}

function deleteGenerator(gen_idx, generatorObject): {
    // Delete Generator from list
    generatorObject.genAvailable.pop()
}

function createSmallBlock(content: Object, imgUrl: string): any {
    let block = SmallBlockSchema.parse({imgUrl: imgUrl, title: content.title, subtitile: content.subtitle, data: content.data})

    return block
}

function createMediumBlock(content: Object, imgUrl: string): any {
    let block = MediumBlockSchema.parse({imgUrl: imgUrl, title: content.title, data: content.data})

    return block
}