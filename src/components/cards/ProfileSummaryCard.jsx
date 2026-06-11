"use client";

import { FileText, FolderKanban } from "lucide-react";

import { PERSONAL_INFO, TECH_STACK } from "@/lib/constants";

const CV_DRIVE_URL =
  "https://drive.google.com/drive/folders/1SmhgvKkpRICHDnnvEH3dTHS-72bmsp16?usp=sharing";

const mainStacks = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "React",
];

export function ProfileSummaryCard({
  projectsCount = 0,
  certificatesCount = 0,
}) {
  const selectedStacks = mainStacks
    .map((stackName) => TECH_STACK.find((tech) => tech.name === stackName))
    .filter(Boolean);

  const stats = [
    {
      value: projectsCount,
      label: "Projects",
    },
    {
      value: certificatesCount,
      label: "Certificates",
    },
    {
      value: TECH_STACK.length,
      label: "Tech Stack",
    },
  ];

  function handleViewProjectsClick(event) {
    event.preventDefault();

    const projectsSection = document.getElementById("projects");

    if (!projectsSection) {
      window.location.href = "/projects";
      return;
    }

    const navbarOffset = window.innerWidth < 768 ? 84 : 115;
    const projectsPosition =
      projectsSection.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.history.pushState(null, "", "/projects");

    window.scrollTo({
      top: Math.max(projectsPosition, 0),
      behavior: "smooth",
    });
  }

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="absolute -inset-4 rounded-[2rem] bg-violet-500/20 blur-2xl sm:-inset-8 sm:rounded-[2.5rem] sm:blur-3xl" />

      <div className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.08] p-3 shadow-2xl shadow-blue-950/30 backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-5">
        <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950/35 px-5 pb-5 pt-10 sm:overflow-visible sm:rounded-[2rem] sm:p-8 md:p-10">
          <div className="relative mx-auto flex size-36 items-center justify-center sm:size-48 md:size-56">
            <div className="absolute inset-0 rounded-full border border-blue-200/18 sm:border-blue-200/15" />
            <div className="absolute inset-[-10px] rounded-full border border-blue-300/16 sm:inset-[-18px] sm:border-blue-300/12" />
            <div className="absolute inset-[-20px] rounded-full border border-blue-300/12 sm:inset-[-36px] sm:border-blue-300/10" />

            <div className="absolute right-2 top-4 size-3.5 rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/60 sm:right-3 sm:top-5 sm:size-5" />
            <div className="absolute bottom-7 left-2 size-3 rounded-full bg-blue-300 shadow-lg shadow-blue-300/60 sm:bottom-8 sm:left-2 sm:size-4" />

            <div className="size-24 overflow-hidden rounded-full border border-blue-200/30 bg-blue-950/40 p-1.5 shadow-2xl shadow-blue-500/20 sm:size-32 sm:p-2 md:size-40">
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="mt-7 text-center sm:mt-8">
            <p className="text-sm text-blue-200/75 sm:text-base">Portofolio</p>

            <h2 className="mx-auto mt-3 max-w-sm text-2xl font-black leading-tight text-white sm:text-3xl md:text-[2.2rem]">
              {PERSONAL_INFO.role}
            </h2>

            <p className="mt-4 text-sm text-blue-100/65 sm:text-base">
              {PERSONAL_INFO.location}
            </p>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-300/25 hover:bg-white/[0.14] sm:p-5"
              >
                <p className="text-2xl font-black text-white sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-[11px] leading-4 text-blue-100/60 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 sm:mt-8">
            <p className="mb-4 text-sm font-bold text-blue-100 sm:text-base">
              Main Stack
            </p>

            <div className="grid grid-cols-3 gap-3 min-[420px]:grid-cols-6">
              {selectedStacks.map((tech) => (
                <div
                  key={tech.name}
                  className="flex h-14 w-full items-center justify-center rounded-2xl border border-white/10 bg-white/10 p-3 shadow-lg shadow-blue-950/10 transition hover:-translate-y-1 hover:bg-white/15 min-[420px]:w-14 md:h-16 md:w-16"
                  title={tech.name === "React" ? "ReactJS" : tech.name}
                >
                  <img
                    src={tech.icon}
                    alt={tech.name === "React" ? "ReactJS" : tech.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
        <a
          href={CV_DRIVE_URL}
          target="_blank"
          rel="noreferrer"
          className="video-hover-button video-hover-button-primary group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg px-5 py-3 text-center text-sm font-extrabold text-white shadow-xl shadow-violet-500/25 sm:min-h-14 sm:text-base"
        >
          <FileText className="size-5 stroke-[2.4]" />
          <span>Download CV</span>
        </a>

        <a
          href="/projects"
          onClick={handleViewProjectsClick}
          className="video-hover-button video-hover-button-dark group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-center text-sm font-extrabold text-white shadow-xl shadow-blue-950/10 sm:min-h-14 sm:text-base"
        >
          <FolderKanban className="size-5 stroke-[2.4]" />
          <span>View Projects</span>
        </a>
      </div>
    </div>
  );
}
