"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircleMore, Share2 } from "lucide-react";

import { PERSONAL_INFO } from "@/lib/constants";
import { assetUrl } from "@/lib/supabase-storage";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ContactMessageForm } from "@/components/forms/ContactMessageForm";
import { CommentForm } from "@/components/forms/CommentForm";
import { CommentCard } from "@/components/cards/CommentCard";

const socialLinks = [
  {
    title: "LinkedIn",
    subtitle: "Rifqi Susanto",
    href: PERSONAL_INFO.linkedin,
    image: assetUrl("media/linkedin.png"),
  },
  {
    title: "GitHub",
    subtitle: "@ki1bot",
    href: PERSONAL_INFO.github,
    image: assetUrl("media/github.png"),
  },
  {
    title: "Instagram",
    subtitle: "@ki1bot_",
    href: PERSONAL_INFO.instagram,
    image: assetUrl("media/instagram.png"),
  },
  {
    title: "YouTube",
    subtitle: "@kibot7659",
    href: PERSONAL_INFO.youtube,
    image: assetUrl("media/youtube.png"),
  },
  {
    title: "Spotify",
    subtitle: "kibot",
    href: PERSONAL_INFO.spotify,
    image: assetUrl("media/Spotify.png"),
  },
  {
    title: "TikTok",
    subtitle: "@kiibott_",
    href: PERSONAL_INFO.tiktok,
    image: assetUrl("media/tiktok.png"),
  },
];

function SocialIcon({ item, className = "h-full w-full" }) {
  return (
    <img
      src={item.image}
      alt={item.title}
      className={`${className} object-contain`}
    />
  );
}

export function ContactSection({ comments = [] }) {
  const hubungiCardRef = useRef(null);
  const [commentsCardHeight, setCommentsCardHeight] = useState(null);

  useEffect(() => {
    const hubungiCard = hubungiCardRef.current;

    if (!hubungiCard) return;

    let animationFrameId = null;

    function syncCommentsCardHeight() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const isDesktop = window.innerWidth >= 1024;

        if (!isDesktop) {
          setCommentsCardHeight(null);
          return;
        }

        const nextHeight = Math.ceil(
          hubungiCard.getBoundingClientRect().height,
        );

        setCommentsCardHeight((currentHeight) => {
          if (
            typeof currentHeight === "number" &&
            Math.abs(currentHeight - nextHeight) <= 1
          ) {
            return currentHeight;
          }

          return nextHeight;
        });
      });
    }

    const resizeObserver = new ResizeObserver(syncCommentsCardHeight);
    resizeObserver.observe(hubungiCard);

    syncCommentsCardHeight();

    window.addEventListener("resize", syncCommentsCardHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncCommentsCardHeight);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section id="contact" className="border-t border-white/10 py-20 md:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 md:px-10">
        <RevealOnScroll className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-blue-100/70">
            Contact
          </p>

          <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
            Hubungi Saya
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-blue-100/78 md:text-lg">
            Punya pertanyaan atau ingin bekerja sama? Kirimkan pesan, dan saya
            akan membalas secepat mungkin.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid items-start gap-10 md:mt-20 md:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-20">
          <RevealOnScroll y={0} className="self-start">
            <div
              ref={hubungiCardRef}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-blue-950/20 backdrop-blur-xl sm:p-5 md:rounded-[1.75rem] md:p-7"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                    Hubungi
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-blue-100/70">
                    Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita
                    bicara.
                  </p>
                </div>

                <Share2 className="mt-1 size-5 shrink-0 text-violet-200" />
              </div>

              <div className="mt-8">
                <ContactMessageForm />
              </div>

              <div className="my-8 h-px bg-white/10" />

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-[2px] w-5 rounded-full bg-violet-400" />

                  <h4 className="text-lg font-semibold text-white">
                    Connect With Me
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
                  {socialLinks.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:-translate-y-1 hover:border-violet-300/20 hover:bg-white/10 lg:p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/12 p-2.5 lg:size-11">
                          <SocialIcon item={item} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white lg:text-base">
                            {item.title}
                          </p>

                          <p className="truncate text-xs text-blue-100/60 lg:text-sm">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll y={0} className="self-start">
            <div
              style={
                commentsCardHeight
                  ? {
                      height: `${commentsCardHeight}px`,
                    }
                  : undefined
              }
              className="flex overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-blue-950/20 backdrop-blur-xl sm:p-5 md:rounded-[1.75rem] md:p-7"
            >
              <div className="flex min-h-0 w-full flex-col">
                <div className="mb-6 flex shrink-0 items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/12 text-violet-200">
                    <MessageCircleMore className="size-5" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Comments{" "}
                      <span className="text-violet-300">
                        ({comments.length})
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="shrink-0 border-t border-white/10 pt-6">
                  <CommentForm />
                </div>

                <div className="mt-7 rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-3 lg:contents">
                  <div className="comment-scroll-area max-h-[330px] min-h-0 flex-1 space-y-4 overflow-y-auto pl-1 pr-5 sm:max-h-[380px] sm:pr-6 md:max-h-[430px] md:pr-6 lg:mt-7 lg:max-h-none lg:pl-0 lg:pr-2">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                      ))
                    ) : (
                      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-sm text-blue-100/60">
                        Belum ada komentar.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
