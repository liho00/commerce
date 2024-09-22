// import { SignOut } from 'components/layout/navbar/account';
import { signOut } from 'auth/index';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';

export async function SignOut() {
  const t = await getTranslations();

  return (
    <form
      action={async () => {
        'use server'
        await signOut({
          redirectTo: '/'
        });
      }}
    >
        <Button variant="outline">{t('page.UUMtiFpi_xKDsWeQbuuCv')}</Button>
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
