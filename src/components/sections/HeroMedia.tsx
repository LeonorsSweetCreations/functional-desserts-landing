"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Video } from "lucide-react";
import { IMAGES, HERO_VIDEO } from "@/config/site";
import { hero } from "@/content/copy";

/**
 * Hero visual. Shows the poster photo with a play button when a video id or
 * file exists, otherwise the poster alone. Loads the embed only after a click.
 */
export function HeroMedia() {
  const [play, setPlay] = useState(false);
  const hasEmbed = Boolean(HERO_VIDEO.youtubeId || HERO_VIDEO.vimeoId);
  const hasFile = Boolean(HERO_VIDEO.file);

  if (play && hasEmbed) {
    const src = HERO_VIDEO.youtubeId
      ? `https://www.youtube-nocookie.com/embed/${HERO_VIDEO.youtubeId}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${HERO_VIDEO.vimeoId}?autoplay=1`;
    return (
      <div className="aspect-video overflow-hidden rounded-[2rem] shadow-card-lg">
        <iframe src={src} title="Welcome video from Leonor" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="h-full w-full" />
      </div>
    );
  }

  if (hasFile) {
    return (
      <div className="aspect-video overflow-hidden rounded-[2rem] shadow-card-lg">
        <video src={HERO_VIDEO.file} controls playsInline preload="metadata" poster={IMAGES.heroPoster} className="h-full w-full object-cover">
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="photo-frame rounded-[2rem]">
        <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-card-lg ring-1 ring-black/5 lg:aspect-[4/4.6]">
          <Image
            src={IMAGES.heroPoster}
            alt={hero.mediaAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            priority
            className="object-cover object-[center_30%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-ink/55 via-transparent to-transparent" />

          <p className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-teal-dark shadow-card backdrop-blur sm:left-5 sm:top-5">
            {hero.mediaTag}
          </p>

          {hasEmbed ? (
            <button
              type="button"
              onClick={() => setPlay(true)}
              aria-label="Play welcome video"
              className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-teal-dark shadow-card-lg backdrop-blur transition-transform group-hover:scale-110"
            >
              <Play aria-hidden className="ml-1 h-8 w-8 fill-current" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Floating card: monthly live */}
      <div className="absolute -bottom-6 left-3 z-10 flex max-w-[16rem] items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-card-lg ring-1 ring-brand-linen sm:-left-6 sm:bottom-8">
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-pink">
          <Image src={IMAGES.leonorAvatar} alt="" fill sizes="48px" className="object-cover object-top" />
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
            <Video aria-hidden className="h-4 w-4 text-brand-rose" />
            {hero.liveBadge}
          </p>
          <p className="text-xs text-brand-muted">{hero.liveText}</p>
        </div>
      </div>
    </div>
  );
}
