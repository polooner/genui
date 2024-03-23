// import { auth } from '@/auth'
import { ChatHistory } from './chat-history';
import { SidebarMobile } from './sidebar-mobile';
import { SidebarToggle } from './sidebar-toggle';

async function UserOrLogin() {
  // const session = (await auth()) as Session;
  return (
    <>
      {/* {session?.user ? ( */}
      <>
        <SidebarMobile>
          <ChatHistory />
        </SidebarMobile>
        <SidebarToggle />
      </>
      {/* ) : (
        <Link href='/new' rel='nofollow'>
          <IconNextChat className='size-6 mr-2 dark:hidden' inverted />
          <IconNextChat className='hidden size-6 mr-2 dark:block' />
        </Link>
      )} */}
      {/* <div className='flex items-center'>
        <IconSeparator className='size-6 text-muted-foreground/50' />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant='link' asChild className='-ml-2'>
            <Link href='/login'>Login</Link>
          </Button>
        )}
      </div> */}
    </>
  );
}

export function Header() {
  return (
    <header className='sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl'>
      {/* <div className='flex items-center'>
        <React.Suspense fallback={<div className='flex-1 overflow-auto' />}>
          <UserOrLogin />
        </React.Suspense>
      </div> */}
      {/* <div className='flex items-center justify-end space-x-2'>
        <a
          target='_blank'
          href='https://github.com/vercel/nextjs-ai-chatbot/'
          rel='noopener noreferrer'
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className='hidden ml-2 md:flex'>GitHub</span>
        </a>
      </div> */}
    </header>
  );
}
