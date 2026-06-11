import { ArrowRight, ExternalLink } from "lucide-react";

import { Card } from "@/components/ui/card";

export function ProjectCard({ project, onOpenDetail }) {
  const projectTitle = project.title || "Untitled Project";
  const projectDescription =
    project.description || "Deskripsi project belum tersedia.";

  function handleOpenDetail() {
    if (typeof onOpenDetail === "function") {
      onOpenDetail(project);
    }
  }

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1c2240]/90 p-0 shadow-2xl shadow-blue-950/25 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet-300/25 hover:bg-[#202747] hover:shadow-violet-500/15">
      <div className="p-4 pb-0 sm:p-5 sm:pb-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-950/50 sm:aspect-[16/9]">
          {project.img ? (
            <img
              src={project.img}
              alt={projectTitle}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-blue-100/60">
              No Image
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div>
          <h3 className="text-xl font-black leading-tight tracking-tight text-blue-100 sm:text-2xl md:text-[1.55rem]">
            {projectTitle}
          </h3>

          <p className="mt-3 text-sm font-medium leading-7 text-blue-100/62 sm:mt-4 sm:text-base sm:leading-8">
            {projectDescription}
          </p>
        </div>

        <div className="mt-auto grid gap-3 pt-6 min-[430px]:flex min-[430px]:items-center min-[430px]:justify-between min-[430px]:gap-4 sm:pt-8">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm font-bold text-blue-400 transition duration-300 hover:text-blue-300 min-[430px]:justify-start"
            >
              Live Demo
              <ExternalLink className="size-4" />
            </a>
          ) : (
            <span className="inline-flex items-center justify-center gap-2 text-sm font-bold text-blue-100/35 min-[430px]:justify-start">
              Live Demo
              <ExternalLink className="size-4" />
            </span>
          )}

          <button
            type="button"
            onClick={handleOpenDetail}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-5 text-sm font-bold text-white shadow-lg shadow-blue-950/10 transition duration-300 hover:-translate-y-0.5 hover:border-violet-300/25 hover:bg-white/[0.12] min-[430px]:h-12 min-[430px]:w-auto"
          >
            Details
            <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </Card>
  );
}
