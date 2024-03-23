// import { auth } from '@/auth';
import { Chat } from '@/components/chat';
import { AI } from '@/lib/chat/actions';
// import { nanoid } from '@/lib/utils';
// import { getMissingKeys } from './actions';

export const metadata = {
  title: 'Next.js AI Chatbot',
};

export default async function IndexPage() {
  // const id = nanoid();
  // const session = (await auth()) as Session;
  // const missingKeys = await getMissingKeys();

  return (
    <AI initialAIState={{ chatId: '1', messages: [] }}>
      <Chat id={'1'} />
    </AI>
  );
}
