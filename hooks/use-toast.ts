"use client";

import { useState } from "react";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

let toastCounter = 0;
const listeners: ((toasts: Toast[]) => void)[] = [];
let toastState: Toast[] = [];

function updateToasts(newToasts: Toast[]) {
  toastState = newToasts;
  listeners.forEach(l => l(newToasts));
}

export function toast(opts: Omit<Toast, "id">) {
  const id = String(++toastCounter);
  updateToasts([...toastState, { id, ...opts }]);
  setTimeout(() => {
    updateToasts(toastState.filter(t => t.id !== id));
  }, 3000);
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>(toastState);

  const cb = (t: Toast[]) => setToasts(t);
  if (!listeners.includes(cb)) listeners.push(cb);

  return { toasts, toast };
}
