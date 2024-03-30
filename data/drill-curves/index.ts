import { CurveTypes, DrillActions } from "@/types/drill-actions";
import { calculateDistance } from "@/utils/calculateDistance";
import { drawArrowhead } from "@/utils/drawArrowHead";
import { drawArrowHeadWithBars } from "@/utils/drawArrowHeadWithBars";

export interface IDrillCurve {
  imagePath: string;
  label: string;
  actionType: DrillActions;
  curveType: CurveTypes;
  active: boolean;
}

export const drillSkateCurves: IDrillCurve[] = [
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freeHandSkate,
    imagePath: "svgs/drill-curves-svgs/skate-freehand.svg",
    label: "Skate (free hand)",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freeHandSkateWithStop,
    imagePath: "svgs/drill-curves-svgs/skate-with-stop-freehand.svg",
    label: "Skate with  stop (Free Hand)",
    active: false,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.straightSkate,
    imagePath: "svgs/drill-curves-svgs/skate-straight.svg",
    label: "Skate (straight)",
    active: false,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.straightSkateWithStop,
    imagePath: "svgs/drill-curves-svgs/skate-with-stop-straight.svg",
    label: "Skate with  stop (straight)",
    active: false,
  },
];

export const drillSkateWithPuckCurves: IDrillCurve[] = [
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freeHandSkateWithPuck,
    imagePath: "svgs/drill-curves-svgs/skate-with-puck.svg",
    label: "Skate with  puck",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freeHandSkateWithPuckAndStop,
    imagePath: "svgs/drill-curves-svgs/skate-with-puck-stop.svg",
    label: "Skate with puck and stop",
    active: false,
  },
];

export const drillSkateBackwardCurves: IDrillCurve[] = [
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freehandSkateBackwardWithPuckAndStop,
    imagePath: "svgs/drill-curves-svgs/skate-backward-with-puck-stop.svg",
    label: "Skate backward with puck and stop",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freehandSkateBackwardWithPuck,
    imagePath: "svgs/drill-curves-svgs/skate-backward-with-puck.svg",
    label: "Skate backward with puck",
    active: false,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freehandSkateBackwardWithoutPuckAndStop,
    imagePath: "svgs/drill-curves-svgs/skate-backward-without-puck-stop.svg",
    label: "Skate backward without puck and stop",
    active: false,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freehandSkateBackwardWithoutPuck,
    imagePath: "svgs/drill-curves-svgs/skate-backward-without-puck.svg",
    label: "Skate backward without puck",
    active: false,
  },
];

export const drillPassCurves: IDrillCurve[] = [
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.straightPass,
    imagePath: "svgs/drill-curves-svgs/pass.svg",
    label: "Pass",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.straightShot,
    imagePath: "svgs/drill-curves-svgs/shot.svg",
    label: "Shot",
    active: false,
  },
];

export const drillLateralSkatingCurve: IDrillCurve[] = [
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freehandLateralSkating,
    imagePath: "svgs/drill-curves-svgs/lateral-skating.svg",
    label: "Lateral Skating",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freehandLateralSkatingToStop,
    imagePath: "svgs/drill-curves-svgs/lateral-skating-stop.svg",
    label: "Lateral Skating to stop",
    active: false,
  },
];

