// import { SignOut } from 'components/layout/navbar/account';
import { Button } from '@headlessui/react';
import { signOut } from 'auth/index';

export async function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut({
          redirectTo: '/'
        });
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
}

export function AccountProfile() {
  return (
    <>
      <SignOut />
    </>
  );
}
