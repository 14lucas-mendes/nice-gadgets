import Slider from '@/components/Slider';
import Container from '@/components/Container';
import Loading from './loading';
import { Suspense } from 'react';
import { HeadingCard } from '@/components/HeadingCard';

export default async function Home() {
  return (
    <>
      <div className="sm:max-w-2xl sm:mx-auto md:max-w-5xl md:mx-auto">
        <HeadingCard as="h1">Welcome to Nice Gadgets store!</HeadingCard>
        <Slider />
      </div>
      <Container>
        <Suspense fallback={<Loading />}></Suspense>
      </Container>
    </>
  );
}

//<CardNewModels />
//<ShopyCategory />
//<CardHotPrice />
