import { Cake, GraduationCap } from "lucide-react";

import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

const educationTimeline = [
  {
    year: "2006",
    title: "Tahun Kelahiran",
    description: "Bekasi",
    side: "center",
    icon: Cake,
  },
  {
    year: "2011 - 2012",
    title: "Taman Kanak-kanak (TK)",
    description: "TK. Islam Harapan Jaya",
    side: "right",
    icon: GraduationCap,
  },
  {
    year: "2012 - 2018",
    title: "Sekolah Dasar (SD)",
    description: "SDN Harapan Jaya 8",
    side: "left",
    icon: GraduationCap,
  },
  {
    year: "2018 - 2021",
    title: "Sekolah Menengah Pertama (SMP)",
    description: "SMP Pangeran Jayakarta",
    side: "right",
    icon: GraduationCap,
  },
  {
    year: "2021 - 2024",
    title: "Sekolah Menengah Kejuruan (SMK)",
    description: "SMK Patriot 1",
    side: "left",
    icon: GraduationCap,
  },
  {
    year: "2024 - Sekarang",
    title: "Universitas Gunadarma",
    description: "S1 - Sistem Informasi",
    side: "right",
    icon: GraduationCap,
  },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="border-t border-white/10 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 md:px-10">
        <div className="max-w-4xl">
          <RevealOnScroll y={28} delay={0}>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-100/70 sm:text-sm sm:tracking-[0.35em]">
              Education Journey
            </p>
          </RevealOnScroll>

          <RevealOnScroll y={34} delay={120}>
            <h2 className="mt-5 max-w-5xl text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-4xl md:mt-6 md:text-5xl lg:text-6xl">
              Perjalanan pendidikan saya
            </h2>
          </RevealOnScroll>

          <RevealOnScroll y={30} delay={220}>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-blue-100/72 sm:text-base md:mt-7 md:text-lg md:leading-8">
              Berikut adalah perjalanan pendidikan saya dari awal hingga saat
              ini sebagai mahasiswa Sistem Informasi di Universitas Gunadarma.
            </p>
          </RevealOnScroll>
        </div>

        <div className="relative mx-auto mt-14 max-w-5xl md:mt-20">
          <div className="pointer-events-none absolute bottom-16 left-1/2 top-[10.85rem] -z-10 hidden w-[10px] -translate-x-1/2 md:block">
            <div className="absolute left-1/2 top-0 h-full w-[10px] -translate-x-1/2 bg-gradient-to-b from-transparent via-violet-400/40 to-violet-500/10 blur-[6px]" />
            <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-violet-300/90 to-violet-500/40" />
          </div>

          <div className="hidden space-y-12 md:block">
            {educationTimeline.map((item, index) => {
              const isLeft = item.side === "left";
              const isRight = item.side === "right";
              const isCenter = item.side === "center";
              const Icon = item.icon || GraduationCap;

              if (isCenter) {
                return (
                  <RevealOnScroll
                    key={`${item.year}-${item.title}`}
                    delay={index * 110}
                    y={34}
                    scale={0.98}
                  >
                    <div className="relative flex flex-col items-center text-center">
                      <div className="relative z-30 w-full max-w-sm">
                        <TimelineCard
                          item={item}
                          align="center"
                          solidBackground
                        />
                      </div>

                      <BirthTimelineConnector />

                      <TimelineIcon Icon={Icon} size="desktop" />
                    </div>
                  </RevealOnScroll>
                );
              }

              return (
                <RevealOnScroll
                  key={`${item.year}-${item.title}`}
                  delay={index * 110}
                  y={34}
                  scale={0.98}
                >
                  <div className="relative grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
                    <div
                      className={`hidden md:block ${
                        isLeft ? "md:pr-8 md:text-right" : ""
                      }`}
                    >
                      {isLeft && <TimelineCard item={item} align="right" />}
                    </div>

                    <div className="relative z-20 hidden md:flex">
                      <TimelineIcon Icon={Icon} size="desktop" />

                      {isLeft && (
                        <div className="absolute right-full top-1/2 -z-10 flex w-[52px] -translate-y-1/2 items-center justify-end">
                          <div className="absolute h-[10px] w-full bg-gradient-to-l from-violet-400/40 to-transparent blur-[6px]" />
                          <div className="absolute h-[2px] w-full bg-gradient-to-l from-violet-300/90 to-transparent" />
                        </div>
                      )}

                      {isRight && (
                        <div className="absolute left-full top-1/2 -z-10 flex w-[52px] -translate-y-1/2 items-center justify-start">
                          <div className="absolute h-[10px] w-full bg-gradient-to-r from-violet-400/40 to-transparent blur-[6px]" />
                          <div className="absolute h-[2px] w-full bg-gradient-to-r from-violet-300/90 to-transparent" />
                        </div>
                      )}
                    </div>

                    <div
                      className={`hidden md:block ${
                        isRight ? "md:pl-8 md:text-left" : ""
                      }`}
                    >
                      {isRight && <TimelineCard item={item} align="left" />}
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

          <div className="md:hidden">
            <div className="flex flex-col items-center">
              {educationTimeline.map((item, index) => {
                const isLastItem = index === educationTimeline.length - 1;
                const Icon = item.icon || GraduationCap;

                return (
                  <RevealOnScroll
                    key={`${item.year}-${item.title}`}
                    delay={index * 95}
                    y={24}
                    scale={0.98}
                    className="w-full"
                  >
                    <MobileTimelineItem
                      item={item}
                      icon={Icon}
                      isLastItem={isLastItem}
                    />
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BirthTimelineConnector() {
  return (
    <div className="relative -mt-px h-11 w-16">
      <div className="absolute left-1/2 top-0 h-full w-[10px] -translate-x-1/2 bg-gradient-to-b from-violet-300/35 via-violet-400/40 to-violet-300/25 blur-[6px]" />

      <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-200/95 via-violet-300/90 to-violet-300/45 shadow-[0_0_12px_rgba(196,181,253,0.42)]" />
    </div>
  );
}

function TimelineIcon({ Icon, size = "mobile" }) {
  const isDesktop = size === "desktop";

  return (
    <div
      className={`relative z-30 flex shrink-0 items-center justify-center rounded-full border border-violet-300/35 bg-[#211653] text-violet-100 shadow-[0_0_24px_rgba(139,92,246,0.48)] backdrop-blur-xl transition duration-300 hover:scale-110 hover:border-violet-200/50 hover:bg-[#2a1b67] ${
        isDesktop ? "size-14" : "size-11"
      }`}
    >
      <div className="absolute inset-[3px] rounded-full bg-[#211653]" />

      <Icon className={`relative z-10 ${isDesktop ? "size-6" : "size-5"}`} />
    </div>
  );
}

function TimelineCard({ item, align = "left", solidBackground = false }) {
  return (
    <div
      className={`group relative z-30 rounded-[1.5rem] border border-white/10 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-violet-300/25 hover:shadow-violet-500/15 ${
        solidBackground
          ? "bg-[#111735] hover:bg-[#111735]"
          : "bg-white/[0.08] hover:bg-white/[0.1]"
      } ${
        align === "right"
          ? "text-right"
          : align === "center"
            ? "text-center"
            : "text-left"
      }`}
    >
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-200/75">
        {item.year}
      </p>

      <h3 className="mt-3 text-xl font-black leading-snug text-white">
        {item.title}
      </h3>

      {item.description ? (
        <p className="mt-2 text-sm leading-6 text-blue-100/65">
          {item.description}
        </p>
      ) : null}
    </div>
  );
}

function MobileTimelineItem({ item, icon: Icon, isLastItem }) {
  return (
    <div className="relative mx-auto w-full max-w-[330px] text-center">
      <div className="relative h-11">
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <TimelineIcon Icon={Icon} />
        </div>
      </div>

      <div className="relative h-9">
        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-violet-300/80 to-violet-300/40 shadow-[0_0_12px_rgba(196,181,253,0.42)]" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[310px] rounded-2xl border border-white/10 bg-[#111735] px-4 py-5 shadow-xl shadow-blue-950/20 backdrop-blur-xl">
        <p className="text-sm font-black tracking-[0.12em] text-violet-100">
          {item.year}
        </p>

        <h3 className="mt-2 text-base font-black leading-snug text-white">
          {item.title}
        </h3>

        {item.description ? (
          <p className="mt-2 text-sm font-semibold leading-6 text-blue-100/65">
            {item.description}
          </p>
        ) : null}
      </div>

      {!isLastItem ? (
        <div className="relative h-9">
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-violet-300/40 via-violet-300/80 to-violet-300/40 shadow-[0_0_12px_rgba(196,181,253,0.42)]" />
        </div>
      ) : null}
    </div>
  );
}
