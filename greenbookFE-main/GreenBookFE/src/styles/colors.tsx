const Colors = {
  light: "#EDF5E1",
  lightGreen: "#8ee4af",
  green: "#5CDB95",
  darkGreen: "#379683",
  dark: "#05386B",
};

const hexToRgb = (hex: string) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (result) {
    return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
      result[3],
      16
    )}`;
  } else {
    return null;
  }
};

export { Colors, hexToRgb };
