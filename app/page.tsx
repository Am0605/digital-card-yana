import { Suspense } from "react";
import { DressCode } from "@/components/invitation/DressCode";
import { FloralBackground } from "@/components/invitation/Floral";
import { Hero } from "@/components/invitation/Hero";
import { InvitationFooter } from "@/components/invitation/InvitationFooter";
import { InvitationShell } from "@/components/invitation/InvitationShell";
import { InvitationNote } from "@/components/invitation/InvitationNote";
import { RsvpForm } from "@/components/invitation/RsvpForm";
import { Venue } from "@/components/invitation/Venue";
import { Wishes } from "@/components/invitation/Wishes";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <InvitationShell>
      <main className="mx-auto min-h-full w-full max-w-xl bg-background pb-28 shadow-[0_0_80px_rgba(63,52,44,0.08)]">
        <Hero />
        <div className="relative">
          <FloralBackground />
          <div className="relative">
            <InvitationNote />
            <Venue />
            <DressCode />
            <RsvpForm />
            <Suspense fallback={null}>
              <Wishes />
            </Suspense>
            <InvitationFooter />
          </div>
        </div>
      </main>
    </InvitationShell>
  );
}