export class FreeHandSkate {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  isDrawing: boolean = false;
  points: Array<{ x: number; y: number }>;
  ctx: CanvasRenderingContext2D | null;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.isDrawing = true;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number): void {
    if (!this.isDrawing) return;
    const canvasContext = this.canvas.getContext("2d");
    if (!canvasContext) return;

    this.addPoint(newX, newY);

    // Clear the canvas and redraw the curve to include the new point
    canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.smoothCurve(); // Draw the smooth curve without finalizing (no arrowhead yet)
  }

  addPoint(pointX: number, pointY: number): void {
    this.points.push({ x: pointX, y: pointY });
  }

  smoothCurve(): void {
    const canvasContext = this.canvas.getContext("2d");
    if (!canvasContext || this.points.length < 3) return;

    canvasContext.beginPath();
    canvasContext.lineWidth = 2;
    canvasContext.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length - 2; i++) {
      const cp = {
        x: (this.points[i].x + this.points[i + 1].x) / 2,
        y: (this.points[i].y + this.points[i + 1].y) / 2,
      };
      canvasContext.quadraticCurveTo(
        this.points[i].x,
        this.points[i].y,
        cp.x,
        cp.y
      );
    }

    // For the last 2 points
    if (this.points.length > 2) {
      const last = this.points.length - 1;
      canvasContext.quadraticCurveTo(
        this.points[last - 1].x,
        this.points[last - 1].y,
        this.points[last].x,
        this.points[last].y
      );
    }
    canvasContext.stroke();
    if (this.points.length > 1) {
      const lastPoint = this.points[this.points.length - 1];
      const penultimatePoint = this.points[this.points.length - 2];
      this.drawArrowhead(canvasContext, penultimatePoint, lastPoint, 15);
    }
  }

  stopDrawing(): void {
    this.isDrawing = false;
    const canvasContext = this.canvas.getContext("2d");
    if (canvasContext) {
      canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.smoothCurve(); // Redraw the smoothed curve

      // Draw the final arrowhead if there are enough points
      if (this.points.length > 1) {
        const lastPoint = this.points[this.points.length - 1];
        const penultimatePoint = this.points[this.points.length - 2];
        this.drawArrowhead(canvasContext, penultimatePoint, lastPoint, 10);
      }
    }
  }

  drawArrowhead(
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number },
    arrowLength: number
  ) {
    // Find a point back from the end to determine the direction more reliably
    const distanceBack = Math.min(this.points.length - 1, 10); // Look 10 points back, or fewer if not available
    const farPoint = this.points[this.points.length - 1 - distanceBack] || from; // Fallback to 'from' if not enough points

    const angle = Math.atan2(to.y - farPoint.y, to.x - farPoint.x);
    const headLength = arrowLength; // Length of the arrowhead lines
    // Set the angle for the lines of the arrowhead
    ctx.beginPath();
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(
      to.x - arrowLength * Math.cos(angle - Math.PI / 4),
      to.y - arrowLength * Math.sin(angle - Math.PI / 4)
    );
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(
      to.x - arrowLength * Math.cos(angle + Math.PI / 4),
      to.y - arrowLength * Math.sin(angle + Math.PI / 4)
    );
    ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(to.x, to.y);
    // ctx.lineTo(
    //   to.x - headLength * Math.cos(angle - Math.PI / 6),
    //   to.y - headLength * Math.sin(angle - Math.PI / 6)
    // );
    // ctx.lineTo(
    //   to.x - headLength * Math.cos(angle + Math.PI / 6),
    //   to.y - headLength * Math.sin(angle + Math.PI / 6)
    // );
    // ctx.lineTo(to.x, to.y);
    // ctx.stroke(); // Use fill() instead of stroke() to make the arrowhead solid
  }
}
export class FreeHandSkateWithStop {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  isDrawing: boolean = false;
  points: Array<{ x: number; y: number }>;
  ctx: CanvasRenderingContext2D | null;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.isDrawing = true;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number): void {
    if (!this.isDrawing) return;
    const canvasContext = this.canvas.getContext("2d");
    if (!canvasContext) return;

    this.addPoint(newX, newY);

    // Clear the canvas and redraw the curve to include the new point
    canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.smoothCurve(); // Draw the smooth curve without finalizing (no arrowhead yet)
  }

  addPoint(pointX: number, pointY: number): void {
    this.points.push({ x: pointX, y: pointY });
  }

  smoothCurve(): void {
    const canvasContext = this.canvas.getContext("2d");
    if (!canvasContext || this.points.length < 3) return;

    canvasContext.beginPath();
    canvasContext.lineWidth = 2;
    canvasContext.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length - 2; i++) {
      const cp = {
        x: (this.points[i].x + this.points[i + 1].x) / 2,
        y: (this.points[i].y + this.points[i + 1].y) / 2,
      };
      canvasContext.quadraticCurveTo(
        this.points[i].x,
        this.points[i].y,
        cp.x,
        cp.y
      );
    }

    // For the last 2 points
    if (this.points.length > 2) {
      const last = this.points.length - 1;
      canvasContext.quadraticCurveTo(
        this.points[last - 1].x,
        this.points[last - 1].y,
        this.points[last].x,
        this.points[last].y
      );
    }
    canvasContext.stroke();
    if (this.points.length > 1) {
      const lastPoint = this.points[this.points.length - 1];
      const penultimatePoint = this.points[this.points.length - 2];
      this.drawArrowhead(canvasContext, penultimatePoint, lastPoint, 15);
    }
  }

  stopDrawing(): void {
    this.isDrawing = false;
    const canvasContext = this.canvas.getContext("2d");
    if (canvasContext) {
      canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.smoothCurve(); // Redraw the smoothed curve

      // Draw the final arrowhead if there are enough points
      if (this.points.length > 1) {
        const lastPoint = this.points[this.points.length - 1];
        const penultimatePoint = this.points[this.points.length - 2];
        this.drawArrowhead(canvasContext, penultimatePoint, lastPoint, 10);
      }
    }
  }

  drawArrowhead(
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number },
    arrowLength: number
  ) {
    // Find a point back from the end to determine the direction more reliably
    const distanceBack = Math.min(this.points.length - 1, 10); // Look 10 points back, or fewer if not available
    const farPoint = this.points[this.points.length - 1 - distanceBack] || from; // Fallback to 'from' if not enough points

    const angle = Math.atan2(to.y - farPoint.y, to.x - farPoint.x);
    const headLength = arrowLength; // Length of the arrowhead lines
    // Set the angle for the lines of the arrowhead
    ctx.beginPath();
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(
      to.x - arrowLength * Math.cos(angle - Math.PI / 4),
      to.y - arrowLength * Math.sin(angle - Math.PI / 4)
    );
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(
      to.x - arrowLength * Math.cos(angle + Math.PI / 4),
      to.y - arrowLength * Math.sin(angle + Math.PI / 4)
    );
    ctx.stroke();
    const barLength = 15; // Length of the bars
    const barWidth = 5; // Distance between the two bars
    const barDistanceFromHead = 5; // Distance from the arrowhead to start the bars

    // Calculate the starting point for the bars, positioned perpendicular to the arrow
    const barStartX1 = to.x - barLength * Math.sin(angle);
    const barStartY1 = to.y + barLength * Math.cos(angle);
    const barStartX2 = barStartX1 + barWidth * Math.cos(angle);
    const barStartY2 = barStartY1 + barWidth * Math.sin(angle);

    // Calculate end points for the bars using angle + π/2 and angle - π/2 to ensure perpendicularity
    const barEndX1 = to.x + barLength * Math.sin(angle);
    const barEndY1 = to.y - barLength * Math.cos(angle);
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
}

