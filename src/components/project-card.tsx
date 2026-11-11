import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  award?: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  award,
  tags,
  link,
  image,
  video,
  links,
}: Props) {
  const card = (
    <Card
      className={cn(
        "relative flex flex-col overflow-hidden border border-transparent transition-all duration-300 ease-out h-full",
        href &&
          "hover:border-orange-500 hover:shadow-lg motion-safe:hover:-translate-y-0.5 cursor-pointer"
      )}
    >
        {href && (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} on GitHub`}
            className="absolute inset-0 z-0"
          />
        )}
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
        <CardHeader className="px-2">
          <div className="space-y-1">
            <div className="mt-1 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">{title}</CardTitle>
                {award && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-orange-500/40 px-1.5 py-0.5 text-[10px] font-medium leading-none text-orange-600 dark:text-orange-400">
                    <Trophy className="size-2.5" aria-hidden="true" />
                    {award}
                  </span>
                )}
              </div>
              {links && links.length > 0 && (
                <div className="flex shrink-0 items-center gap-3">
                  {links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 inline-flex items-center gap-0.5 text-xs text-muted-foreground transition-colors duration-200 hover:text-orange-500"
                    >
                      {link.type}
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <time className="font-sans text-xs">{dates}</time>
            <div className="hidden font-sans text-xs underline print:visible">
              {link?.replace("https://", "").replace("www.", "").replace("/", "")}
            </div>
            <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
              {description}
            </Markdown>
          </div>
        </CardHeader>
        <CardContent className="mt-auto flex flex-col px-2">
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags?.map((tag) => (
                <Badge
                  className="px-1 py-0 text-[10px]"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="px-2 pb-2" />
    </Card>
  );

  return card;
}
