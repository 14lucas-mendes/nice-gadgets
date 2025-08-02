import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";


export default function Home() {
  return (
    <div className="flex-col flex justify-between items-center h-screen">
      <NavBar />
      <Footer />
    </div>
  );
}
