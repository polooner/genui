'use client';

import Image from 'next/image';

interface SmallBlockProps {
  imgUrl: string;
  title: string;
  subtitle: string;
  metric: string;
}

export default function SmallBlock({
  imgUrl,
  title,
  subtitle,
  metric,
}: SmallBlockProps) {
  console.log(imgUrl);
  return (
    <div className='flex justify-around items-center p-4 border-2 border-white-500 rounded-lg w-full h-auto'>
      {imgUrl ? (
        <Image
          className='h-20 w-20 shrink-0 overflow-hidden rounded-full'
          src={imgUrl}
          alt=''
          width={80}
          height={80}
        />
      ) : (
        <Image
          className='h-20 w-20 shrink-0 overflow-hidden rounded-full'
          src={'/'}
          alt=''
          width={80}
          height={80}
        />
      )}
      <div className='flex flex-col mx-6'>
        <span className='text-base font-medium mb-1 text-center'>{title}</span>
        <span className='text-sm text-gray-500 text-center'>{subtitle}</span>
      </div>
      <span className='text-xl font-semibold'>{metric}</span>
    </div>
  );
}
