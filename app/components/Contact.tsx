"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-line bg-surface-2 px-4 py-3.5 text-[14px] text-white outline-none transition-colors placeholder:text-faint focus:border-brand-blue/50";

function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMsg("");

      if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
        setStatus("error");
        setErrorMsg("Please fill in your name, email, and message.");
        return;
      }
      if (!executeRecaptcha) {
        setStatus("error");
        setErrorMsg("Captcha not ready yet — please try again in a moment.");
        return;
      }

      setStatus("submitting");
      try {
        const token = await executeRecaptcha("contact");
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, token }),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setStatus("error");
          setErrorMsg(data.error ?? "Something went wrong. Please try again.");
          return;
        }

        setStatus("success");
        setForm({ name: "", email: "", company: "", message: "" });
      } catch {
        setStatus("error");
        setErrorMsg("Network error. Please try again.");
      }
    },
    [executeRecaptcha, form],
  );

  const submitting = status === "submitting";
  const success = status === "success";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-6 flex max-w-[460px] flex-col gap-3"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={update("name")}
          disabled={submitting}
          className={`flex-1 ${inputClass}`}
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={update("email")}
          disabled={submitting}
          className={`flex-1 ${inputClass}`}
        />
      </div>
      <input
        type="text"
        name="company"
        placeholder="Company or project name"
        value={form.company}
        onChange={update("company")}
        disabled={submitting}
        className={inputClass}
      />
      <textarea
        name="message"
        placeholder="What are you building? What stage are you at, and what kind of help are you looking for?"
        value={form.message}
        onChange={update("message")}
        disabled={submitting}
        className={`min-h-[110px] resize-none ${inputClass}`}
      />

      {errorMsg && (
        <p className="text-left text-[13px] text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={submitting || success}
        className={`cursor-pointer rounded-lg border-none p-3.5 font-display text-[15px] font-bold tracking-[0.02em] text-charcoal transition hover:-translate-y-px hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-80 ${
          success ? "grad-bg" : "bg-brand-blue"
        }`}
      >
        {submitting
          ? "Sending…"
          : success
            ? "Message sent ✓"
            : "Send message"}
      </button>

      <p className="text-left text-[11px] leading-[1.5] text-faint">
        Protected by reCAPTCHA — Google&apos;s{" "}
        <a
          href="https://policies.google.com/privacy"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms
        </a>{" "}
        apply.
      </p>
    </form>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line bg-surface px-6 py-30"
    >
      <div className="relative z-[1] mx-auto max-w-[680px] text-center">
        <Image
          src="/iterra_labs_icon only.png"
          alt="Iterra Labs"
          width={36}
          height={100}
          className="animate-float-y mx-auto mb-10 block h-[100px] w-auto"
        />

        <h2 className="mb-5 font-display text-[clamp(36px,6vw,64px)] font-extrabold leading-none tracking-[-0.025em] text-white">
          Let&apos;s start a<br />
          <span className="grad-text">conversation.</span>
        </h2>

        <p className="mb-13 text-[16px] leading-[1.7] text-muted">
          Tell us what you&apos;re building. We&apos;ll tell you honestly how we
          can help — no pitch, no pressure, just an open 30-minute call with a
          founder.
        </p>

        <GoogleReCaptchaProvider
          reCaptchaKey={SITE_KEY}
          useRecaptchaNet
          scriptProps={{ async: true, defer: true }}
        >
          <ContactForm />
        </GoogleReCaptchaProvider>
      </div>
    </section>
  );
}