export class StraightSkate {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  isDrawing: boolean = false;
  ctx: CanvasRenderingContext2D | null;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    console.log(startingPointX, startingPointY, "start");
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.isDrawing = true;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number): void {
    const canvasContext = this.canvas.getContext("2d");
    if (canvasContext && this.isDrawing) {
      // Clear the canvas before drawing the new line
      canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Begin a new path for the new line
      canvasContext.lineWidth = 2; // Increase this value to make the stroke wider
      canvasContext.beginPath();
      // Move to the initial point
      canvasContext.moveTo(this.x, this.y);
      // Draw a line to the current mouse position
      canvasContext.lineTo(newX, newY);
      // Actually draw the line
      canvasContext.stroke();

      //now draw arrow head

      const arrowLength = 10; // Length of the arrowhead lines
      const angle = Math.atan2(newY - this.y, newX - this.x);
      // Set the angle for the lines of the arrowhead
      canvasContext.beginPath();
      canvasContext.moveTo(newX, newY);
      canvasContext.lineTo(
        newX - arrowLength * Math.cos(angle - Math.PI / 4),
        newY - arrowLength * Math.sin(angle - Math.PI / 4)
      );
      canvasContext.moveTo(newX, newY);
      canvasContext.lineTo(
        newX - arrowLength * Math.cos(angle + Math.PI / 4),
        newY - arrowLength * Math.sin(angle + Math.PI / 4)
      );
      canvasContext.stroke();
    }
  }
  stopDrawing() {
    this.isDrawing = false;
  }
}
export class StraightSkateWithStop {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  isDrawing: boolean = false;
  ctx: CanvasRenderingContext2D | null;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    console.log(startingPointX, startingPointY, "start");
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.isDrawing = true;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number): void {
    const canvasContext = this.canvas.getContext("2d");
    if (canvasContext && this.isDrawing) {
      // Clear the canvas before drawing the new line
      canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Begin a new path for the new line
      canvasContext.lineWidth = 2; // Increase this value to make the stroke wider
      canvasContext.beginPath();
      // Move to the initial point
      canvasContext.moveTo(this.x, this.y);
      // Draw a line to the current mouse position
      canvasContext.lineTo(newX, newY);
      // Actually draw the line
      canvasContext.stroke();

      //now draw arrow head

      const arrowLength = 10; // Length of the arrowhead lines
      const angle = Math.atan2(newY - this.y, newX - this.x);
      // Set the angle for the lines of the arrowhead
      canvasContext.beginPath();
      canvasContext.moveTo(newX, newY);
      canvasContext.lineTo(
        newX - arrowLength * Math.cos(angle - Math.PI / 4),
        newY - arrowLength * Math.sin(angle - Math.PI / 4)
      );
      canvasContext.moveTo(newX, newY);
      canvasContext.lineTo(
        newX - arrowLength * Math.cos(angle + Math.PI / 4),
        newY - arrowLength * Math.sin(angle + Math.PI / 4)
      );

      canvasContext.stroke();
      const barLength = 15; // Length of the bars
      const barWidth = 5; // Distance between the two bars
      const barDistanceFromHead = 5; // Distance from the arrowhead to start the bars

      // Calculate the starting point for the bars, positioned perpendicular to the arrow
      const barStartX1 = newX - barLength * Math.sin(angle);
      const barStartY1 = newY + barLength * Math.cos(angle);
      const barStartX2 = barStartX1 + barWidth * Math.cos(angle);
      const barStartY2 = barStartY1 + barWidth * Math.sin(angle);

      // Calculate end points for the bars using angle + π/2 and angle - π/2 to ensure perpendicularity
      const barEndX1 = newX + barLength * Math.sin(angle);
      const barEndY1 = newY - barLength * Math.cos(angle);
      const barEndX2 = barEndX1 + barWidth * Math.cos(angle);
      const barEndY2 = barEndY1 + barWidth * Math.sin(angle);

      // Draw first bar
      canvasContext.beginPath();
      canvasContext.moveTo(barStartX1, barStartY1);
      canvasContext.lineTo(barEndX1, barEndY1);
      canvasContext.stroke();

      // Draw second bar
      canvasContext.beginPath();
      canvasContext.moveTo(barStartX2, barStartY2);
      canvasContext.lineTo(barEndX2, barEndY2);
      canvasContext.stroke();
    }
  }
  stopDrawing() {
    this.isDrawing = false;
  }
}
export class FreeHandSkateWithPuck {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  radius: number;
  direction: boolean;
  angle: number;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.isDrawing = true;
    this.lastZigzagPoint = null;
    this.radius = 10;
    this.direction = true;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.angle = 0;

    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number) {
    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = this.calculateDistance(this.lastZigzagPoint, currentPoint);

    if (distance > this.radius * 2) {
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
      this.lastZigzagPoint = currentPoint;
    }
  }
  calculateDistance(
    point1: { x: number; y: number },
    point2: { x: number; y: number }
  ) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  }
  drawArcZigzag(
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number }
  ) {
    const distance = this.calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    const arcLength = this.radius * 2 * Math.PI; // Circumference of the full circle
    const numArcs = Math.max(1, Math.floor((distance / arcLength) * 4)); // Ensure at least one arc, adjust for speed

    let currentAngle = angle; // Start perpendicular to the movement direction

    for (let i = 0; i < numArcs; i++) {
      const center = {
        x: startPoint.x + ((endPoint.x - startPoint.x) * (i + 0.5)) / numArcs,
        y: startPoint.y + ((endPoint.y - startPoint.y) * (i + 0.5)) / numArcs,
      };
      if (this.ctx) {
        this.ctx.beginPath();
        this.ctx.arc(
          center.x,
          center.y,
          this.radius,
          currentAngle,
          currentAngle + Math.PI,
          this.direction
        );
        this.ctx.stroke();
        this.direction = !this.direction; // Flip the arc to alternate above and below the path
      }
    }
    this.angle = angle;
  }
  stopDrawing(): void {
    if (this.ctx && this.lastZigzagPoint)
      drawArrowhead(
        this.ctx,
        {
          x: this.lastZigzagPoint.x + 10 * Math.cos(this.angle),
          y: this.lastZigzagPoint.y + 10 * Math.sin(this.angle),
        },
        this.angle,
        15
      );
    this.isDrawing = false;
  }
}
export class FreeHandSkateWithPuckAndStop {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  radius: number;
  direction: boolean;
  angle: number;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.isDrawing = true;
    this.lastZigzagPoint = null;
    this.radius = 10;
    this.direction = true;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.angle = 0;

    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number) {
    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = this.calculateDistance(this.lastZigzagPoint, currentPoint);

    if (distance > this.radius * 2) {
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
      this.lastZigzagPoint = currentPoint;
    }
  }
  calculateDistance(
    point1: { x: number; y: number },
    point2: { x: number; y: number }
  ) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  }
  drawArcZigzag(
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number }
  ) {
    const distance = this.calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    const arcLength = this.radius * 2 * Math.PI; // Circumference of the full circle
    const numArcs = Math.max(1, Math.floor((distance / arcLength) * 4)); // Ensure at least one arc, adjust for speed

    let currentAngle = angle; // Start perpendicular to the movement direction

    for (let i = 0; i < numArcs; i++) {
      const center = {
        x: startPoint.x + ((endPoint.x - startPoint.x) * (i + 0.5)) / numArcs,
        y: startPoint.y + ((endPoint.y - startPoint.y) * (i + 0.5)) / numArcs,
      };
      if (this.ctx) {
        this.ctx.beginPath();
        this.ctx.arc(
          center.x,
          center.y,
          this.radius,
          currentAngle,
          currentAngle + Math.PI,
          this.direction
        );
        this.ctx.stroke();
        this.direction = !this.direction; // Flip the arc to alternate above and below the path
      }
    }
    this.angle = angle;
  }
  stopDrawing(): void {
    if (this.ctx && this.lastZigzagPoint)
      drawArrowHeadWithBars(
        this.ctx,
        {
          x: this.lastZigzagPoint.x + 10 * Math.cos(this.angle),
          y: this.lastZigzagPoint.y + 10 * Math.sin(this.angle),
        },
        this.angle,
        15
      );
    this.isDrawing = false;
  }
}
export class FreehandSkateBackwardWithPuckAndStop {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  radius: number;
  direction: boolean;
  angle: number;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.isDrawing = true;
    this.lastZigzagPoint = null;
    this.radius = 10;
    this.direction = true;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.angle = 0;

    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number) {
    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = this.calculateDistance(this.lastZigzagPoint, currentPoint);
    if (distance > this.radius * 3) {
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
      this.lastZigzagPoint = currentPoint;
    }
  }
  calculateDistance(
    point1: { x: number; y: number },
    point2: { x: number; y: number }
  ) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  }
  drawArcZigzag(
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number }
  ) {
    const distance = this.calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    console.log(startPoint, endPoint, distance, "data");
    this.angle = angle;
    let rounds = 0;
    let tempX = startPoint.x + this.radius * Math.cos(angle);
    let tempY = startPoint.y + this.radius * Math.sin(angle);
    while (rounds <= distance / (5 * this.radius)) {
      if (this.ctx) {
        this.ctx.beginPath();
        // this.ctx.moveTo(tempX, tempY);
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle);
        this.ctx.stroke();
        tempX += this.radius * Math.cos(angle);
        tempY += this.radius * Math.sin(angle);
        this.ctx.moveTo(
          tempX - this.radius * Math.cos(angle),
          tempY - this.radius * Math.sin(angle)
        );
        // this.ctx.arc(
        //   tempX - this.radius * Math.cos(angle),
        //   tempY - this.radius * Math.sin(angle),
        //   2,
        //   0,
        //   Math.PI
        // );
        // this.ctx.fill();
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle, true);
        tempX += this.radius * Math.cos(angle) * 2;
        tempY += this.radius * Math.sin(angle) * 2;
        this.ctx.stroke();
      }
      rounds += 1;
    }
  }
  stopDrawing(): void {
    if (this.ctx && this.lastZigzagPoint)
      drawArrowHeadWithBars(
        this.ctx,
        {
          x: this.lastZigzagPoint.x + 10 * Math.cos(this.angle),
          y: this.lastZigzagPoint.y + 10 * Math.sin(this.angle),
        },
        this.angle,
        15
      );
    this.isDrawing = false;
  }
}
export class FreehandSkateBackwardWithPuck {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  radius: number;
  direction: boolean;
  angle: number;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.isDrawing = true;
    this.lastZigzagPoint = null;
    this.radius = 10;
    this.direction = true;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.angle = 0;

    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number) {
    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = this.calculateDistance(this.lastZigzagPoint, currentPoint);
    if (distance > this.radius * 3) {
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
      this.lastZigzagPoint = currentPoint;
    }
  }
  calculateDistance(
    point1: { x: number; y: number },
    point2: { x: number; y: number }
  ) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  }
  drawArcZigzag(
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number }
  ) {
    const distance = this.calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    console.log(startPoint, endPoint, distance, "data");
    this.angle = angle;
    let rounds = 0;
    let tempX = startPoint.x + this.radius * Math.cos(angle);
    let tempY = startPoint.y + this.radius * Math.sin(angle);
    while (rounds <= distance / (5 * this.radius)) {
      if (this.ctx) {
        this.ctx.beginPath();
        // this.ctx.moveTo(tempX, tempY);
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle);
        this.ctx.stroke();
        tempX += this.radius * Math.cos(angle);
        tempY += this.radius * Math.sin(angle);
        this.ctx.moveTo(
          tempX - this.radius * Math.cos(angle),
          tempY - this.radius * Math.sin(angle)
        );
        // this.ctx.arc(
        //   tempX - this.radius * Math.cos(angle),
        //   tempY - this.radius * Math.sin(angle),
        //   2,
        //   0,
        //   Math.PI
        // );
        // this.ctx.fill();
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle, true);
        tempX += this.radius * Math.cos(angle) * 2;
        tempY += this.radius * Math.sin(angle) * 2;
        this.ctx.stroke();
      }
      rounds += 1;
    }
  }
  stopDrawing(): void {
    if (this.ctx && this.lastZigzagPoint)
      drawArrowhead(
        this.ctx,
        {
          x: this.lastZigzagPoint.x + 10 * Math.cos(this.angle),
          y: this.lastZigzagPoint.y + 10 * Math.sin(this.angle),
        },
        this.angle,
        15
      );
    this.isDrawing = false;
  }
}
export class FreehandSkateBackwardWithoutPuckAndStop {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  radius: number;
  direction: boolean;
  angle: number;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.isDrawing = true;
    this.lastZigzagPoint = null;
    this.radius = 10;
    this.direction = true;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.angle = 0;

    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number) {
    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = this.calculateDistance(this.lastZigzagPoint, currentPoint);
    if (distance > this.radius * 3) {
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
      this.lastZigzagPoint = currentPoint;
    }
  }
  calculateDistance(
    point1: { x: number; y: number },
    point2: { x: number; y: number }
  ) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  }
  drawArcZigzag(
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number }
  ) {
    const distance = this.calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    console.log(startPoint, endPoint, distance, "data");
    this.angle = angle;
    let rounds = 0;
    let tempX = startPoint.x + this.radius * Math.cos(angle);
    let tempY = startPoint.y + this.radius * Math.sin(angle);
    while (rounds <= distance / (5 * this.radius)) {
      if (this.ctx) {
        this.ctx.beginPath();
        // this.ctx.moveTo(tempX, tempY);
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle);
        this.ctx.stroke();
        tempX += this.radius * Math.cos(angle);
        tempY += this.radius * Math.sin(angle);
        this.ctx.moveTo(
          tempX - this.radius * Math.cos(angle),
          tempY - this.radius * Math.sin(angle)
        );
        // this.ctx.arc(
        //   tempX - this.radius * Math.cos(angle),
        //   tempY - this.radius * Math.sin(angle),
        //   2,
        //   0,
        //   Math.PI
        // );
        // this.ctx.fill();
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle, true);
        tempX += this.radius * Math.cos(angle) * 2;
        tempY += this.radius * Math.sin(angle) * 2;
        this.ctx.stroke();
      }
      rounds += 1;
    }
  }
  stopDrawing(): void {
    if (this.ctx && this.lastZigzagPoint)
      drawArrowhead(
        this.ctx,
        {
          x: this.lastZigzagPoint.x + 10 * Math.cos(this.angle),
          y: this.lastZigzagPoint.y + 10 * Math.sin(this.angle),
        },
        this.angle,
        15
      );
    this.isDrawing = false;
  }
}
export class FreehandSkateBackwardWithoutPuck {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  radius: number;
  direction: boolean;
  angle: number;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.isDrawing = true;
    this.lastZigzagPoint = null;
    this.radius = 10;
    this.direction = true;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.angle = 0;

    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number) {
    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = this.calculateDistance(this.lastZigzagPoint, currentPoint);
    if (distance > this.radius * 3) {
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
      this.lastZigzagPoint = currentPoint;
    }
  }
  calculateDistance(
    point1: { x: number; y: number },
    point2: { x: number; y: number }
  ) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  }
  drawArcZigzag(
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number }
  ) {
    const distance = this.calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    console.log(startPoint, endPoint, distance, "data");
    this.angle = angle;
    let rounds = 0;
    let tempX = startPoint.x + this.radius * Math.cos(angle);
    let tempY = startPoint.y + this.radius * Math.sin(angle);
    while (rounds <= distance / (5 * this.radius)) {
      if (this.ctx) {
        this.ctx.beginPath();
        // this.ctx.moveTo(tempX, tempY);
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle);
        this.ctx.stroke();
        tempX += this.radius * Math.cos(angle);
        tempY += this.radius * Math.sin(angle);
        this.ctx.moveTo(
          tempX - this.radius * Math.cos(angle),
          tempY - this.radius * Math.sin(angle)
        );
        // this.ctx.arc(
        //   tempX - this.radius * Math.cos(angle),
        //   tempY - this.radius * Math.sin(angle),
        //   2,
        //   0,
        //   Math.PI
        // );
        // this.ctx.fill();
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle, true);
        tempX += this.radius * Math.cos(angle) * 2;
        tempY += this.radius * Math.sin(angle) * 2;
        this.ctx.stroke();
      }
      rounds += 1;
    }
  }
  stopDrawing(): void {
    if (this.ctx && this.lastZigzagPoint)
      drawArrowhead(
        this.ctx,
        {
          x: this.lastZigzagPoint.x + 10 * Math.cos(this.angle),
          y: this.lastZigzagPoint.y + 10 * Math.sin(this.angle),
        },
        this.angle,
        15
      );
    this.isDrawing = false;
  }
}
export class Pass {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  isDrawing: boolean = false;
  ctx: CanvasRenderingContext2D | null;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    console.log(startingPointX, startingPointY, "start");
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.isDrawing = true;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) {
      this.ctx.lineWidth = 2;
      // Set the dash pattern for drawing
      this.ctx.setLineDash([5, 3]); // 5 pixels of line followed by 3 pixels of space
    }
  }

  draw(newX: number, newY: number): void {
    const canvasContext = this.canvas.getContext("2d");
    if (canvasContext && this.isDrawing) {
      // Clear the canvas before drawing the new line
      canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Begin a new path for the new line
      canvasContext.lineWidth = 2; // Increase this value to make the stroke wider
      canvasContext.setLineDash([5, 3]); // Apply the dash pattern for drawing
      canvasContext.beginPath();
      // Move to the initial point
      canvasContext.moveTo(this.x, this.y);
      // Draw a line to the current mouse position
      canvasContext.lineTo(newX, newY);
      // Actually draw the line
      canvasContext.stroke();

      // Draw arrow head (solid line)
      canvasContext.setLineDash([]); // Reset to solid line for the arrowhead
      const arrowLength = 10; // Length of the arrowhead lines
      const angle = Math.atan2(newY - this.y, newX - this.x);
      // Set the angle for the lines of the arrowhead
      canvasContext.beginPath();
      canvasContext.moveTo(newX, newY);
      canvasContext.lineTo(
        newX - arrowLength * Math.cos(angle - Math.PI / 4),
        newY - arrowLength * Math.sin(angle - Math.PI / 4)
      );
      canvasContext.moveTo(newX, newY);
      canvasContext.lineTo(
        newX - arrowLength * Math.cos(angle + Math.PI / 4),
        newY - arrowLength * Math.sin(angle + Math.PI / 4)
      );
      canvasContext.stroke();
    }
  }
  stopDrawing() {
    this.isDrawing = false;
  }
}
export class Shot {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  isDrawing: boolean = false;
  ctx: CanvasRenderingContext2D | null;
  lineOffset: number; // Distance between the two parallel lines

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    console.log(startingPointX, startingPointY, "start");
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.isDrawing = true;
    this.ctx = this.canvas.getContext("2d");
    this.lineOffset = 5; // Set the desired offset for parallel lines
    if (this.ctx) {
      this.ctx.lineWidth = 2;
    }
  }

  draw(newX: number, newY: number): void {
    if (!this.ctx || !this.isDrawing) return;

    // Clear the canvas before drawing the new lines
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Calculate the angle of the line
    const angle = Math.atan2(newY - this.y, newX - this.x);
    // Calculate the offset vector perpendicular to the line
    const offsetX = this.lineOffset * Math.cos(angle + Math.PI / 2);
    const offsetY = this.lineOffset * Math.sin(angle + Math.PI / 2);

    // Calculate start and end points for the first parallel line
    const line1StartX = this.x + offsetX;
    const line1StartY = this.y + offsetY;
    const line1EndX = newX + offsetX;
    const line1EndY = newY + offsetY;

    // Calculate start and end points for the second parallel line
    const line2StartX = this.x - offsetX;
    const line2StartY = this.y - offsetY;
    const line2EndX = newX - offsetX;
    const line2EndY = newY - offsetY;

    // Draw the first parallel line
    this.ctx.beginPath();
    this.ctx.moveTo(line1StartX, line1StartY);
    this.ctx.lineTo(line1EndX, line1EndY);
    this.ctx.stroke();

    // Draw the second parallel line
    this.ctx.beginPath();
    this.ctx.moveTo(line2StartX, line2StartY);
    this.ctx.lineTo(line2EndX, line2EndY);
    this.ctx.stroke();

    const midPointX = (line1EndX + line2EndX) / 2 + 10 * Math.cos(angle);
    const midPointY = (line1EndY + line2EndY) / 2 + 10 * Math.sin(angle);

    // Draw a single arrowhead centered between the two parallel lines
    this.drawArrowhead(midPointX, midPointY, angle);
  }
  drawArrowhead(x: number, y: number, angle: number): void {
    if (!this.ctx) return;

    const arrowLength = 15; // Length of the arrowhead lines
    // Draw the arrowhead at the midpoint
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(
      x - arrowLength * Math.cos(angle - Math.PI / 4),
      y - arrowLength * Math.sin(angle - Math.PI / 4)
    );
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(
      x - arrowLength * Math.cos(angle + Math.PI / 4),
      y - arrowLength * Math.sin(angle + Math.PI / 4)
    );
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  stopDrawing() {
    this.isDrawing = false;
  }
}

