import { calculateDistance } from "./calculateDistance";

export function drawArcZigzagPuck({
  canvasContext,
  startPoint,
  endPoint,
  radius,
  lastDirection,
}: {
  canvasContext: CanvasRenderingContext2D;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  radius: number;
  lastDirection: boolean;
}) {
  let direction = !lastDirection || false;
  const distance = calculateDistance(startPoint, endPoint);
  const angle = Math.atan2(
    endPoint.y - startPoint.y,
    endPoint.x - startPoint.x
  );
  let numArcs = Math.floor(distance / (radius * 2));
  let currentX = startPoint.x;
  let currentY = startPoint.y;

  for (let i = 0; i < numArcs; i++) {
    let centerX = currentX + radius * Math.cos(angle);
    let centerY = currentY + radius * Math.sin(angle);
    canvasContext.beginPath();
    canvasContext.arc(
      centerX,
      centerY,
      radius,
      Math.PI + angle,
      angle,
      direction
    );
    direction = !direction;
    canvasContext.stroke();
    currentX += radius * 2 * Math.cos(angle);
    currentY += radius * 2 * Math.sin(angle);
  }
  return {
    lastZigzagPoint: { x: currentX, y: currentY },
    lastDirection: direction,
  };
}
export function drawArcZigzagBackward({
  canvasContext,
  startPoint,
  endPoint,
  radius,
  lastDirection,
}: {
  canvasContext: CanvasRenderingContext2D;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  radius: number;
  lastDirection: boolean;
}) {
  let direction = !lastDirection || false;
  const distance = calculateDistance(startPoint, endPoint);
  const angle = Math.atan2(
    endPoint.y - startPoint.y,
    endPoint.x - startPoint.x
  );
  let numArcs = Math.floor(distance / (radius * 2));
  let currentX = startPoint.x;
  let currentY = startPoint.y;

  for (let i = 0; i < numArcs; i++) {
    let centerX = currentX + radius * Math.cos(angle);
    let centerY = currentY + radius * Math.sin(angle);
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, angle + Math.PI, angle, false);
    canvasContext.stroke();

    // Middle filled circle
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius / 2, 0, Math.PI * 2);
    canvasContext.fill();

    // Lower arc
    centerX += radius * Math.cos(angle); // Move to the midpoint for the start of the arc
    centerY += radius * Math.sin(angle);
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, angle, angle + Math.PI, false);
    canvasContext.stroke();
    currentX = centerX + radius * 2 * Math.cos(angle);
    currentY = centerY + radius * 2 * Math.sin(angle);
  }
  return {
    lastZigzagPoint: { x: currentX, y: currentY },
    lastDirection: direction,
    angle,
  };
}
export function drawArcZigzagWithoutBackward({
  canvasContext,
  startPoint,
  endPoint,
  radius,
  lastDirection,
}: {
  canvasContext: CanvasRenderingContext2D;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  radius: number;
  lastDirection: boolean;
}) {
  let direction = !lastDirection || false;
  const distance = calculateDistance(startPoint, endPoint);
  const angle = Math.atan2(
    endPoint.y - startPoint.y,
    endPoint.x - startPoint.x
  );
  let numArcs = Math.floor(distance / (radius * 2));
  let currentX = startPoint.x;
  let currentY = startPoint.y;

  for (let i = 0; i < numArcs; i++) {
    let centerX = currentX + radius * Math.cos(angle);
    let centerY = currentY + radius * Math.sin(angle);
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, angle + Math.PI, angle, false);
    canvasContext.stroke();

    // Lower arc
    centerX += radius * Math.cos(angle); // Move to the midpoint for the start of the arc
    centerY += radius * Math.sin(angle);
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, angle, angle + Math.PI, false);
    canvasContext.stroke();
    currentX = centerX + radius * 2 * Math.cos(angle);
    currentY = centerY + radius * 2 * Math.sin(angle);
  }
  return {
    lastZigzagPoint: { x: currentX, y: currentY },
    lastDirection: direction,
    angle,
  };
}
export function drawLateralSkating({
  canvasContext,
  startPoint,
  endPoint,
  gapBetweenLine,
  linHeight,
}: {
  canvasContext: CanvasRenderingContext2D;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  gapBetweenLine: number;
  linHeight: number;
}) {
  const distance = calculateDistance(startPoint, endPoint);
  const angle = Math.atan2(
    endPoint.y - startPoint.y,
    endPoint.x - startPoint.x
  );
  let numOfLines = Math.floor(distance / (gapBetweenLine + 2));
  let currentX = startPoint.x;
  let currentY = startPoint.y;
  const perpendicularAngle = angle + Math.PI / 2; // Rotate the angle by 90 degrees
  for (let i = 0; i < numOfLines; i++) {
    let startX = currentX + (linHeight / 2) * Math.cos(perpendicularAngle);
    let startY = currentY + (linHeight / 2) * Math.sin(perpendicularAngle);
    let endX = currentX - (linHeight / 2) * Math.cos(perpendicularAngle);
    let endY = currentY - (linHeight / 2) * Math.sin(perpendicularAngle);

    canvasContext.beginPath();
    canvasContext.moveTo(startX, startY);
    canvasContext.lineTo(endX, endY);
    canvasContext.stroke();
    currentX += gapBetweenLine * Math.cos(angle);
    currentY += gapBetweenLine * Math.sin(angle);
  }
  return {
    lastZigzagPoint: { x: currentX, y: currentY },
    angle,
  };
}
