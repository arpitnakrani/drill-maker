import { TPoint } from "@/types/curves";

export function calculateDistance(
  point1: TPoint,
  point2: TPoint
) {
  const distance = Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
  return Math.ceil(distance)
}
