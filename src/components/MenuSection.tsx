import Image from "next/image";
import type { MenuSection } from "@/data/menu";

const pillPalette = {
  bestseller: "bg-rose-100 text-rose-700",
  classic: "bg-stone-100 text-stone-700",
  espresso: "bg-amber-100 text-amber-700",
  milk: "bg-orange-100 text-orange-700",
  sweet: "bg-pink-100 text-pink-700",
  iced: "bg-sky-100 text-sky-700",
  signature: "bg-violet-100 text-violet-700",
  vegan: "bg-emerald-100 text-emerald-700",
  herbal: "bg-lime-100 text-lime-700",
  share: "bg-teal-100 text-teal-700",
  gluten: "bg-yellow-100 text-yellow-700",
  "fırın": "bg-amber-100 text-amber-700",
} as const;

type PillKey = keyof typeof pillPalette;

function renderTag(tag: string, keySuffix: number) {
  const key = tag as PillKey;
  const styling = pillPalette[key] ?? "bg-zinc-200 text-zinc-600";
  return (
    <span
      key={`${tag}-${keySuffix}`}
      className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide ${styling}`}
    >
      {tag}
    </span>
  );
}

export function MenuSectionBlock({
  section,
  anchorId,
}: {
  section: MenuSection;
  anchorId?: string;
}) {
  return (
    <section
      id={anchorId}
      className="flex flex-col gap-6 rounded-3xl bg-white/60 p-8 shadow-[0_20px_60px_-30px_rgba(41,37,36,0.45)] ring-1 ring-white/60 backdrop-blur-lg transition hover:-translate-y-1 hover:shadow-[0_28px_80px_-40px_rgba(41,37,36,0.55)] scroll-mt-40"
    >
      <header className="flex flex-col gap-2">
        {section.highlight && (
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
            {section.highlight}
          </div>
        )}
        <h2 className="text-2xl font-semibold text-stone-800">
          {section.name}
        </h2>
      </header>
      <div className="space-y-6">
        {section.items.map((item) => (
          <article
            key={item.name}
            className="flex flex-col gap-4 rounded-2xl bg-white/70 p-4 shadow-inner shadow-white/40 ring-1 ring-white/70 md:flex-row md:items-center"
          >
            {item.image && (
              <div className="mx-auto flex h-28 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-100 md:mx-0 md:w-28">
                <Image
                  src={item.image}
                  alt={`${item.name} görseli`}
                  width={112}
                  height={112}
                  className="h-28 w-28 object-cover"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-lg font-medium text-stone-900">{item.name}</h3>
                <span className="text-sm font-semibold text-rose-500">{item.price}</span>
              </div>
              <p className="text-sm leading-relaxed text-stone-600">
                {item.description}
              </p>
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => renderTag(tag, index))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
