import Container from '@/components/Container';
import Loading from './loading';
import { Suspense } from 'react';
import Slider from '@/components/Slider';


export default async function Home() {
  return (
    <>
    <div className='py-6 px-4 sm:px-6 sm:py-8 sm:w-full md:w-full md:py-14 md:px-8 max-w-screen-xl mx-auto'>
     <h1 className='w-full font-extrabold tracking-tighter text-3xl'>Welcome to Nice Gadgets store!</h1>
    </div>
      <Slider />
      <Container>
        <Suspense fallback={<Loading />}></Suspense>
      </Container>
    </>
  );
}
