export function drawArrowHeadWithBars(
  ctx: CanvasRenderingContext2D,
  from: { x: number; y: number },
  angle: number,
  arrowLength: number
) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(
    from.x - arrowLength * Math.cos(angle - Math.PI / 4),
    from.y - arrowLength * Math.sin(angle - Math.PI / 4)
  );
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(
    from.x - arrowLength * Math.cos(angle + Math.PI / 4),
    from.y - arrowLength * Math.sin(angle + Math.PI / 4)
  );
  ctx.stroke();
  const barLength = 15; // Length of the bars
  const barWidth = 5; // Distance between the two bars

  // Calculate the starting point for the bars, positioned perpendicular to the arrow
  const barStartX1 = from.x - barLength * Math.sin(angle);
  const barStartY1 = from.y + barLength * Math.cos(angle);
  const barStartX2 = barStartX1 + barWidth * Math.cos(angle);
  const barStartY2 = barStartY1 + barWidth * Math.sin(angle);

  // Calculate end points for the bars using angle + π/2 and angle - π/2 to ensure perpendicularity
  const barEndX1 = from.x + barLength * Math.sin(angle);
  const barEndY1 = from.y - barLength * Math.cos(angle);
  const barEndX2 = barEndX1 + barWidth * Math.cos(angle);
  const barEndY2 = barEndY1 + barWidth * Math.sin(angle);

  // Draw first bar
  ctx.beginPath();
  ctx.moveTo(barStartX1, barStartY1);
  ctx.lineTo(barEndX1, barEndY1);
  ctx.stroke();

  // Draw second bar
  ctx.beginPath();
  ctx.moveTo(barStartX2, barStartY2);
  ctx.lineTo(barEndX2, barEndY2);
  ctx.stroke();
}
