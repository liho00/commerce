import { auth } from 'auth';
import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { AIChat } from 'components/ai-chat';
export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      {/* <AIChat /> */}
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
