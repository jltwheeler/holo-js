import React from 'react';
import { Box } from '@react-three/drei';

function Floor() {
  return (
    <Box args={[50, 1, 20]}>
      <meshPhysicalMaterial color="grey" />
    </Box>
  );
}

export default Floor;
