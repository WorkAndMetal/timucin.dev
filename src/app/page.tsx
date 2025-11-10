import Image from "next/image";
import { MenuSectionBlock } from "@/components/MenuSection";
import { menuSections } from "@/data/menu";

type HighlightCard = {
  title: string;
  lines: readonly string[];
};

const highlightCards: HighlightCard[] = [
  {
    title: "Adres",
    lines: ["İncirli Cad. No:42", "Bakırköy, İstanbul"],
  },
  {
    title: "Saatler",
    lines: ["Hafta içi 09:00-23:00", "Hafta sonu 10:00-00:00"],
  },
  {
    title: "Sipariş",
    lines: ["Kasaya gerek yok", "Masadan QR ile sipariş"],
  },
];

const vibeNotes: readonly string[] = [
  "Üçüncü dalga çekirdeklerden demlenen kahveler",
  "Bitki bazlı dostu alternatifler",
  "Tatlı ve tuzlu eşlikçiler",
];

function slugify(label: string) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function Home() {
  const sectionAnchors = menuSections.map((section) => ({
    name: section.name,
    anchor: slugify(section.name),
  }));

  return (
    <div className="flex min-h-screen justify-center px-4 py-12 sm:px-6 lg:px-8">
      <main className="flex w-full max-w-6xl flex-col gap-12">
        <nav className="sticky top-6 z-40 w-full overflow-x-auto">
          <div className="flex w-full items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-3 shadow-[0_18px_80px_-50px_rgba(24,18,43,0.45)] backdrop-blur-md">
            {sectionAnchors.map((entry) => (
              <a
                key={entry.anchor}
                href={`#${entry.anchor}`}
                className="whitespace-nowrap rounded-full border border-transparent bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 transition hover:border-rose-200 hover:text-rose-500"
              >
                {entry.name}
              </a>
            ))}
          </div>
        </nav>

        <header className="grid gap-10 rounded-[2.5rem] border border-white/70 bg-white/60 p-10 shadow-[0_40px_120px_-60px_rgba(24,18,43,0.75)] backdrop-blur-2xl lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="max-w-fit rounded-full border border-rose-200/70 bg-rose-50/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-rose-400">
                Chill Vibes | Bakırköy
              </span>
              <h1 className="text-4xl font-semibold text-stone-900 sm:text-5xl">
                Miesta QR Menü
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-stone-600">
                Miesta Cafe&apos;nin chill atmosferine uygun olarak hazırlanan bu QR menü,
                sezonsal aromaları, uzun süre demlenmiş kahveleri ve hafif atıştırmalıkları
                yumuşak tonlarda buluşturur. Rahatça incele, favorilerini işaretle ve
                baristamıza ilet.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlightCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/80 bg-white/70 p-5 shadow-inner shadow-white/30"
                >
                  <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
                    {card.title}
                  </h2>
                  <ul className="mt-3 space-y-1 text-sm text-stone-600">
                    {card.lines.map((line) => (
                      <li key={`${card.title}-${line}`}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {vibeNotes.map((note) => (
                <span
                  key={note}
                  className="rounded-full bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-wide text-stone-500 shadow-sm"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 rounded-3xl bg-gradient-to-br from-rose-50/80 via-white to-sky-50/70 p-6 text-center shadow-[0_28px_120px_-70px_rgba(24,18,43,0.75)]">
            <div className="rounded-2xl bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <Image
                src="/qr-miesta.svg"
                alt="Miesta Cafe QR kodu"
                width={168}
                height={168}
                priority
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-stone-700">
                Masadan sipariş vermek için tara
              </p>
              <p className="text-xs leading-relaxed text-stone-500">
                QR kodu tarayarak menüyü telefonuna kaydedebilir, favorilerini işaretleyebilir ve
                barista ekibimize saniyeler içinde siparişini iletebilirsin.
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {menuSections.map((section, index) => (
            <MenuSectionBlock
              key={section.name}
              section={section}
              anchorId={sectionAnchors[index]?.anchor}
            />
          ))}
        </section>

        <footer className="rounded-[2rem] border border-white/70 bg-white/60 px-8 py-6 text-center text-xs text-stone-500 shadow-[0_28px_120px_-80px_rgba(24,18,43,0.75)]">
          <p>Miesta Cafe · Bakırköy</p>
          <p>Alerjen bilgileri ve detaylı öneriler için barista ekibimize danışabilirsiniz.</p>
        </footer>
      </main>
    </div>
  );
}

