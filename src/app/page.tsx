import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import Carousel from "@/components/Carousel/Carousel";


export default function Home() {
  return (
    <div className="flex-col flex justify-between items-center h-screen">
      <NavBar />
      <Carousel />
      <Footer />
    </div>
  );
}
