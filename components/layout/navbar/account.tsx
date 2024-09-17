import { auth } from 'auth';
import { signIn, signOut } from 'auth/index';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export async function Account() {
  const session = await auth();

  if (session) {
    return (
      <>
        <Link href="/account">
          <Button variant="outline" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-5 transition-all ease-in-out hover:scale-110"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Button>
        </Link>
      </>
    );
  }

  return (
    <form
      action={async () => {
        'use server';
        await signIn('shopify', { redirectTo: '/account' });
      }}
    >
      <Button type="submit">Sign in</Button>
    </form>
  );
}
