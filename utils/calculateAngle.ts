import { TPoint } from "@/types/curves";

export function calculateAngle(start: TPoint, end: TPoint) {
  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  let multiplier = Math.pow(10, 2);
  return Math.floor(angle * multiplier) / multiplier;
}
