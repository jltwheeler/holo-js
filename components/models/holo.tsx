import React, { useRef } from 'react';
import { createNoise3D } from 'simplex-noise';
import { Mesh, Vector3 } from 'three';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import chunk from 'lodash/chunk';
import flatMap from 'lodash/flatMap';
import { arrayAverage, arrayMax, modulate } from '../../utils';

const noise3D = createNoise3D();

interface Props {
  analyser: AnalyserNode | undefined;
  dataArray: Uint8Array | undefined;
  isPlaying: boolean;
}

function Holo({ analyser, dataArray, isPlaying }: Props) {
  const ref = useRef<Mesh>();

  useFrame(() => {
    if (!analyser || !dataArray) return;
    if (!ref.current) return;

    if (!isPlaying) return;

    analyser.getByteFrequencyData(dataArray);

    const lowerHalfArray = dataArray.slice(0, dataArray.length / 2 - 1);
    const upperHalfArray = dataArray.slice(dataArray.length / 2 - 1, dataArray.length - 1);

    const lowerMax = arrayMax(lowerHalfArray);
    const upperAvg = arrayAverage(upperHalfArray);

    const lowerMaxFr = lowerMax / lowerHalfArray.length;
    const upperAvgFr = upperAvg / upperHalfArray.length;
    const bassFr = modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8);
    const trebFr = modulate(upperAvgFr, 0, 1, 0, 4);

    const offset = ref.current?.geometry.parameters.radius;
    const amp = 5;
    const rf = 0.0001;

    const clone = ref.current.geometry.attributes['position'].clone();
    const verts = chunk(Array.from(ref.current.geometry.attributes.position.array), 3).map(
      (verts) => {
        const time = window.performance.now();
        const vec = new Vector3(verts[0], verts[2], verts[1]);

        vec.normalize();

        const factor =
          offset +
          bassFr +
          noise3D(vec.x + time * rf * 3, vec.z + time * rf * 4, vec.y + time * rf * 5) *
            amp *
            trebFr;

        vec.multiplyScalar(factor);
        return [vec.x, vec.z, vec.y];
      },
    );
    clone.array = new Float32Array(flatMap(verts));
    ref.current.geometry.setAttribute('position', clone);
  });

  return (
    <Sphere ref={ref} position={[0, 15, -10]} args={[5, 40, 40]}>
      <meshLambertMaterial wireframe={true} color="hotpink" wireframeLinewidth={10} />
    </Sphere>
  );
}

export default Holo;
