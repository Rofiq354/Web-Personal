"use client";

import { cn } from "@/lib/utils";
import type { TechStack } from "@/types";
import Image from "next/image";

interface TechBadgeProps {
  tech: TechStack;
  showProficiency?: boolean;
}

export function TechBadge({ tech, showProficiency = false }: TechBadgeProps) {
  return (
    <div
      className={cn(
        "group relative flex items-center gap-2.5 px-4 py-2.5 bg-card border border-border rounded-xl hover:border-amber/50 hover:bg-muted/50 transition-all duration-200 cursor-default",
        tech.is_primary && "border-amber/30 bg-amber/5 dark:bg-amber/5",
      )}
    >
      {/* Icon */}
      {tech.icon_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <Image
          src={`${tech.icon_url}`}
          alt={`${tech.name || "Tech Icon"}`}
          width={20}
          priority={true}
          height={20}
          sizes="20px"
          className="w-5 h-5 object-contain"
        />
      ) : (
        <div className="w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
          {tech.name.charAt(0)}
        </div>
      )}

      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground leading-none">
          {tech.name}
        </span>
        {tech.years_experience && (
          <span className="text-xs text-muted-foreground mt-0.5">
            {tech.years_experience}yr
          </span>
        )}
      </div>

      {/* Proficiency indicator */}
      {showProficiency && (
        <div className="ml-2 w-12 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-amber rounded-full transition-all duration-500"
            style={{ width: `${tech.proficiency}%` }}
          />
        </div>
      )}
    </div>
  );
}
