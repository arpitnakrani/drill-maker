type typePoint = {
  x: number;
  y: number;
};
export function calculateAngle(start: typePoint, end: typePoint) {
  return Math.atan2(end.y - start.y, end.x - start.x);
}
