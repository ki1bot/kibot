"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Mail, Sparkles } from "lucide-react";

import { PERSONAL_INFO } from "@/lib/constants";
import { assetUrl } from "@/lib/supabase-storage";

const heroStacks = ["React", "JavaScript", "Node.js", "Tailwind"];

const heroRoles = ["Software Engineer", "UI/UX Designer"];

const heroSocials = [
  {
    title: "GitHub",
    href: PERSONAL_INFO.github,
    image: assetUrl("media/github.png"),
  },
  {
    title: "LinkedIn",
    href: PERSONAL_INFO.linkedin,
    image: assetUrl("media/linkedin.png"),
  },
  {
    title: "Instagram",
    href: PERSONAL_INFO.instagram,
    image: assetUrl("media/instagram.png"),
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function resetGifMotion(element) {
  if (!(element instanceof HTMLElement)) return;

  element.classList.remove("is-gif-active");
  element.style.setProperty("--gif-x", "0px");
  element.style.setProperty("--gif-y", "0px");
  element.style.setProperty("--gif-rotate-x", "0deg");
  element.style.setProperty("--gif-rotate-y", "0deg");
  element.style.setProperty("--gif-scale", "1");
  element.style.setProperty("--gif-spot-x", "50%");
  element.style.setProperty("--gif-spot-y", "50%");
  element.style.setProperty("--gif-glow-opacity", "0");
}

function useTypewriter(
  words,
  typingSpeed = 75,
  deletingSpeed = 45,
  pause = 1500,
) {
  const firstWord = words[0] || "";
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState(firstWord);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || words.length === 0) {
      return;
    }

    const currentWord = words[wordIndex] || "";

    if (!isDeleting && displayText === currentWord) {
      const pauseTimeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, pause);

      return () => {
        window.clearTimeout(pauseTimeout);
      };
    }

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
          return;
        }

        const nextText = currentWord.slice(0, displayText.length - 1);
        setDisplayText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [
    words,
    wordIndex,
    displayText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pause,
  ]);

  return displayText;
}

export function HeroSection() {
  const typedRole = useTypewriter(heroRoles);

  function handleGifPointerMove(event) {
    const element = event.currentTarget;

    if (!(element instanceof HTMLElement)) return;

    const rect = element.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) return;

    const pointerX = clamp(event.clientX - rect.left, 0, rect.width);
    const pointerY = clamp(event.clientY - rect.top, 0, rect.height);

    const normalizedX = pointerX / rect.width - 0.5;
    const normalizedY = pointerY / rect.height - 0.5;

    const translateX = normalizedX * 34;
    const translateY = normalizedY * 26;
    const rotateX = normalizedY * -9;
    const rotateY = normalizedX * 12;

    element.classList.add("is-gif-active");
    element.style.setProperty("--gif-x", `${translateX.toFixed(2)}px`);
    element.style.setProperty("--gif-y", `${translateY.toFixed(2)}px`);
    element.style.setProperty("--gif-rotate-x", `${rotateX.toFixed(2)}deg`);
    element.style.setProperty("--gif-rotate-y", `${rotateY.toFixed(2)}deg`);
    element.style.setProperty("--gif-scale", "1.055");
    element.style.setProperty(
      "--gif-spot-x",
      `${(pointerX / rect.width) * 100}%`,
    );
    element.style.setProperty(
      "--gif-spot-y",
      `${(pointerY / rect.height) * 100}%`,
    );
    element.style.setProperty("--gif-glow-opacity", "1");
  }

  function handleGifPointerLeave(event) {
    resetGifMotion(event.currentTarget);
  }

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_38%,rgba(124,58,237,0.18),transparent_28%),radial-gradient(circle_at_82%_38%,rgba(14,165,233,0.1),transparent_30%)] md:bg-[radial-gradient(circle_at_18%_38%,rgba(124,58,237,0.22),transparent_28%),radial-gradient(circle_at_82%_38%,rgba(14,165,233,0.14),transparent_30%)]" />

      <div className="mx-auto grid min-h-screen max-w-[1320px] items-center gap-10 px-4 pb-20 pt-28 sm:px-6 sm:pt-32 md:px-10 md:pb-28 md:pt-44 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28 lg:pt-56 xl:gap-48">
        <div className="order-1 opacity-100">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-2 text-xs font-medium text-violet-200 shadow-lg shadow-violet-500/10 backdrop-blur-xl sm:px-4 sm:text-sm">
            <Sparkles className="size-4 text-blue-300" />
            Ready to Innovate
          </div>

          <h1 className="mt-7 max-w-2xl text-[2.75rem] font-black leading-[1.03] tracking-tight text-white min-[390px]:text-5xl sm:text-6xl md:mt-10 md:text-7xl">
            Fullstack{" "}
            <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Developer
            </span>
          </h1>

          <div className="mt-5 min-h-[40px] text-xl font-medium text-white sm:text-2xl md:mt-7 md:min-h-[56px] md:text-3xl">
            <span>{typedRole}</span>
            <span className="ml-1 animate-pulse text-violet-400">|</span>
          </div>

          <p className="mt-6 max-w-xl text-base leading-8 text-blue-100/75 sm:text-lg md:mt-8">
            Menciptakan website yang inovatif, fungsional, dan user-friendly
            untuk solusi digital.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 md:mt-9 md:gap-4">
            {heroStacks.map((stack) => (
              <span
                key={stack}
                className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-blue-100/85 shadow-lg shadow-blue-950/10 backdrop-blur-xl sm:text-sm"
              >
                {stack}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-row sm:gap-4 md:mt-10">
            <a
              href="/projects"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-violet-400/20 bg-slate-950/80 px-6 text-sm font-semibold text-white shadow-xl shadow-violet-950/30 transition hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-600/20 sm:w-auto sm:min-w-40"
            >
              Projects
              <ExternalLink className="size-4" />
            </a>

            <a
              href="/contact"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-violet-400/20 bg-slate-950/80 px-6 text-sm font-semibold text-white shadow-xl shadow-violet-950/30 transition hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-600/20 sm:w-auto sm:min-w-40"
            >
              Contact
              <Mail className="size-4" />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4 sm:gap-6 md:mt-16 md:gap-7">
            {heroSocials.map((social) => (
              <a
                key={social.title}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.title}
                className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-lg shadow-violet-950/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-violet-300/25 hover:bg-violet-500/10 sm:size-12"
              >
                <img
                  src={social.image}
                  alt={social.title}
                  width="32"
                  height="32"
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="order-2 block lg:translate-x-16 xl:translate-x-20">
          <div
            onPointerMove={handleGifPointerMove}
            onPointerLeave={handleGifPointerLeave}
            onPointerCancel={handleGifPointerLeave}
            className="hero-gif-field relative mx-auto flex w-full max-w-[320px] cursor-pointer items-center justify-center bg-transparent sm:max-w-[420px] md:max-w-[520px] lg:max-w-[720px]"
          >
            <img
              src={assetUrl("projects/coding.gif")}
              alt="Frontend development illustration"
              className="hero-gif-image relative z-10 w-full max-w-[320px] object-contain sm:max-w-[420px] md:max-w-[520px] lg:max-w-[690px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
