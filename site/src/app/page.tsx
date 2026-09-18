import { ApplicationForm } from "@/components/ApplicationForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { VacancyList } from "@/components/VacancyList";

export default function VacanciesPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <VacancyList />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  );
}
