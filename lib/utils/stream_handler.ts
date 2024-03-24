import { z } from 'zod';

async function updateState(schema: MultiComponentTypes, generators: Object[], image_urls: string[], currentState: StateSchema): any {

    try {
        // Process an iteration of the generators
        for (let gen_idx = 0; gen_idx < generators.length; gen_idx++) {
            const generator = generators[gen_idx];
            const imgUrl = image_urls[gen_idx];
            
            let content = await generator.generate();

            if (finishedTokens(content)) {
                deleteGenerator(gen_idx);
            } else { // Still have content coming in
                if (schema === MultiComponentTypes.compact) {
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

function deleteGenerator(gen_idx): {
    // Delete Generator from list
}

function createSmallBlock(content: Object, imgUrl: string): any {
    let block = SmallBlockSchema.parse({imgUrl: imgUrl, title: content.title, subtitile: content.subtitle, data: content.data})

    return block
}

function createMediumBlock(content: Object, imgUrl: string): any {
    let block = MediumBlockSchema.parse({imgUrl: imgUrl, title: content.title, data: content.data})

    return block
}