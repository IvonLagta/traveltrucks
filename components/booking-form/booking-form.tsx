"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/button/button";
import { createBookingRequest } from "@/lib/camperApi";
import css from "./booking-form.module.css";

interface BookingFormProps {
  camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      setMessage(response.message || "Booking request sent successfully!");
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Error sending request. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.description}>
        {" "}
        Stay connected! We are here to help you.{" "}
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

      {status === "success" && <p className={css.success}>{message}</p>}
      {status === "error" && <p className={css.error}>{message}</p>}

      <Button
        type="submit"
        disabled={status === "loading"}
        variant="mainBtn"
        className={css.submitButton}>
        {status === "loading" ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}
