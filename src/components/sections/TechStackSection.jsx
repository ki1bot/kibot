import { TECH_STACK } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function TechStackSection() {
  return (
    <section id="tech-stack" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Tech Stack"
          title="Teknologi yang saya gunakan"
          description="Berikut adalah teknologi, bahasa pemrograman, framework, database, dan tools yang saya gunakan untuk belajar serta mengembangkan project."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {TECH_STACK.map((tech, index) => (
            <RevealOnScroll key={tech.name} delay={index * 45}>
              <Card className="group h-full hover:-translate-y-2 hover:border-violet-300/25 hover:bg-white/[0.1] hover:shadow-violet-500/15">
                <CardContent className="flex min-h-[150px] flex-col items-center justify-center gap-4 pt-6">
                  <div className="flex size-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.07] p-3 transition duration-300 group-hover:scale-110 group-hover:bg-violet-500/15">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="h-full w-full object-contain transition duration-300 group-hover:rotate-6"
                    />
                  </div>

                  <p className="text-center text-sm font-semibold text-white">
                    {tech.name}
                  </p>
                </CardContent>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
