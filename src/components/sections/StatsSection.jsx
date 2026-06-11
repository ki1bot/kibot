import { STATS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function StatsSection() {
  return (
    <section className="border-t border-white/10 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <RevealOnScroll key={stat.label} delay={index * 90}>
              <Card className="group h-full hover:-translate-y-2 hover:border-violet-300/25 hover:bg-white/[0.1] hover:shadow-violet-500/15">
                <CardContent className="pt-6">
                  <p className="bg-gradient-to-r from-violet-200 via-white to-blue-200 bg-clip-text text-4xl font-black text-transparent">
                    {stat.value}
                  </p>

                  <h3 className="mt-3 text-base font-bold text-white">
                    {stat.label}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-blue-100/60">
                    {stat.description}
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
