import { calculateAngle } from "./calculateAngle";

export function drawPass({
  canvasContext,
  startPoint,
  endPoint,
}: {
  canvasContext: CanvasRenderingContext2D;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
}): void {
  if (canvasContext) {
    // Begin a new path for the new line
    canvasContext.setLineDash([10, 3]); // 5 pixels of line followed by 3 pixels of space

    canvasContext.beginPath();
    // Move to the initial point
    canvasContext.moveTo(startPoint.x, startPoint.y);
    // Draw a line to the current mouse position
    canvasContext.lineTo(endPoint.x, endPoint.y);
    // Actually draw the line
    canvasContext.stroke();

    // Draw arrow head (solid line)
    canvasContext.setLineDash([]); // Reset to solid line for the arrowhead
  }
}
export function drawShot({
  canvasContext,
  startPoint,
  endPoint,
  lineOffset,
}: {
  canvasContext: CanvasRenderingContext2D;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  lineOffset: number;
}): void {
  const angle = calculateAngle(startPoint, endPoint);
  // Calculate the offset vector perpendicular to the line
  const offsetX = lineOffset * Math.cos(angle + Math.PI / 2);
  const offsetY = lineOffset * Math.sin(angle + Math.PI / 2);

  // Calculate start and end points for the first parallel line
  const line1StartX = startPoint.x + offsetX;
  const line1StartY = startPoint.y + offsetY;
  const line1EndX = endPoint.x + offsetX;
  const line1EndY = endPoint.y + offsetY;

  // Calculate start and end points for the second parallel line
  const line2StartX = startPoint.x - offsetX;
  const line2StartY = startPoint.y - offsetY;
  const line2EndX = endPoint.x - offsetX;
  const line2EndY = endPoint.y - offsetY;

  // Draw the first parallel line
  canvasContext.beginPath();
  canvasContext.moveTo(line1StartX, line1StartY);
  canvasContext.lineTo(line1EndX, line1EndY);
  canvasContext.stroke();

  // Draw the second parallel line
  canvasContext.beginPath();
  canvasContext.moveTo(line2StartX, line2StartY);
  canvasContext.lineTo(line2EndX, line2EndY);
  canvasContext.stroke();
}
