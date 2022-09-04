import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import type { NextPage } from 'next';

import Audio from '../components/audio';
import Scene from '../components/scene';
import Floor from '../components/models/floor';
import Holo from '../components/models/holo';
import Raver from '../components/models/raver';
import { getRandomInteger } from '../utils';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const [analyser, setAnalyser] = useState<AnalyserNode | undefined>();
  const [dataArray, setDataArray] = useState<Uint8Array | undefined>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [source, setSource] = useState<MediaElementAudioSourceNode | undefined>();
  const [raverProps, setRaverProps] = useState<
    | {
        key: number;
        startX: number;
        startY: number;
        jumpHeight: number;
      }[]
    | null
  >(null);

  useEffect(() => {
    const props = Array.from(Array(50)).map((_, idx) => {
      const startX = getRandomInteger(-20, 20);
      const startY = getRandomInteger(5, 20) + 10;
      const jumpHeight = getRandomInteger(2, 5) / 250;
      return { key: idx, startX, startY, jumpHeight };
    });

    setRaverProps(props);
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-900">
      <Canvas
        shadows={true}
        camera={{
          position: [0, 25, 35],
        }}
      >
        <Stage adjustCamera={false}>
          <Scene />
          <Floor />
          <Holo analyser={analyser} dataArray={dataArray} isPlaying={isPlaying} />

          {raverProps &&
            raverProps.map(({ key, startX, startY, jumpHeight }) => (
              <Raver key={key} startX={startX} startY={startY} jumpHeight={jumpHeight} />
            ))}
        </Stage>

        <OrbitControls />
      </Canvas>
      <Audio
        source={source}
        setSource={setSource}
        setAnalyser={setAnalyser}
        setDataArray={setDataArray}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

export default Home;
