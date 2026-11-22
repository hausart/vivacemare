import { Hero } from '@/components/hero';
import { SiteHeader } from '@/components/site-header';
import { SolutionsSection } from '@/components/solutions-section';
import { VivacemareSection } from '@/components/vivacemare-section';
import { RecognitionSection } from '@/components/recognition-section';
import { VisionSection } from '@/components/vision-section';
import { FoundersSection } from '@/components/founders-section';
import { TeamSection } from '@/components/team-section';
import { TimeValueSection } from '@/components/time-value-section';
import { MediaHighlightSection } from '@/components/media-highlight-section';
import { ConversationSection } from '@/components/conversation-section';
import { SiteFooter } from '@/components/site-footer';

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <VivacemareSection />
      <SolutionsSection />
      <RecognitionSection />
      <VisionSection />
      <FoundersSection />
      <TeamSection />
      <TimeValueSection />
      <MediaHighlightSection />
      <ConversationSection />
      <SiteFooter />
    </main>
  );
}
