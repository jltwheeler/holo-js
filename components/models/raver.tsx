import React, { useRef } from 'react';
import { Cone, Cylinder, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Mesh } from 'three';

interface props {
  startX: number;
  startY: number;
  jumpHeight: number;
}

function Raver({ startX, startY, jumpHeight }: props) {
  const radius = 0.5;

  const ref = useRef<Mesh>(null);

  const { y } = useSpring({
    loop: { reverse: true },
    from: { y: -jumpHeight },
    to: { y: jumpHeight },
  });

  useFrame(() => {
    if (!ref.current) return;

    ref.current.position.y += y.get();
  });

  return (
    <animated.group ref={ref} position={[startX, 3, startY]}>
      <Sphere args={[radius, 10, 10]}>
        <meshPhysicalMaterial color="green" />
      </Sphere>
      <Cone args={[0.75, 1.5, 10]} position={[0, -1.25, 0]}>
        <meshPhysicalMaterial color="green" />
      </Cone>
      <Cylinder args={[0.1, 0.1, 0.75]} position={[0.5, -1, 0]}>
        <meshPhysicalMaterial color="green" />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 0.75]} position={[-0.5, -1, 0]}>
        <meshPhysicalMaterial color="green" />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 1]} position={[-0.25, -2.5, 0]}>
        <meshPhysicalMaterial color="green" />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 1]} position={[0.25, -2.5, 0]}>
        <meshPhysicalMaterial color="green" />
      </Cylinder>
    </animated.group>
  );
}
export default Raver;
