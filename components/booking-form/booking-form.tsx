"use client";

import { FormEvent, useState } from "react";
import { createBookingRequest } from "@/lib/camperApi";
import css from "./booking-form.module.css";

interface BookingFormProps {
  camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await createBookingRequest(camperId, {
        name: name.trim(),
        email: email.trim(),
      });
      setStatus("success");
      setMessage(response.message || "Бронювання успішно надіслано!");
      setName("");
      setEmail("");
      setDate("");
    } catch {
      setStatus("error");
      setMessage("Помилка надсилання. Спробуйте ще раз.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <h3 className={css.title}>Забронювати</h3>

      <label className={css.field}>
        <span className={css.label}>Ім&apos;я</span>
        <input
          type="text"
          required
          placeholder="Іван Петренко"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={css.input}
        />
      </label>

      <label className={css.field}>
        <span className={css.label}>Email</span>
        <input
          type="email"
          required
          placeholder="ivan@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={css.input}
        />
      </label>

      <label className={css.field}>
        <span className={css.label}>Дата бронювання</span>
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          className={css.input}
        />
      </label>

      {status === "success" && <p className={css.success}>{message}</p>}
      {status === "error" && <p className={css.error}>{message}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className={css.submitButton}>
        {status === "loading" ? "Надсилання..." : "Надіслати запит"}
      </button>
    </form>
  );
}
