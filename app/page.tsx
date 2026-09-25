import { Contact } from "@/components/invitation/Contact";
import { DressCode } from "@/components/invitation/DressCode";
import { Hero } from "@/components/invitation/Hero";
import { InvitationFooter } from "@/components/invitation/InvitationFooter";
import { InvitationShell } from "@/components/invitation/InvitationShell";
import { OurStory } from "@/components/invitation/OurStory";
import { RsvpForm } from "@/components/invitation/RsvpForm";
import { Venue } from "@/components/invitation/Venue";

export default function Home() {
  return (
    <InvitationShell>
      <main className="mx-auto min-h-full w-full max-w-xl bg-background pb-28 shadow-[0_0_80px_rgba(63,52,44,0.08)]">
        <Hero />
        <OurStory />
        <Venue />
        <DressCode />
        <Contact />
        <RsvpForm />
        <InvitationFooter />
      </main>
    </InvitationShell>
  );
}