export class FreehandLateralSkating {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  isDrawing: boolean = false;
  points: Array<{ x: number; y: number }>;
  ctx: CanvasRenderingContext2D | null;
  angle: number;
  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.isDrawing = true;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;
    this.angle = 0;
  }

  draw(newX: number, newY: number): void {
    if (!this.isDrawing) return;
    const canvasContext = this.canvas.getContext("2d");
    if (!canvasContext) return;

    const distance = calculateDistance(
      { x: newX, y: newY },
      {
        x: this.points[this.points.length - 1].x,
        y: this.points[this.points.length - 1].y,
      }
    );
    if (distance < 15) return;
    this.addPoint(newX, newY);
    console.log(this.points, "points");
    canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.points.length - 1; i++) {
      const start = this.points[i];
      const end = this.points[i + 1];

      // Calculate the angle
      const angle = Math.atan2(end.y - start.y, end.x - start.x) + Math.PI / 2;
      this.angle = angle;
      // Calculate the distance
      const distance = Math.sqrt(
        (end.x - start.x) ** 2 + (end.y - start.y) ** 2
      );
      const lineGap = 10; // Gap between parallel lines
      const lineHeight = 15; // Gap between parallel lines
      const numberOfLines = Math.floor(distance / lineGap);

      let count = 0;
      while (count < numberOfLines) {
        let startX = start.x - (lineHeight / 2) * Math.cos(angle);
        let startY = start.y - (lineHeight / 2) * Math.sin(angle);
        let endX = start.x + (lineHeight / 2) * Math.cos(angle);
        let endY = start.y + (lineHeight / 2) * Math.sin(angle);

        if (this.ctx) {
          this.ctx.beginPath();
          this.ctx.moveTo(startX, startY);
          this.ctx.lineTo(endX, endY);
          this.ctx.stroke();
        }
        count += 1;
        startX += start.x + lineGap * count * Math.cos(angle - Math.PI / 2);
        startY += start.y - lineGap * count * Math.sin(angle - Math.PI / 2);
      }
    }
    if (this.ctx)
      drawArrowhead(
        this.ctx,
        this.points[this.points.length - 1],
        this.angle - Math.PI / 2,
        15
      );
  }

  addPoint(pointX: number, pointY: number): void {
    const lastPoint = this.points[this.points.length - 1];
    const dx = pointX - lastPoint.x;
    const dy = pointY - lastPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const gap = 5; // Minimum distance between points

    if (distance > gap) {
      this.points.push({ x: pointX, y: pointY });
    }
  }

  stopDrawing(): void {
    this.isDrawing = false;
  }
}

