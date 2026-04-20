"use client";

import { useEffect, useState } from "react";
import css from "./toast-notification.module.css";

export type ToastType = "success" | "error";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastNotificationProps {
  toast: Toast | null;
  onClose: () => void;
}

export default function ToastNotification({
  toast,
  onClose,
}: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div
      className={`${css.container} ${css[toast.type]} ${isVisible ? css.visible : ""}`}
      role="status"
      aria-live="polite">
      <p className={css.message}>{toast.message}</p>
    </div>
  );
}
