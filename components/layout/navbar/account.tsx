import { Button } from '@headlessui/react';
import { auth } from 'auth';
import { signIn, signOut } from 'auth/index';
import Link from 'next/link';

export async function Account() {
  const session = await auth();

  if (session) {
    return (
      <>
        <Link href="/account">Account</Link>
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