export class FreehandLateralSkatingToStop {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  isDrawing: boolean = false;
  points: Array<{ x: number; y: number }>;
  ctx: CanvasRenderingContext2D | null;
  angle: number;
  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.isDrawing = true;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;
    this.angle = 0;
  }

  draw(newX: number, newY: number): void {
    if (!this.isDrawing) return;
    const canvasContext = this.canvas.getContext("2d");
    if (!canvasContext) return;

    const distance = calculateDistance(
      { x: newX, y: newY },
      {
        x: this.points[this.points.length - 1].x,
        y: this.points[this.points.length - 1].y,
      }
    );
    if (distance < 15) return;
    this.addPoint(newX, newY);
    console.log(this.points, "points");
    canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.points.length - 1; i++) {
      const start = this.points[i];
      const end = this.points[i + 1];

      // Calculate the angle
      const angle = Math.atan2(end.y - start.y, end.x - start.x) + Math.PI / 2;
      this.angle = angle;
      // Calculate the distance
      const distance = Math.sqrt(
        (end.x - start.x) ** 2 + (end.y - start.y) ** 2
      );
      const lineGap = 10; // Gap between parallel lines
      const lineHeight = 15; // Gap between parallel lines
      const numberOfLines = Math.floor(distance / lineGap);

      let count = 0;
      while (count < numberOfLines) {
        let startX = start.x - (lineHeight / 2) * Math.cos(angle);
        let startY = start.y - (lineHeight / 2) * Math.sin(angle);
        let endX = start.x + (lineHeight / 2) * Math.cos(angle);
        let endY = start.y + (lineHeight / 2) * Math.sin(angle);

        if (this.ctx) {
          this.ctx.beginPath();
          this.ctx.moveTo(startX, startY);
          this.ctx.lineTo(endX, endY);
          this.ctx.stroke();
        }
        count += 1;
        startX += start.x + lineGap * count * Math.cos(angle - Math.PI / 2);
        startY += start.y - lineGap * count * Math.sin(angle - Math.PI / 2);
      }
    }
    if (this.ctx)
      drawArrowHeadWithBars(
        this.ctx,
        this.points[this.points.length - 1],
        this.angle - Math.PI / 2,
        15
      );
  }

  addPoint(pointX: number, pointY: number): void {
    const lastPoint = this.points[this.points.length - 1];
    const dx = pointX - lastPoint.x;
    const dy = pointY - lastPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const gap = 5; // Minimum distance between points

    if (distance > gap) {
      this.points.push({ x: pointX, y: pointY });
    }
  }

  stopDrawing(): void {
    this.isDrawing = false;
  }
}
