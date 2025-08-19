import { useState, useRef } from 'react'

export function useVoiceRecorder() {
  const [recording, setRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunks = useRef<BlobPart[]>([])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mimeType =
      MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : ''
    const recorder = new MediaRecorder(stream, { mimeType })
    mediaRecorderRef.current = recorder

    chunks.current = []
    recorder.ondataavailable = e => chunks.current.push(e.data)
    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: recorder.mimeType })
      setAudioBlob(blob)
      setAudioUrl(URL.createObjectURL(blob))
    }

    recorder.start()
    setRecording(true)
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  const reset = () => {
    setAudioBlob(null)
    setAudioUrl(null)
  }

  return { recording, audioUrl, audioBlob, startRecording, stopRecording, reset }
}
