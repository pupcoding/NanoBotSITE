import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { NanoInAction } from '../components/NanoInAction';
import { Features } from '../components/Features';
import { AddBotSection } from '../components/AddBotSection';
import { CommunitySection } from '../components/CommunitySection';
import { StatusSection } from '../components/StatusSection';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';
import { InviteModal } from '../components/InviteModal';

export const LandingPage: React.FC = () => {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar onOpenInviteModal={() => setInviteModalOpen(true)} />

      <main className="flex-grow">
        <Hero onOpenInviteModal={() => setInviteModalOpen(true)} />
        <Stats />
        <NanoInAction />
        <Features />
        <AddBotSection onOpenInviteModal={() => setInviteModalOpen(true)} />
        <CommunitySection />
        <StatusSection />
        <FaqSection />
      </main>

      <Footer onOpenInviteModal={() => setInviteModalOpen(true)} />

      <InviteModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
    </div>
  );
};
