'use client';

import { Button } from '@/components/ui/button';
import { IconArrowElbow } from '@/components/ui/icons';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  CarouselSchema,
  CompactSchema,
  FocusSchema,
  MediumBlockSchemaType,
  StateSchema,
} from '@/lib/schemas';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { z } from 'zod';

import CarouselBlock, { CardData } from '@/components/carousel-content';
import SmallBlock from '@/components/small-block';
import { makeUISelection } from '@/lib/ai';
import { UISelectionType } from '@/lib/ai_schemas';
import {
  ActiveGeneratorsType,
  MessageRoleType,
  MultiComponentTypes,
  OpenAIMessageRoleType,
  SmallBlockSchemaType,
} from '@/lib/schemas';
import { updateState } from '@/lib/stream_handler';
import { fetchTopImageUrl } from '@/lib/utils/query_image';

export default function IndexPage() {
  const [state, setState] = useState<z.infer<typeof StateSchema>>({
    messages: [
      {
        content: { blocks: [{ text: 'initial' }] },
        role: MessageRoleType.human,
        type: MultiComponentTypes.text,
      },
    ],
    openAIMessages: [
      {
        role: OpenAIMessageRoleType.user,
        content: 'initial',
      },
    ],
    activeGenerators: {
      generators: [],
      currentComponentType: MultiComponentTypes.compact,
    },
  } as z.infer<typeof StateSchema>);
  const [input, setInput] = useState('');
  const [isLoading, setLoading] = useState(false);

  const typedMessages = state as StateSchema;

  const formRef = useRef<HTMLFormElement>(null);

  const disabled = isLoading ? true : false;
  const router = useRouter();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      formRef.current?.requestSubmit();
      event.preventDefault();
    }
  };

  const updateMessagesFromUser = (newState: any, userInput: string) => {
    console.log(
      'newState Before updateMessagesFromUser',
      JSON.stringify(newState, null, 2)
    );
    newState.messages.push({
      role: MessageRoleType.human,
      content: { blocks: [{ text: input }] },
      type: MultiComponentTypes.text,
    });
    newState.openAIMessages.push({
      role: OpenAIMessageRoleType.user,
      content: input,
    });
    console.log(
      'newState After updateMessagesFromUser (outside of function)',
      JSON.stringify(newState, null, 2)
    );
    setState(newState);
    return newState;
  };

  const updateStateFromResponse = async (
    newState: any,
    uiSelection: UISelectionType
  ) => {
    console.log(
      'newState Before updateStateFromCompact',
      JSON.stringify(newState, null, 2)
    );

    let tempBlocks: SmallBlockSchemaType[] | MediumBlockSchemaType[] = [];
    if (uiSelection.element === MultiComponentTypes.compact) {
      tempBlocks = uiSelection.content.blocks.map((block) => ({
        imgUrl: undefined, // Temporarily set imgUrl to undefined for SmallBlockSchema
        title: block.title,
        subtitle: block.subtitle,
        data: block.data,
      }));
    } else {
      tempBlocks = uiSelection.content.blocks.map((block) => ({
        imgUrl: undefined, // Temporarily set imgUrl to undefined for MediumBlockSchema
        title: block.title,
        text: block.text,
      }));
    }

    let tempContent:
      | z.infer<typeof CompactSchema>
      | z.infer<typeof CarouselSchema>
      | z.infer<typeof FocusSchema>;
    switch (uiSelection.element) {
      case MultiComponentTypes.compact:
        tempContent = CompactSchema.parse({ blocks: tempBlocks });
        break;
      case MultiComponentTypes.carousel:
        tempContent = CarouselSchema.parse({
          blocks: tempBlocks,
          scrollPosition: 0,
        });
        break;
      case MultiComponentTypes.focus:
        tempContent = FocusSchema.parse({ blocks: tempBlocks, activeBlock: 0 });
        break;
      default:
        throw new Error(`Unsupported UI element type: ${uiSelection.element}`);
    }
    // Temporarily update the state to show the UI without images
    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        {
          role: MessageRoleType.ai,
          content: tempContent,
          type: uiSelection.element,
        },
      ],
    }));

    // Step 2: Load Images (and convert AI Schema into UI Schema)
    let updatedBlocks: SmallBlockSchemaType[] | MediumBlockSchemaType[] = [];
    let updatedContent:
      | z.infer<typeof CompactSchema>
      | z.infer<typeof CarouselSchema>
      | z.infer<typeof FocusSchema>;

    if (uiSelection.element === MultiComponentTypes.compact) {
      updatedBlocks = await Promise.all(
        uiSelection.content.blocks.map(
          async (block): Promise<SmallBlockSchemaType> => {
            const imgUrl = await fetchTopImageUrl(block.imageSearchQuery);
            return {
              imgUrl: imgUrl, // Fetch and set the actual image URL
              title: block.title,
              subtitle: block.subtitle,
              data: block.data,
            };
          }
        )
      );
      updatedContent = CompactSchema.parse({ blocks: updatedBlocks });
    } else if (
      uiSelection.element === MultiComponentTypes.carousel ||
      uiSelection.element === MultiComponentTypes.focus
    ) {
      updatedBlocks = await Promise.all(
        uiSelection.content.blocks.map(async (block): Promise<MediumBlockSchemaType> => {
          const imgUrl = await fetchTopImageUrl(block.imageSearchQuery);
          return {
            imgUrl: imgUrl, // Fetch and set the actual image URL
            title: block.title,
            text: block.text, 
          };
        })
      );
      updatedContent =
        uiSelection.element === MultiComponentTypes.carousel
          ? CarouselSchema.parse({ blocks: updatedBlocks, scrollPosition: 0 })
          : FocusSchema.parse({ blocks: updatedBlocks, activeBlock: 0 });
    } else {
      throw new Error(`Unsupported UI element type: ${uiSelection.element}`);
    }

    // Now update the newState with the final content including images
    // This should replace the temporary message added earlier
    newState.messages[newState.messages.length - 1] = {
      role: MessageRoleType.ai,
      content: updatedContent,
      type: uiSelection.element,
    };

    newState.openAIMessages.push({
      role: OpenAIMessageRoleType.function,
      name: 'UISelection',
      content: JSON.stringify(uiSelection),
    });

    console.log(
      'newState After updateStateFromCompact',
      JSON.stringify(newState, null, 2)
    );

    // Finally, update the state with the new content including images
    setState(newState);
    return newState;
  };

  // Ref to track the latest state
  const currentStateRef = useRef(state);
  // Update the ref every time the state changes
  useEffect(() => {
    currentStateRef.current = state;
  }, [state]);

  const startGeneratorTimer = (activeGenerators: ActiveGeneratorsType) => {
    console.log('Starting Generators: ', activeGenerators);
    const intervalId = setInterval(async () => {
      console.log('Interval Running');
      // Use the current state from the ref
      const currentState = currentStateRef.current;
      console.log('Current State: ', currentState);
      try {
        // if (currentState.activeGenerators.generators.length === 0) {
        //   clearInterval(intervalId);
        //   console.log("No generators left, stopping interval.");
        //   return;
        // }
        console.log('Updating State with currentState:', currentState);
        const updatedState = await updateState(
          {
            ...currentState.activeGenerators,
            generators: currentState.activeGenerators.generators,
          },
          currentState
        );
        // Update the state with the result
        setState(updatedState);
      } catch (error) {
        console.error('Error updating state within interval:', error);
        clearInterval(intervalId); // Consider clearing interval on error to prevent endless error loop
      }
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setInput('');

    setLoading(true); // Indicate loading state

    try {
      // Step 1: Copy the State
      let newState = JSON.parse(JSON.stringify(state)); // Simple deep copy, consider more robust methods for complex states

      // Update messages from user input
      newState = updateMessagesFromUser(newState, input);

      console.log('Making UI Selection');
      // Make UI selection based on the open AI messages
      const uiSelection = await makeUISelection(newState.openAIMessages);
      console.log('UI Selection:', JSON.stringify(uiSelection, null, 2));

      if (true) {
        // If the UI selection is of type 'compact', update the state accordingly
        newState = await updateStateFromResponse(newState, uiSelection);
      } else {
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    } finally {
      setLoading(false); // Reset loading state
      setInput(''); // Clear the input field
    }
  };

  return (
    <main className='flex  flex-col w-full items-center justify-between space-y-4 pb-40 pt-10'>
      {state?.messages.map((message, index) => {
        if (
          message.role === MessageRoleType.human &&
          message.content.blocks[0].text != 'initial'
        ) {
          return (
            <div
              key={index}
              className={clsx(
                'flex p-4 shrink-0 w-[70%] max-w-[70%] space-x-4 select-none items-center justify-center rounded-md border shadow '
              )}
            >
              <span className='ring-1 ring-accent rounded-md p-2 items-center text-center'>
                user
              </span>
              <div className='flex w-full max-w-screen-md items-start space-x-4'>
                <div>{message.content.blocks[0].text as string}</div>
              </div>
            </div>
          );
        } else if (message.role === MessageRoleType.ai) {
          if (message.type === MultiComponentTypes.compact) {
            const compactContent = message.content as z.infer<
              typeof CompactSchema
            >;
            return (
              <div
                key={index}
                className={clsx(
                  'flex w-[70%] max-w-[70%] flex-col items-center justify-center border-b space-y-4 px-5 border-accent py-6 '
                )}
              >
                {compactContent.blocks.map((block, blockIndex) => (
                  <SmallBlock
                    metric={block.data as string}
                    imgUrl={block.imgUrl as string}
                    title={block.title}
                    subtitle={block.subtitle as string}
                    key={blockIndex}
                  />
                ))}
              </div>
            );
          } else if (message.type === MultiComponentTypes.carousel) {
            const carouselContent = message.content as z.infer<
              typeof CarouselSchema
            >;
            return (
              <>
                <div
                  key={index}
                  className={clsx(
                    'flex w-[70%]  max-w-[70%] items-center justify-center py-6 '
                  )}
                >
                  <CarouselBlock cards={carouselContent.blocks as CardData[]} />
                </div>
                <Separator className='w-[70%]' />
              </>
            );
          } else if (message.type === MultiComponentTypes.focus) {
            const focusContent = message.content as z.infer<typeof FocusSchema>;
            const activeBlock = focusContent.blocks[focusContent.activeBlock];
            return (
              <div
                key={index}
                className={clsx(
                  'flex w-[70%] max-w-[70%] items-center justify-center border-b border-gray-200 py-6 '
                )}
              >
                <div className='flex w-full max-w-screen-md items-start space-x-4'>
                  {activeBlock.imgUrl && (
                    <Image
                      src={activeBlock.imgUrl}
                      alt={activeBlock.title}
                      width={100}
                      height={100}
                    />
                  )}
                  <div className='space-y-2'>
                    <h3 className='text-lg font-semibold'>
                      {activeBlock.title}
                    </h3>
                    {activeBlock.text && <p>{activeBlock.text}</p>}
                  </div>
                </div>
              </div>
            );
          }
        }
        return null;
      })}

      <div className='fixed bottom-0 flex w-[80%] items-center flex-col p-5 pb-3 sm:px-0'>
        <form
          className='w-full flex flex-row items-center '
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className='flex-1 space-y-4 border-t bg-black  px-4  shadow-lg sm:rounded-t-xl sm:border md:py-4'>
            <div className='flex items-center space-x-2'>
              <Textarea
                ref={inputRef}
                tabIndex={0}
                onKeyDown={onKeyDown}
                placeholder='Send a message.'
                className='min-h-[60px] flex-1 resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm'
                autoFocus
                spellCheck={false}
                autoComplete='off'
                autoCorrect='off'
                name='message'
                rows={1}
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className='min-h-[60px] border-input px-4 min-w-16 '
                    type='submit'
                    size='icon'
                    variant={'outline'}
                    disabled={input === ''}
                  >
                    <IconArrowElbow />
                    <span className='sr-only'>Send message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </form>
        {/* <SparklesCore
          background='transparent !opacity-50'
          minSize={0.4}
          maxSize={0.5}
          particleDensity={600}
          className='w-full h-full'
          particleColor='#FFFFFF'
        /> */}
      </div>
    </main>
  );
}
