import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Features from "../components/home/Features";
import Pricing from "../components/home/Pricing";
import FAQ from "../components/home/FAQ";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-background-50 flex flex-col">
      <Navbar />
      <div>
        <Hero />
      </div>
      <main className="flex-grow">
        <Features />
        <About />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
