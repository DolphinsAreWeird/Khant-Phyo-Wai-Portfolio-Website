import { About } from "@/components/About";
import { CurrentlyRunning } from "@/components/CurrentlyRunning";
import { Approach } from "@/components/Approach";
import { Changelog } from "@/components/Changelog";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { KnownIssues } from "@/components/KnownIssues";
import { MoreWork } from "@/components/MoreWork";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <CurrentlyRunning />
        <About />
        <Work />
        <Approach />
        <MoreWork />
        <Changelog />
        <KnownIssues />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
