import { CertificateCard } from "@/components/cards/CertificateCard";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function CertificatesSection({ certificates = [] }) {
  return (
    <section id="certificates" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Certificates"
          title="Sertifikat dan pencapaian"
          description="Berikut adalah beberapa sertifikat dan pencapaian yang saya peroleh sebagai bagian dari proses belajar dan pengembangan kemampuan saya."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {certificates.map((certificate, index) => (
            <RevealOnScroll key={certificate.id} delay={index * 100}>
              <CertificateCard certificate={certificate} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
