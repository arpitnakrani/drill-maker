export function drawArrowhead(
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
}
