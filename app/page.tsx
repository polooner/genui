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
import { useChat } from 'ai/react';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import { z } from 'zod';

export default function IndexPage() {
  // const [messages, setMessages] = useState<z.infer<typeof StateSchema>>(
  //   {} as z.infer<typeof StateSchema>
  // );
  // const [input, setInput] = useState('');
  // const [isLoading, setLoading] = useState(false);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    isLoading,
  } = useChat({
    api: '/api/completion',
    initialMessages: [{ role: 'Human', content: 'lol', id: '1' }],
  });

  const typedMessages = messages as StateSchema;

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

  return (
    <main className='flex flex-col w-full items-center justify-between pb-40 pt-10'>
      {messages.map((message, index) => {
        if (message.role === 'Human') {
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
                <div>{message.content as string}</div>
              </div>
            </div>
          );
        } else if (message.role === 'AI') {
          if (message.type === 'compact') {
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
          } else if (message.type === 'carousal') {
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
                      {block.data && <p>{block.data}</p>}
                    </div>
                  ))}
                </div>
              </div>
            );
          } else if (message.type === 'focus') {
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
                  {activeBlock.data && <p>{activeBlock.data}</p>}
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
                onChange={handleInputChange}
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
