import About from './components/About';
import BrandGradients from './components/BrandGradients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Process from './components/Process';
import Services from './components/Services';
import WhyUs from './components/WhyUs';

export default function HomePage() {
  return (
    <>
      <BrandGradients />
      <Nav />
      <main>
        <Hero />
        <About />
        <Process />
        <Services />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
