import { ExternalLink, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function isPdfFile(filePath) {
  return filePath?.toLowerCase().endsWith(".pdf");
}

function isImageFile(filePath) {
  const lowerPath = filePath?.toLowerCase() || "";

  return (
    lowerPath.endsWith(".png") ||
    lowerPath.endsWith(".jpg") ||
    lowerPath.endsWith(".jpeg") ||
    lowerPath.endsWith(".webp")
  );
}

function getImagePath(filePath) {
  if (!filePath) return "";

  if (isImageFile(filePath)) {
    return filePath;
  }

  if (isPdfFile(filePath)) {
    return filePath
      .replace("/serfikatlsp-", "/sertifikatlsp-")
      .replace(/\.pdf$/i, ".png");
  }

  return filePath;
}

function getPdfPath(filePath) {
  if (!filePath) return "";

  if (isPdfFile(filePath)) {
    return filePath;
  }

  if (isImageFile(filePath)) {
    return filePath
      .replace("/sertifikatlsp-", "/serfikatlsp-")
      .replace(/\.(png|jpg|jpeg|webp)$/i, ".pdf");
  }

  return filePath;
}

export function CertificateCard({ certificate }) {
  const certificatePath = certificate.img;
  const certificateTitle = certificate.title || "Certificate";

  const imagePath = getImagePath(certificatePath);
  const pdfPath =
    certificate.pdf_url || certificate.pdfUrl || getPdfPath(certificatePath);

  const isPdf = isPdfFile(certificatePath);
  const isImage = isImageFile(imagePath);

  return (
    <Card className="group h-full overflow-hidden p-0 hover:-translate-y-2 hover:border-violet-300/25 hover:bg-white/[0.1] hover:shadow-violet-500/15">
      {isPdf ? (
        <div>
          <a href={pdfPath} target="_blank" rel="noreferrer">
            <div className="aspect-[4/3] overflow-hidden bg-slate-950/40">
              {isImage && imagePath ? (
                <img
                  src={imagePath}
                  alt={certificateTitle}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex min-h-[260px] flex-col justify-between p-5 sm:min-h-[320px] sm:p-6">
                  <div>
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-violet-500/12 text-violet-200 transition group-hover:scale-110 group-hover:bg-violet-500/20 sm:size-14">
                      <FileText className="size-6 sm:size-7" />
                    </div>

                    <h3 className="text-base font-bold text-white sm:text-lg">
                      {certificateTitle}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-blue-100/65">
                      Sertifikat ini berbentuk file PDF. Klik tombol di bawah
                      untuk membuka sertifikat di tab baru.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </a>

          <div className="p-4 sm:p-5">
            <h3 className="line-clamp-2 text-base font-bold text-white">
              {certificateTitle}
            </h3>

            <Button
              asChild
              className="mt-4 h-10 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-sm shadow-lg shadow-violet-500/20"
            >
              <a href={pdfPath} target="_blank" rel="noreferrer">
                Lihat Sertifikat
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <a href={pdfPath} target="_blank" rel="noreferrer">
            <div className="aspect-[4/3] overflow-hidden bg-slate-950/40">
              {isImage && imagePath ? (
                <img
                  src={imagePath}
                  alt={certificateTitle}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-blue-100/60">
                  No Certificate Image
                </div>
              )}
            </div>
          </a>

          <div className="p-4 sm:p-5">
            <h3 className="line-clamp-2 text-base font-bold text-white">
              {certificateTitle}
            </h3>

            <Button
              asChild
              className="mt-4 h-10 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-sm shadow-lg shadow-violet-500/20"
            >
              <a href={pdfPath} target="_blank" rel="noreferrer">
                Lihat Sertifikat
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
