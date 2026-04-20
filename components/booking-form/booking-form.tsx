"use client";

import { useState, useCallback, type FormEvent } from "react";
import Button from "@/components/button/button";
import ToastNotification, {
  type Toast,
} from "@/components/toast-notification/toast-notification";
import { createBookingRequest } from "@/lib/api/clientApi";
import type { BookingFormProps } from "@/types/types";
import css from "./booking-form.module.css";

export default function BookingForm({ camperId }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsLoading(true);

    try {
      const response = await createBookingRequest(camperId, {
        name: name.trim(),
        email: email.trim(),
      });
      setToast({
        id: Date.now().toString(),
        message: response.message || "Booking request sent successfully!",
        type: "success",
      });
      setName("");
      setEmail("");
    } catch {
      setToast({
        id: Date.now().toString(),
        message: "Error sending request. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <h3 className={css.title}>Book your campervan now</h3>
        <p className={css.description}>
          Stay connected! We are here to help you.
        </p>
        <ul className={css.inputList}>
          <li className={css.inputItem}>
            <label className={css.field}>
              <input
                type="text"
                required
                placeholder="Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={css.input}
              />
            </label>
          </li>
          <li className={css.inputItem}>
            <label className={css.field}>
              <input
                type="email"
                required
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={css.input}
              />
            </label>
          </li>
        </ul>

        <Button
          type="submit"
          disabled={isLoading}
          variant="mainBtn"
          className={css.submitButton}>
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </form>
      <ToastNotification toast={toast} onClose={closeToast} />
    </>
  );
}
