import { ImageResponse } from 'next/og';
import LogoIcon from './icons/logo';

export type Props = {
  title?: string;
};

export default async function OpengraphImage(props?: Props): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME
    },
    ...props
  };

  return new ImageResponse(
    (
        <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
          <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[260px] w-[260px] rounded-3xl p-5">
            <img src={`https://epray.com.my/img/E-Pray_Logo.png`} />
          </div>
        </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: await fetch(new URL('../fonts/Inter-Bold.ttf', import.meta.url)).then((res) =>
            res.arrayBuffer()
          ),
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}
