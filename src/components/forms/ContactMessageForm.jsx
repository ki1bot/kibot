"use client";

import { useMemo, useState } from "react";
import { Loader2, Mail, MessageSquareText, Send, User } from "lucide-react";

import { Button } from "@/components/ui/button";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactMessageForm() {
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = useMemo(() => {
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    return Boolean(name && email && message && isValidEmail(email));
  }, [form]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (feedback) {
      setFeedback("");
      setFeedbackType("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    setFeedback("");
    setFeedbackType("");

    if (!name || !email || !message) {
      setFeedback("Nama, email, dan pesan wajib diisi.");
      setFeedbackType("error");
      return;
    }

    if (!isValidEmail(email)) {
      setFeedback("Format email tidak valid.");
      setFeedbackType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Pesan gagal dikirim. Coba lagi nanti.",
        );
      }

      setFeedback(result?.message || "Pesan berhasil dikirim ke Gmail.");
      setFeedbackType("success");
      setForm(initialForm);
    } catch (error) {
      setFeedback(error.message || "Pesan gagal dikirim. Coba lagi nanti.");
      setFeedbackType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-blue-100/40" />

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama Anda"
          autoComplete="name"
          className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] pl-11 pr-4 text-sm font-medium text-white outline-none transition placeholder:text-blue-100/40 focus:border-violet-300/40 focus:bg-white/[0.1] sm:h-14"
        />
      </div>

      <div className="relative">
        <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-blue-100/40" />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Anda"
          autoComplete="email"
          className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] pl-11 pr-4 text-sm font-medium text-white outline-none transition placeholder:text-blue-100/40 focus:border-violet-300/40 focus:bg-white/[0.1] sm:h-14"
        />
      </div>

      <div className="relative">
        <MessageSquareText className="pointer-events-none absolute left-4 top-4 size-4 text-blue-100/40" />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Pesan Anda"
          rows={5}
          className="min-h-[120px] w-full resize-none rounded-xl border border-white/15 bg-white/[0.07] py-4 pl-11 pr-4 text-sm font-medium text-white outline-none transition placeholder:text-blue-100/40 focus:border-violet-300/40 focus:bg-white/[0.1]"
        />
      </div>

      {feedback ? (
        <div
          className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
            feedbackType === "success"
              ? "border-emerald-300/20 bg-emerald-500/10 text-emerald-100"
              : "border-red-300/20 bg-red-500/10 text-red-100"
          }`}
        >
          {feedback}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        className="h-12 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-bold text-white shadow-xl shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:h-14"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Mengirim...
          </>
        ) : (
          <>
            <Send className="size-4" />
            Kirim Pesan
          </>
        )}
      </Button>
    </form>
  );
}
