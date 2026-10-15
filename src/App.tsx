import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Github } from './sections/Github';
import { Hero } from './sections/Hero';
import { Nav } from './sections/Nav';
import { Stack } from './sections/Stack';
import { Work } from './sections/Work';
import { SocialBar } from './components/SocialBar';

export function App() {
  return (
    <div className="relative min-h-screen bg-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-accent-dim focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Work />
        <About />
        <Stack />
        <Github />
      </main>

      <Contact />

      {/* Sticky bottom social bar — GitHub, Facebook, Instagram. */}
      <SocialBar />
    </div>
  );
}
