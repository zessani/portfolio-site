"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { useRef, useState } from "react";

const BLUR_FADE_DELAY = 0.04;

export function ProjectGrid() {
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const featured = DATA.projects.filter((p) => p.featured);
  const rest = DATA.projects.filter((p) => !p.featured);
  const visible = showAll ? [...featured, ...rest] : featured;

  const toggle = () => {
    if (showAll) {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowAll((v) => !v);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto scroll-mt-24"
      >
        {visible.map((project, id) => (
          <BlurFade
            key={project.title}
            delay={
              id < featured.length
                ? BLUR_FADE_DELAY * 12 + id * 0.05
                : (id - featured.length) * 0.05
            }
          >
            <ProjectCard
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          </BlurFade>
        ))}
      </div>
      {rest.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={toggle}
          aria-expanded={showAll}
          className="hover:border-orange-500"
        >
          {showAll ? "Show fewer projects" : `Show all projects (${DATA.projects.length})`}
        </Button>
      )}
    </div>
  );
}
