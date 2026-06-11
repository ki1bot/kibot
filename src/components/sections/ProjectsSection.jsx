"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { PROJECT_CATEGORIES } from "@/lib/constants";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";

function normalizeJsonArray(value) {
  if (Array.isArray(value)) return value;
  return [];
}

function projectMatchesSearch(project, searchValue) {
  const keyword = searchValue.toLowerCase().trim();

  if (!keyword) return true;

  const title = project.title?.toLowerCase() || "";
  const description = project.description?.toLowerCase() || "";
  const techStack = normalizeJsonArray(project.tech_stack)
    .join(" ")
    .toLowerCase();

  return (
    title.includes(keyword) ||
    description.includes(keyword) ||
    techStack.includes(keyword)
  );
}

function projectMatchesCategory(project, category) {
  if (category === "All") return true;

  const techStack = normalizeJsonArray(project.tech_stack).map((tech) =>
    tech.toLowerCase(),
  );

  return techStack.includes(category.toLowerCase());
}

export function ProjectsSection({ projects = [] }) {
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      return (
        projectMatchesSearch(project, searchValue) &&
        projectMatchesCategory(project, activeCategory)
      );
    });
  }, [projects, searchValue, activeCategory]);

  return (
    <section id="projects" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Projects"
          title="Project yang pernah saya buat"
          description="Cari project berdasarkan nama, deskripsi, atau teknologi yang digunakan."
        />

        <RevealOnScroll delay={120} className="mt-10">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-blue-950/20 backdrop-blur-2xl">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-blue-100/45" />

                <input
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Cari project..."
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-blue-100/35 focus:border-violet-300/30 focus:bg-white/[0.1]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {PROJECT_CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    size="sm"
                    variant={
                      activeCategory === category ? "default" : "outline"
                    }
                    onClick={() => setActiveCategory(category)}
                    className={
                      activeCategory === category
                        ? "rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/20"
                        : "rounded-full border-white/15 bg-white/[0.05] text-white hover:bg-white/[0.1] hover:text-white"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {filteredProjects.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <RevealOnScroll key={project.id} delay={index * 120}>
                <ProjectCard project={project} />
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-8 text-center text-blue-100/65 backdrop-blur-2xl">
            Project tidak ditemukan.
          </div>
        )}
      </div>
    </section>
  );
}
