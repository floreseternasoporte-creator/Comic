export function normalizeRotation(value) {
  const degrees = Number(value) || 0;
  return ((degrees % 360) + 360) % 360;
}

export function movePageItem(items, index, direction) {
  const destination = index + direction;
  if (!Array.isArray(items) || index < 0 || index >= items.length || destination < 0 || destination >= items.length) {
    return Array.isArray(items) ? [...items] : [];
  }
  const next = [...items];
  [next[index], next[destination]] = [next[destination], next[index]];
  return next;
}

export function nextCropMode(current) {
  const modes = ["original", "portrait", "square"];
  const index = modes.indexOf(current);
  return modes[(index + 1 + modes.length) % modes.length];
}

export function getCropBox(width, height, mode) {
  if (mode === "square") {
    const size = Math.min(width, height);
    return { x: (width - size) / 2, y: (height - size) / 2, width: size, height: size };
  }
  if (mode === "portrait") {
    const targetRatio = 2 / 3;
    const sourceRatio = width / height;
    if (sourceRatio > targetRatio) {
      const cropWidth = height * targetRatio;
      return { x: (width - cropWidth) / 2, y: 0, width: cropWidth, height };
    }
    const cropHeight = width / targetRatio;
    return { x: 0, y: (height - cropHeight) / 2, width, height: cropHeight };
  }
  return { x: 0, y: 0, width, height };
}
