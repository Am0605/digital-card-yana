import { FadeIn } from "@/components/invitation/FadeIn";
import { WishReel } from "@/components/invitation/WishReel";
import { Ornament, SectionEyebrow, SectionTitle } from "@/components/invitation/SectionHeader";
import { fetchWishes } from "@/lib/wishes";

export async function Wishes() {
  const wishes = await fetchWishes();
  if (wishes.length === 0) return null;

  return (
    <section className="pt-4 pb-20 sm:pb-24" aria-label="Ucapan">
      <FadeIn className="px-6">
        <SectionEyebrow>Dari tetamu</SectionEyebrow>
        <SectionTitle>Ucapan</SectionTitle>
        <div className="mt-6">
          <Ornament />
        </div>
      </FadeIn>

      <WishReel wishes={wishes} />
    </section>
  );
}
