"use client"

import { useState, useCallback, useRef } from "react"

interface YouTubeEmbedProps {
  videoId: string
  title: string
  duration?: string
}

export default function YouTubeEmbed({ videoId, title, duration }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const preconnected = useRef(false)

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`

  const warmConnections = useCallback(() => {
    if (preconnected.current) return
    preconnected.current = true
    const link = document.createElement("link")
    link.rel = "preconnect"
    link.href = "https://www.youtube-nocookie.com"
    document.head.appendChild(link)
  }, [])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
  }, [])

  if (isPlaying) {
    return (
      <div
        className="relative w-full overflow-hidden rounded-xl shadow-2xl"
        style={{ aspectRatio: "16/9" }}
      >
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      onPointerOver={warmConnections}
      aria-label={`${title} – video afspelen`}
      className="group relative block w-full cursor-pointer overflow-hidden rounded-xl shadow-2xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      style={{ aspectRatio: "16/9" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />

      <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/40" />

      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <span
            className="absolute inset-0 rounded-full bg-primary/30 blur-md transition-all duration-300 group-hover:scale-125 group-hover:bg-primary/40"
            aria-hidden
          />

          <span
            className="absolute -inset-3 rounded-full border-2 border-white/20 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
            aria-hidden
          />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-110 sm:h-[72px] sm:w-[72px]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="ml-1 h-7 w-7 text-white sm:h-8 sm:w-8"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {duration && (
        <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium tabular-nums text-white/90 backdrop-blur-sm sm:bottom-4 sm:right-4 sm:text-sm">
          {duration}
        </span>
      )}
    </button>
  )
}
