import {
  BriefcaseBusiness,
  Code2,
  Database,
  LayoutDashboard,
} from "lucide-react";

import { SERVICES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SectionHeader } from "@/components/shared/SectionHeader";

const icons = [Code2, LayoutDashboard, Database, BriefcaseBusiness];

export function ServicesSection() {
  return (
    <section id="services" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Services"
          title="Layanan yang bisa saya bantu"
          description="Saya dapat membantu membangun website yang responsif, modern, dan terstruktur dengan baik, mulai dari tampilan frontend hingga integrasi database."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {SERVICES.map((service, index) => {
            const Icon = icons[index] || Code2;

            return (
              <RevealOnScroll key={service.title} delay={index * 120}>
                <Card className="group h-full hover:-translate-y-2 hover:border-violet-300/25 hover:bg-white/[0.1] hover:shadow-violet-500/15">
                  <CardContent className="pt-6">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-violet-500/12 text-violet-200 transition group-hover:scale-110 group-hover:bg-violet-500/20">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-blue-100/65">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
