interface ISmoothCurve {
    points: { x: number, y: number }[],
    canvasContext: CanvasRenderingContext2D
}

export function smoothCurve({ canvasContext, points }: ISmoothCurve) {
    if (!canvasContext || points.length < 3) return;

    canvasContext.beginPath();
    canvasContext.moveTo(points[0].x, points[0].y);

    // Add a line to the first midpoint
    let midPoint = midPointBtw(points[0], points[1]);
    canvasContext.lineTo(midPoint.x, midPoint.y);

    for (let i = 1; i < points.length - 2; i++) {
        const currentMid = midPointBtw(points[i], points[i + 1]);
        // Use quadraticCurveTo with control point being the current point
        // and the endpoint being the midpoint between this and the next point
        canvasContext.quadraticCurveTo(
            points[i].x,
            points[i].y,
            currentMid.x,
            currentMid.y
        );
    }

    // Draw the last two segments as a straight line
    const secondLast = points[points.length - 2];
    const last = points[points.length - 1];
    canvasContext.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y);

    canvasContext.stroke();
}

function midPointBtw(p1: { x: number; y: number }, p2: { x: number; y: number }) {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
    };
}