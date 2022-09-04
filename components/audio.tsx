import React, { Dispatch, SetStateAction, useRef } from 'react';

interface Props {
  setAnalyser: Dispatch<SetStateAction<AnalyserNode | undefined>>;
  setDataArray: Dispatch<SetStateAction<Uint8Array | undefined>>;
  setSource: Dispatch<SetStateAction<MediaElementAudioSourceNode | undefined>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  source: MediaElementAudioSourceNode | undefined;
}

function Audio({ setAnalyser, setDataArray, setSource, setIsPlaying, source }: Props) {
  const ref = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (!ref.current) return;

    setIsPlaying(true);
    if (source) return;

    const audioContext = new AudioContext();
    const src = audioContext.createMediaElementSource(ref.current);
    const analyser = audioContext.createAnalyser();

    setSource(src);
    setAnalyser(analyser);

    src.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 512;

    const bufferLength = analyser.frequencyBinCount;
    setDataArray(new Uint8Array(bufferLength));
  };

  return (
    <audio
      ref={ref}
      src="./Pendulum - Tarantula.mp3"
      className="absolute z-10 bottom-0 left-0"
      controls
      onPlay={handlePlay}
      onPause={() => setIsPlaying(false)}
    ></audio>
  );
}

export default Audio;
