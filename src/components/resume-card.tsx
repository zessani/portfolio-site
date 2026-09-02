"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Cards with a description expand in place; the company link (if any) is a
  // separate affordance next to the title so it stays reachable.
  if (!description) {
    const body = (
      <ResumeCardBody
        logoUrl={logoUrl}
        altText={altText}
        title={title}
        subtitle={subtitle}
        href={undefined}
        badges={badges}
        period={period}
        isExpanded={false}
        isExpandable={false}
      />
    );

    if (!href) return body;

    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer"
      >
        {body}
      </Link>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      className="block cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
    >
      <ResumeCardBody
        logoUrl={logoUrl}
        altText={altText}
        title={title}
        subtitle={subtitle}
        href={href}
        badges={badges}
        period={period}
        isExpanded={isExpanded}
        isExpandable
      >
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? "auto" : 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-2 overflow-hidden text-xs sm:text-sm"
        >
          {description}
        </motion.div>
      </ResumeCardBody>
    </div>
  );
};

interface ResumeCardBodyProps
  extends Omit<ResumeCardProps, "description" | "href"> {
  href?: string;
  isExpanded: boolean;
  isExpandable: boolean;
  children?: React.ReactNode;
}

const ResumeCardBody = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  isExpanded,
  isExpandable,
  children,
}: ResumeCardBodyProps) => {
  return (
    <Card className="flex border-l-2 border-l-transparent hover:border-l-orange-500 transition-colors duration-300">
        <div className="flex-none">
          <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                {title}
                {badges && (
                  <span className="inline-flex gap-x-1">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="align-middle text-xs"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                {href && (
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${title} website`}
                    onClick={(e) => e.stopPropagation()}
                    className="ml-1.5 text-muted-foreground opacity-0 transition-opacity duration-300 hover:text-orange-500 focus-visible:opacity-100 group-hover:opacity-100"
                  >
                    <ExternalLinkIcon className="size-3" />
                  </Link>
                )}
                {isExpandable && (
                  <ChevronRightIcon
                    className={cn(
                      "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                      isExpanded ? "rotate-90" : "rotate-0"
                    )}
                  />
                )}
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {period}
              </div>
            </div>
            {subtitle && <div className="font-sans text-xs">{subtitle}</div>}
          </CardHeader>
          {children}
        </div>
      </Card>
  );
};
