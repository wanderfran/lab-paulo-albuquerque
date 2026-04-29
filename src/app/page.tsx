import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Convenios from "@/components/Convenios";
import Units from "@/components/Units";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Stats />
        <Process />
        <Convenios />
        <Units />
        <LeadForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
