import { useRef, useState, useEffect } from 'react'

/**
 * Custom hook for managing audio playback state and controls
 * Prepares foundation for Phase 4 audio enhancements
 *
 * @param {string} src - Audio source URL
 * @returns {Object} Object containing:
 *   - audioRef: Reference to audio element
 *   - isPlaying: Current playback state
 *   - currentTime: Current playback position (seconds)
 *   - duration: Total audio duration (seconds)
 *   - error: Error state if any
 *   - play: Function to start playback
 *   - pause: Function to pause playback
 *   - seek: Function to seek to position
 */
export function useAudio(src) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Update duration when metadata loads
    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    // Update current time during playback
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    // Update playing state
    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    // Handle errors
    const handleError = (e) => {
      setError(e.type || 'Audio error')
      setIsPlaying(false)
    }

    // Handle ended
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    // Add event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  // Update src when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = src
      setCurrentTime(0)
      setIsPlaying(false)
      setError(null)
    }
  }, [src])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => {
        setError(e.message)
      })
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const seek = (time) => {
    if (audioRef.current && !isNaN(time)) {
      audioRef.current.currentTime = Math.min(time, duration)
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  return {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    error,
    play,
    pause,
    seek,
  }
}

export default useAudio
