/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function';

type RoomParams = {
  id: string;
};

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  async function handleUploadAudio(blob: Blob) {
    const formData = new FormData();

    formData.append('file', blob, 'audio.webm');

    const response = await fetch(
      `http://localhost:3333/rooms/${params.id}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    );

    await response.json();
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        handleUploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log('gravação iniciada');
    };

    recorder.current.onstop = () => {
      console.log('gravação cancelada/pausada');

      stopRecording();
    };

    recorder.current.start();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('Seu navegador não suporta gravação!');
      return;
    }
    setIsRecording(true);

    try {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100,
        },
      });

      createRecorder(audio);

      intervalRef.current = setInterval(() => {
        recorder.current?.stop();

        createRecorder(audio);
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  }

  if (!params.id) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex h-screen items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording}>Pausar áudio</Button>
      ) : (
        <Button onClick={startRecording}>Gravar áudio</Button>
      )}

      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  );
}
