"use client";

import { assetUrl } from "@/lib/supabase-storage";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Award,
  Boxes,
  ChevronDown,
  ChevronUp,
  Code2,
  ExternalLink,
  FolderKanban,
  Layers3,
  Sparkles,
} from "lucide-react";

import { TECH_STACK } from "@/lib/constants";
import { createProjectSlug } from "@/lib/project-slug";
import { CertificateCard } from "@/components/cards/CertificateCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

const VISIBLE_ITEMS_LIMIT = 6;
const ACTIVE_PROJECT_STORAGE_KEY = "portfolio_active_project_slug";

const tabs = [
  {
    key: "projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    key: "certificates",
    label: "Certificates",
    icon: Award,
  },
  {
    key: "techstack",
    label: "Tech Stack",
    icon: Code2,
  },
];

function normalizeJsonArray(value) {
  if (Array.isArray(value)) return value;
  return [];
}

function getProjectSlug(project) {
  return createProjectSlug(project?.title || "");
}

function TechStackGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {TECH_STACK.map((tech, index) => (
        <RevealOnScroll key={tech.name} delay={index * 35}>
          <div className="group rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-blue-950/10 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-violet-300/25 hover:bg-white/[0.1] hover:shadow-violet-500/15 sm:rounded-[1.5rem] sm:p-5">
            <div className="flex min-h-[124px] flex-col items-center justify-center gap-3 sm:min-h-[150px] sm:gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] p-3 transition duration-300 group-hover:scale-110 group-hover:bg-violet-500/15 sm:size-16 sm:rounded-3xl">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition duration-300 group-hover:rotate-6"
                />
              </div>

              <p className="text-center text-xs font-semibold text-white sm:text-sm">
                {tech.name}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}

function SeeMoreButton({
  isExpanded,
  hiddenCount,
  onClick,
  expandedLabel = "Show Less",
}) {
  const Icon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div className="mt-8 flex justify-center sm:mt-10">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isExpanded}
        className="see-more-button group relative inline-flex min-h-[52px] w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-violet-300/25 bg-white/[0.06] px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-xl shadow-blue-950/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-200/45 hover:bg-violet-500/14 hover:shadow-violet-500/20 sm:min-h-14 sm:w-auto sm:px-7 sm:text-sm sm:tracking-[0.18em]"
      >
        <span className="see-more-button-glow" />

        <span className="relative z-10">
          {isExpanded ? expandedLabel : `See More ${hiddenCount}`}
        </span>

        <span className="relative z-10 flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-violet-100 transition duration-300 group-hover:scale-110 group-hover:bg-violet-500/20 sm:size-9">
          <Icon className="size-4 transition duration-300 group-hover:translate-y-0.5" />
        </span>
      </button>
    </div>
  );
}

