"use client";

import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@thaiboran/ui";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function OrderEntryModalShell({
  children,
  description,
  initialFocusRef,
  onClose,
  open,
  size = "md",
  title,
}: {
  children: ReactNode;
  description: string;
  initialFocusRef?: { readonly current: HTMLElement | null };
  onClose: () => void;
  open: boolean;
  size?: "md" | "wide";
  title: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = `${toIdSlug(title)}-title`;
  const descriptionId = `${toIdSlug(title)}-description`;

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousActiveElement = document.activeElement;
    const focusTarget =
      initialFocusRef?.current ??
      dialogRef.current?.querySelector<HTMLElement>(focusableSelector);

    window.requestAnimationFrame(() => {
      focusTarget?.focus();
    });

    return () => {
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [initialFocusRef, open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    ).filter((element) => element.offsetParent !== null);

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid items-end overflow-x-hidden bg-black/45 p-0 sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className={`max-h-[100dvh] w-full max-w-full overflow-hidden rounded-t-lg border border-border bg-surface text-foreground shadow-shell outline-none sm:mx-auto sm:max-h-[calc(100vh-2rem)] sm:rounded-lg ${
          size === "wide" ? "sm:max-w-5xl" : "sm:max-w-3xl"
        }`}
        onKeyDown={handleKeyDown}
        ref={dialogRef}
        role="dialog"
      >
        <div className="flex min-w-0 items-start justify-between gap-4 border-b border-border bg-subtle px-4 py-3">
          <div className="min-w-0">
            <h2
              className="text-base font-extrabold leading-7 text-foreground"
              id={titleId}
            >
              {title}
            </h2>
            <p
              className="mt-1 break-words text-sm font-semibold leading-6 text-muted-foreground"
              id={descriptionId}
            >
              {description}
            </p>
          </div>
          <Button
            aria-label={`ปิด ${title}`}
            className="shrink-0"
            onClick={onClose}
            size="sm"
            type="button"
            variant="outline"
          >
            <X aria-hidden className="h-4 w-4" />
          </Button>
        </div>
        <div className="max-h-[calc(100dvh-92px)] min-w-0 overflow-y-auto overflow-x-hidden p-4 sm:max-h-[calc(100vh-8rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}

function toIdSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9ก-๙]+/gi, "-")
    .replace(/^-|-$/g, "");
}
