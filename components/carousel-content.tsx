'use client';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

export interface CardData {
  imgUrl: string;
  title: string;
  text: string;
}

interface Carouselblockprops {
  cards: CardData[];
}

export default function CarouselBlock({ cards }: Carouselblockprops) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className='w-full items-center justify-center max-w-md'
    >
      <CarouselContent className='-ml-1 w-full justify-center items-center'>
        {cards.map((card, index) => (
          <CarouselItem key={index} className='pl-1 md:basis-1/2 lg:basis-1/3'>
            <div className='p-1'>
              <Card>
                <CardContent className='flex justify-center flex-col aspect-square items-center'>
                  {card.imgUrl ? (
                    <Image
                      className='rounded-lg'
                      src={card.imgUrl}
                      alt='Description of the image'
                      width={300}
                      height={300}
                    />
                  ) : (
                    <Image
                      className='rounded-lg'
                      src={
                        'https://via.placeholder.com/1024x1024.png/000000/000000'
                      }
                      alt='Description of the image'
                      width={300}
                      height={300}
                    />
                  )}

                  <span className='text-xl mt-2 bg-black font-semibold'>
                    {card.title}
                  </span>
                  <span className='text-xs bg-black text-center p-4'>
                    {card.text}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
