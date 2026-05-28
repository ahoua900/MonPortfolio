import { lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { HeroSection } from './components/Hero/HeroSection';
import { AboutSection } from './components/About/AboutSection';
import { TechnologiesSection } from './components/Technologies/TechnologiesSection';
import { SkillsSection } from './components/Skills/SkillsSection';
import { ProjectsSection } from './components/Projects/ProjectsSection';
import { ContactSection } from './components/Contact/ContactSection';
import { FilmEffect } from './components/Effects/FilmEffect';
import { DailyProjectSection } from './components/Hero/DailyProjectSection';

const ChatbotWidget = lazy(() =>
  import('./components/Chatbot/ChatbotWidget').then(m => ({ default: m.ChatbotWidget }))
);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-black text-white">
          <FilmEffect />
          <Navbar />
          <main>
            <HeroSection />
            <DailyProjectSection />
            <AboutSection />
            <TechnologiesSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
          <Suspense fallback={null}>
            <ChatbotWidget />
          </Suspense>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
