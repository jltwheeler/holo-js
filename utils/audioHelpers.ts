const fractionate = (val: number, minVal: number, maxVal: number): number => {
  return (val - minVal) / (maxVal - minVal);
};

export const modulate = (
  val: number,
  minVal: number,
  maxVal: number,
  outMin: number,
  outMax: number,
): number => {
  var fr = fractionate(val, minVal, maxVal);
  var delta = outMax - outMin;
  return outMin + fr * delta;
};

export const arrayAverage = (arr: Uint8Array): number => {
  var total = arr.reduce((sum, b) => {
    return sum + b;
  });
  return total / arr.length;
};

export const arrayMax = (arr: Uint8Array): number => {
  return arr.reduce((a, b) => {
    return Math.max(a, b);
  });
};
