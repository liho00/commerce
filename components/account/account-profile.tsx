// import { SignOut } from 'components/layout/navbar/account';
import { signOut } from 'auth/index';
import { Button } from '@/components/ui/button';

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
        <Button variant="outline">Sign Out</Button>
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
