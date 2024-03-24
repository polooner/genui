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
  StateSchema,
} from '@/lib/schemas';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { z } from 'zod';

import { createGenerators, makeUISelection } from '@/lib/ai';
import {
  ActiveGeneratorsType,
  MessageRoleType,
  MultiComponentTypes,
  OpenAIMessageRoleType,
} from '@/lib/schemas';
import { updateState } from '@/lib/stream_handler';

export default function IndexPage() {
  const [state, setState] = useState<z.infer<typeof StateSchema>>({
    messages: [
      {
        content: { blocks: [{ text: 'random thing' }] },
        role: MessageRoleType.human,
        type: MultiComponentTypes.text,
      },
    ],
    openAIMessages: [
      {
        role: OpenAIMessageRoleType.user,
        content: 'random thing',
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
    console.log('newState Before updateMessagesFromUser', JSON.stringify(newState, null, 2));
    newState.messages.push({
      role: MessageRoleType.human,
      content: { blocks: [{ text: input }] },
      type: MultiComponentTypes.text,
    });
    newState.openAIMessages.push({
      role: OpenAIMessageRoleType.user,
      content: input,
    });
    console.log('newState After updateMessagesFromUser (outside of function)', JSON.stringify(newState, null, 2));
    setState(newState);
    return newState;
  };

  const updateStateFromCompact = (newState: any, content: any) => {
    console.log('newState Before updateStateFromCompact', JSON.stringify(newState, null, 2));
    newState.openAIMessages.push({
      role: OpenAIMessageRoleType.function,
      name: 'UISelection',
      content: content,
    });
    newState.messages.push({
      role: MessageRoleType.ai,
      content: content,
      type: MultiComponentTypes.compact,
    });
    console.log('newState After updateStateFromCompact', JSON.stringify(newState, null, 2));
    setState(newState);
    return newState;
  };

  const startGeneratorTimer = (generators: ActiveGeneratorsType) => {
    const intervalId = setInterval(() => {
      setState((prevState) => {
        if (prevState.activeGenerators.generators.length === 0) {
          clearInterval(intervalId);
          return prevState;
        }
        const updatedGenerators = {
          ...prevState.activeGenerators,
          generators: generators.generators,
        };
        const updatedState = updateState(updatedGenerators, state);
        return updatedState;
      });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Step 1: Copy the State
    let newState = JSON.parse(JSON.stringify(state)); // Simple deep copy, consider more robust methods for complex states

    try {
      newState = updateMessagesFromUser(newState, input);

      console.log("Making UI Selection")
      const uiSelection = await makeUISelection(newState.openAIMessages);
      console.log('UI Selection:', JSON.stringify(uiSelection, null, 2));

      if (uiSelection.element === MultiComponentTypes.compact) {
        newState = updateStateFromCompact(newState, uiSelection.content);
      } else {
        const generators = await createGenerators(
          uiSelection,
          newState.openAIMessages
        );
        startGeneratorTimer(generators);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col w-full items-center justify-between pb-40 pt-10'>
      {state?.messages.map((message, index) => {
        if (message.role === MessageRoleType.human) {
          return (
            <div
              key={index}
              className={clsx(
                'flex p-2 shrink-0 w-[70%] space-x-2 select-none items-center justify-center rounded-md border shadow bg-background'
              )}
            >
              <span className='ring-1 ring-accent rounded-md p-2 items-center text-center'>
                user
              </span>
              <div className='flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0'>
                {/* @ts-expect-error  */}
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
                  'flex w-full items-center justify-center border-b border-gray-200 py-8',
                  'bg-gray-100'
                )}
              >
                <div className='flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0'>
                  {compactContent.blocks.map((block, blockIndex) => (
                    <div key={blockIndex}>
                      <Image src={block.imgUrl} alt={block.title} />
                      <h3>{block.title}</h3>
                      {block.subtitle && <p>{block.subtitle}</p>}
                      {block.data && <p>{block.data}</p>}
                    </div>
                  ))}
                </div>
              </div>
            );
          } else if (message.type === MultiComponentTypes.carousel) {
            const carouselContent = message.content as z.infer<
              typeof CarouselSchema
            >;
            return (
              <div
                key={index}
                className={clsx(
                  'flex w-full items-center justify-center border-b border-gray-200 py-8',
                  'bg-gray-100'
                )}
              >
                <div className='flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0'>
                  <div
                    className={clsx('p-1.5 text-white', 'bg-green-500')}
                  ></div>

                  {carouselContent.blocks.map((block, blockIndex) => (
                    <div key={blockIndex}>
                      <Image src={block.imgUrl} alt={block.title} />
                      <h3>{block.title}</h3>
                      {block.text && <p>{block.text}</p>}
                    </div>
                  ))}
                </div>
              </div>
            );
          } else if (message.type === MultiComponentTypes.focus) {
            const focusContent = message.content as z.infer<typeof FocusSchema>;
            const activeBlock = focusContent.blocks[focusContent.activeBlock];
            return (
              <div
                key={index}
                className={clsx(
                  'flex w-full items-center justify-center border-b border-gray-200 py-8',
                  'bg-gray-100'
                )}
              >
                <div className='flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0'>
                  <Image src={activeBlock.imgUrl} alt={activeBlock.title} />
                  <h3>{activeBlock.title}</h3>
                  {activeBlock.text && <p>{activeBlock.text}</p>}
                </div>
              </div>
            );
          }
        }
        return null;
      })}

      <div className='fixed bottom-0 flex w-[80%] items-center space-y-3 p-5 pb-3 sm:px-0'>
        <form
          className='w-full flex flex-row items-center p-10'
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className='flex-1 space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4'>
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
                  <Button type='submit' size='icon' disabled={input === ''}>
                    <IconArrowElbow />
                    <span className='sr-only'>Send message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
