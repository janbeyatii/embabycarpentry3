'use client'

import { useRef, useCallback } from 'react'

export default function AboutVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleClick = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [])

  return (
    <div
      className="video-click-wrapper"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Tap to play or pause video"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <video
        ref={videoRef}
        src="/images/about-vid.mp4"
        loop
        muted
        autoPlay
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        aria-label="Embaby Carpentry at work"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  )
}