function ProjectDetailOverlay({ project, onBack }) {
  const features = normalizeJsonArray(project.features);
  const techStack = normalizeJsonArray(project.tech_stack);

  const projectTitle = project.title || "Untitled Project";
  const projectDescription =
    project.description || "Deskripsi project belum tersedia.";

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-80 w-full bg-gradient-to-b from-violet-500/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-full bg-gradient-to-t from-blue-600/12 to-transparent blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[520px] w-72 bg-gradient-to-l from-cyan-400/8 to-transparent blur-3xl" />
        <div className="absolute left-0 top-1/3 h-[520px] w-72 bg-gradient-to-r from-violet-500/10 to-transparent blur-3xl" />
      </div>

      <main className="project-detail-page min-h-screen overflow-hidden bg-[#050816] text-white">
        <section className="relative min-h-screen px-4 py-7 sm:px-6 sm:py-10 md:px-10 md:py-14 lg:py-20">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(168,85,247,0.16),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(37,99,235,0.13),transparent_34%),linear-gradient(180deg,rgba(2,6,23,0.05),rgba(2,6,23,0.96))]" />

          <div className="project-detail-grid pointer-events-none absolute inset-0 -z-10 opacity-55" />

          <div className="mx-auto max-w-[1180px]">
            <div className="detail-reveal flex flex-wrap items-center gap-2 text-xs font-semibold text-blue-100/50 sm:gap-4 sm:text-sm">
              <button
                type="button"
                onClick={onBack}
                className="video-hover-button video-hover-button-dark inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-white shadow-lg shadow-blue-950/10 sm:h-12 sm:px-5"
              >
                <ArrowLeft className="size-4" />
                Back
              </button>

              <span>Projects</span>
              <span className="text-blue-100/28">›</span>
              <span className="max-w-[180px] truncate text-white min-[420px]:max-w-[260px] sm:max-w-none">
                {projectTitle}
              </span>
            </div>

            <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
              <div>
                <div className="detail-reveal detail-delay-1">
                  <h1 className="max-w-2xl bg-gradient-to-r from-blue-100 via-violet-100 to-fuchsia-200 bg-clip-text text-3xl font-black leading-[1.08] tracking-tight text-transparent min-[390px]:text-4xl md:text-5xl lg:text-6xl">
                    {projectTitle}
                  </h1>

                  <div className="detail-glow-line mt-5 h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 shadow-lg shadow-violet-500/35 sm:mt-7 sm:w-28" />
                </div>

                <p className="detail-reveal detail-delay-2 mt-6 max-w-[620px] text-base font-medium leading-8 text-blue-100/72 sm:mt-9 sm:text-[1.05rem]">
                  {projectDescription}
                </p>

                <div className="detail-reveal detail-delay-3 mt-7 rounded-2xl border border-white/8 bg-white/[0.035] p-3 shadow-2xl shadow-blue-950/15 backdrop-blur-xl sm:mt-9">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="detail-stat-card rounded-xl border border-blue-300/15 bg-blue-500/[0.07] p-4">
                      <div className="flex items-center gap-4">
                        <div className="detail-stat-icon flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                          <Code2 className="size-5" />
                        </div>

                        <div>
                          <p className="text-xl font-black text-white">
                            {techStack.length}
                          </p>
                          <p className="text-xs font-medium text-blue-100/55">
                            Total Teknologi
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="detail-stat-card rounded-xl border border-violet-300/15 bg-violet-500/[0.07] p-4">
                      <div className="flex items-center gap-4">
                        <div className="detail-stat-icon flex size-11 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-300">
                          <Layers3 className="size-5" />
                        </div>

                        <div>
                          <p className="text-xl font-black text-white">
                            {features.length}
                          </p>
                          <p className="text-xs font-medium text-blue-100/55">
                            Fitur Utama
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="detail-reveal detail-delay-4 mt-7 grid gap-3 min-[430px]:flex min-[430px]:flex-wrap min-[430px]:gap-4 sm:mt-8">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="video-hover-button inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-blue-400/25 bg-blue-500/10 px-6 text-sm font-bold text-blue-200 shadow-xl shadow-blue-950/20 min-[430px]:w-auto sm:h-14 sm:min-w-36 sm:px-7"
                    >
                      <ExternalLink className="size-4" />
                      Live Demo
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="video-hover-button inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-fuchsia-400/25 bg-fuchsia-500/10 px-6 text-sm font-bold text-fuchsia-100 shadow-xl shadow-blue-950/20 min-[430px]:w-auto sm:h-14 sm:min-w-32 sm:px-7"
                    >
                      <img
                        src={assetUrl("media/github.png")}
                        alt="GitHub"
                        loading="lazy"
                        decoding="async"
                        className="size-5 rounded-full object-contain"
                      />
                      Github
                    </a>
                  )}
                </div>

                {techStack.length > 0 && (
                  <div className="detail-reveal detail-delay-5 mt-8 sm:mt-9">
                    <div className="mb-4 flex items-center gap-3 sm:mb-5">
                      <Code2 className="size-4 text-blue-300" />
                      <h2 className="text-lg font-black text-white sm:text-xl">
                        Technologies Used
                      </h2>
                    </div>

                    <div className="flex max-w-[620px] flex-wrap gap-2.5 sm:gap-3">
                      {techStack.map((tech, index) => (
                        <span
                          key={tech}
                          style={{
                            animationDelay: `${420 + index * 45}ms`,
                          }}
                          className="detail-tech-pill inline-flex items-center gap-2 rounded-xl border border-blue-400/15 bg-blue-500/10 px-3 py-2 text-xs font-bold text-blue-200 shadow-lg shadow-blue-950/10 sm:px-4 sm:text-sm"
                        >
                          <Boxes className="size-4" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-5 lg:space-y-6 lg:pt-12">
                <div className="detail-reveal detail-delay-2 detail-image-card overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] p-2 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
                  {project.img ? (
                    <img
                      src={project.img}
                      alt={projectTitle}
                      className="aspect-[16/10] w-full rounded-xl object-cover object-top sm:aspect-video"
                    />
                  ) : (
                    <div className="flex aspect-[16/10] w-full items-center justify-center rounded-xl bg-slate-950/50 text-sm text-blue-100/55 sm:aspect-video">
                      No Image
                    </div>
                  )}
                </div>

                <div className="detail-reveal detail-delay-4 detail-feature-card rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-blue-950/20 backdrop-blur-xl sm:p-6">
                  <div className="mb-5 flex items-center gap-3 sm:mb-6">
                    <Sparkles className="size-5 text-yellow-300" />
                    <h2 className="text-xl font-black text-white sm:text-2xl">
                      Key Features
                    </h2>
                  </div>

                  {features.length > 0 ? (
                    <ul className="detail-feature-list space-y-2.5 sm:space-y-3">
                      {features.map((feature, index) => (
                        <li
                          key={feature}
                          style={{
                            animationDelay: `${480 + index * 50}ms`,
                          }}
                          className="detail-feature-item group"
                        >
                          <span className="detail-feature-shine" />

                          <span className="detail-feature-dot" />

                          <span className="detail-feature-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-7 text-blue-100/60">
                      Fitur project belum ditambahkan.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative border-t border-white/10 bg-slate-950/35 px-4 py-7 text-center backdrop-blur-xl sm:px-6 md:px-10 md:py-8">
          <p className="text-sm font-medium text-blue-100/60">
            © 2026 Rifqi. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}

function ProjectsPanel({ projects, onOpenProject }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!projects?.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-center text-sm text-blue-100/65 sm:p-8 sm:text-base">
        Belum ada project yang ditampilkan.
      </div>
    );
  }

  const shouldShowButton = projects.length > VISIBLE_ITEMS_LIMIT;
  const visibleProjects = isExpanded
    ? projects
    : projects.slice(0, VISIBLE_ITEMS_LIMIT);
  const hiddenProjectsCount = Math.max(
    projects.length - VISIBLE_ITEMS_LIMIT,
    0,
  );

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <RevealOnScroll key={project.id ?? project.title} delay={index * 70}>
            <ProjectCard project={project} onOpenDetail={onOpenProject} />
          </RevealOnScroll>
        ))}
      </div>

      {shouldShowButton && (
        <SeeMoreButton
          isExpanded={isExpanded}
          hiddenCount={hiddenProjectsCount}
          onClick={() => setIsExpanded((current) => !current)}
          expandedLabel="Show Less"
        />
      )}
    </div>
  );
}

function CertificatesPanel({ certificates }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!certificates?.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-center text-sm text-blue-100/65 sm:p-8 sm:text-base">
        Belum ada sertifikat yang ditampilkan.
      </div>
    );
  }

  const shouldShowButton = certificates.length > VISIBLE_ITEMS_LIMIT;
  const visibleCertificates = isExpanded
    ? certificates
    : certificates.slice(0, VISIBLE_ITEMS_LIMIT);
  const hiddenCertificatesCount = Math.max(
    certificates.length - VISIBLE_ITEMS_LIMIT,
    0,
  );

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {visibleCertificates.map((certificate, index) => (
          <RevealOnScroll
            key={certificate.id ?? certificate.title ?? certificate.img}
            delay={index * 70}
          >
            <CertificateCard certificate={certificate} />
          </RevealOnScroll>
        ))}
      </div>

      {shouldShowButton && (
        <SeeMoreButton
          isExpanded={isExpanded}
          hiddenCount={hiddenCertificatesCount}
          onClick={() => setIsExpanded((current) => !current)}
          expandedLabel="Show Less"
        />
      )}
    </div>
  );
}

