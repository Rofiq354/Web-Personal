"use client";

import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-9999 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map(({ id, title, description, variant }) => (
        <div
          key={id}
          className={`
            px-4 py-3 rounded-xl border shadow-lg text-sm animate-fade-up
            ${
              variant === "destructive"
                ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
                : "bg-card border-border text-foreground"
            }
          `}
        >
          {title && <p className="font-medium">{title}</p>}
          {description && (
            <p className="text-muted-foreground text-xs mt-0.5">
              {description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
