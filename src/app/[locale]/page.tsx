import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Projects from "@/components/Projects/Projects";
import Skills from "@/components/Skills/Skills";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Footer />
    </main>
  );
}