export function PortfolioShowcaseSection({ projects = [], certificates = [] }) {
  const [activeTab, setActiveTab] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const savedProjectSlug = sessionStorage.getItem(ACTIVE_PROJECT_STORAGE_KEY);

    if (!savedProjectSlug) return;

    const savedProject = projects.find((project) => {
      return getProjectSlug(project) === savedProjectSlug;
    });

    if (!savedProject) {
      sessionStorage.removeItem(ACTIVE_PROJECT_STORAGE_KEY);
      return;
    }

    setSelectedProject(savedProject);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [projects]);

  function handleOpenProject(project) {
    const projectSlug = getProjectSlug(project);

    sessionStorage.setItem(ACTIVE_PROJECT_STORAGE_KEY, projectSlug);
    setSelectedProject(project);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }

  function handleCloseProject() {
    sessionStorage.removeItem(ACTIVE_PROJECT_STORAGE_KEY);
    setSelectedProject(null);

    window.requestAnimationFrame(() => {
      document.getElementById("projects")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <>
      {selectedProject && (
        <ProjectDetailOverlay
          project={selectedProject}
          onBack={handleCloseProject}
        />
      )}

      <section
        id="projects"
        className="border-t border-white/10 py-20 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <RevealOnScroll className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                Portofolio Showcase
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-blue-100/72 sm:text-base md:mt-5 md:text-lg md:leading-8">
              Jelajahi project, sertifikat, dan teknologi yang saya gunakan
              dalam proses belajar dan pengembangan Portofolio ini.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={100} y={20}>
            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-2.5 shadow-2xl shadow-blue-950/20 backdrop-blur-md sm:mt-12 sm:rounded-[2rem] sm:p-4">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;

                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`group flex min-h-[74px] flex-col items-center justify-center rounded-[1.05rem] border px-2 py-3 text-center transition duration-300 sm:min-h-[96px] sm:rounded-[1.4rem] sm:px-6 sm:py-5 ${
                        isActive
                          ? "border-violet-300/20 bg-[linear-gradient(135deg,rgba(124,58,237,0.28),rgba(255,255,255,0.08))] shadow-xl shadow-violet-500/10"
                          : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon
                        className={`mb-2 size-4 transition sm:mb-3 sm:size-5 ${
                          isActive
                            ? "text-violet-200"
                            : "text-blue-100/55 group-hover:text-blue-100/85"
                        }`}
                      />

                      <span
                        className={`text-[11px] font-semibold leading-tight transition min-[390px]:text-xs sm:text-2xl ${
                          isActive
                            ? "text-white"
                            : "text-blue-100/70 group-hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </RevealOnScroll>

          <div className="mt-8 sm:mt-10">
            {activeTab === "projects" && (
              <ProjectsPanel
                projects={projects}
                onOpenProject={handleOpenProject}
              />
            )}

            {activeTab === "certificates" && (
              <CertificatesPanel certificates={certificates} />
            )}

            {activeTab === "techstack" && <TechStackGrid />}
          </div>
        </div>
      </section>
    </>
  );
}
