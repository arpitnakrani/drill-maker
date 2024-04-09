import { CurveTypes, DrillActions } from "@/types/drill-actions";
import { calculateAngle } from "@/utils/calculateAngle";
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
export const drillPuck: IDrillCurve[] = [
  {
    actionType: DrillActions.random,
    curveType: CurveTypes.puck,
    imagePath: "svgs/drill-curves-svgs/puck.svg",
    label: "Puck",
    active: true,
  },
  {
    actionType: DrillActions.random,
    curveType: CurveTypes.groupOfPucks,
    imagePath: "svgs/drill-curves-svgs/group-of-puck.svg",
    label: "Group Of Pucks",
    active: false,
  },
];

export const drillGeometricShapes: IDrillCurve[] = [
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.zigzag,
    imagePath: "svgs/drill-curves-svgs/zigzag.svg",
    label: "Zigzag",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.curve,
    imagePath: "svgs/drill-curves-svgs/curve.svg",
    label: "Curve",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.circle,
    imagePath: "svgs/drill-curves-svgs/circle.svg",
    label: "Circle",
    active: true,
  },

  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.filledCircle,
    imagePath: "svgs/drill-curves-svgs/filled-circle.svg",
    label: "Filled Circle",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.triangle,
    imagePath: "svgs/drill-curves-svgs/triangle.svg",
    label: "Triangle",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.filledTriangle,
    imagePath: "svgs/drill-curves-svgs/filled-triangle.svg",
    label: "Filled Triangle",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.starightLine,
    imagePath: "svgs/drill-curves-svgs/square.svg",
    label: "Square",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freehandLine,
    imagePath: "svgs/drill-curves-svgs/filled-square.svg",
    label: "Filled Square",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.straightDashedLine,
    imagePath: "svgs/drill-curves-svgs/hollow-square.svg",
    label: "Hollow Square",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freehandDashedLine,
    imagePath: "svgs/drill-curves-svgs/diagonal-hatch-square.svg",
    label: "Diagonal Hatch Square",
    active: true,
  },
  // ... add other shapes as needed
];

export type TPoint = { x: number; y: number };
export type TPoints = TPoint[];
export class FreeHandSkate {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  points: Array<{ x: number; y: number }>;
  arrowHeadCanvas: HTMLCanvasElement;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.isDrawing = true;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;

    this.arrowHeadCanvas = arrowHeadCanvas;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext("2d");
    if (this.arrowHeadCanvasCtx) this.arrowHeadCanvasCtx.lineWidth = 2;
  }

  draw(newX: number, newY: number): void {
    if (!this.isDrawing || !this.ctx) return;
    const lastPoint = this.points[this.points.length - 1];
    if (!(calculateDistance(lastPoint, { x: newX, y: newY }) > 5)) return;
    this.ctx.beginPath();
    this.ctx.moveTo(lastPoint.x, lastPoint.y);
    this.ctx.lineTo(newX, newY);
    this.ctx.stroke();

    //arrowhead
    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      const angle = Math.atan2(newY - lastPoint.y, newX - lastPoint.x);
      drawArrowhead(this.arrowHeadCanvasCtx, { x: newX, y: newY }, angle, 15);
    }

    this.addPoint(newX, newY);
  }

  addPoint(pointX: number, pointY: number): void {
    this.points.push({ x: pointX, y: pointY });
  }

  bzCurve() {
    if (!this.ctx || this.points.length < 3) return;

    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);

    // Add a line to the first midpoint
    let midPoint = this.midPointBtw(this.points[0], this.points[1]);
    this.ctx.lineTo(midPoint.x, midPoint.y);

    for (let i = 1; i < this.points.length - 2; i++) {
      const currentMid = this.midPointBtw(this.points[i], this.points[i + 1]);
      // Use quadraticCurveTo with control point being the current point
      // and the endpoint being the midpoint between this and the next point
      this.ctx.quadraticCurveTo(
        this.points[i].x,
        this.points[i].y,
        currentMid.x,
        currentMid.y
      );
    }

    // Draw the last two segments as a straight line
    const secondLast = this.points[this.points.length - 2];
    const last = this.points[this.points.length - 1];
    this.ctx.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y);

    this.ctx.stroke();
  }

  // Helper function to calculate midpoint
  midPointBtw(p1: { x: number; y: number }, p2: { x: number; y: number }) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  }
  stopDrawing(): void {
    this.isDrawing = false;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.bzCurve(); // Redraw the smoothed curve

      // Draw the final arrowhead if there are enough points
      if (this.points.length > 1) {
        if (this.arrowHeadCanvasCtx) {
          this.ctx.drawImage(this.arrowHeadCanvas, 0, 0);
          this.arrowHeadCanvasCtx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
          );
        }
      }
    }
  }
  getPoints(): TPoints {
    return this.points;
  }
}
export class FreeHandSkateWithStop {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  points: Array<{ x: number; y: number }>;
  arrowHeadCanvas: HTMLCanvasElement;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.isDrawing = true;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;

    this.arrowHeadCanvas = arrowHeadCanvas;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext("2d");
    if (this.arrowHeadCanvasCtx) this.arrowHeadCanvasCtx.lineWidth = 2;
  }

  draw(newX: number, newY: number): void {
    if (!this.isDrawing || !this.ctx) return;
    const lastPoint = this.points[this.points.length - 1];
    if (!(calculateDistance(lastPoint, { x: newX, y: newY }) > 5)) return;
    this.ctx.beginPath();
    this.ctx.moveTo(lastPoint.x, lastPoint.y);
    this.ctx.lineTo(newX, newY);
    this.ctx.stroke();

    //arrowhead
    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      const angle = Math.atan2(newY - lastPoint.y, newX - lastPoint.x);
      drawArrowHeadWithBars(
        this.arrowHeadCanvasCtx,
        { x: newX, y: newY },
        angle,
        15
      );
    }

    this.addPoint(newX, newY);
  }

  addPoint(pointX: number, pointY: number): void {
    this.points.push({ x: pointX, y: pointY });
  }

  bzCurve() {
    if (!this.ctx || this.points.length < 3) return;

    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);

    // Add a line to the first midpoint
    let midPoint = this.midPointBtw(this.points[0], this.points[1]);
    this.ctx.lineTo(midPoint.x, midPoint.y);

    for (let i = 1; i < this.points.length - 2; i++) {
      const currentMid = this.midPointBtw(this.points[i], this.points[i + 1]);
      // Use quadraticCurveTo with control point being the current point
      // and the endpoint being the midpoint between this and the next point
      this.ctx.quadraticCurveTo(
        this.points[i].x,
        this.points[i].y,
        currentMid.x,
        currentMid.y
      );
    }

    // Draw the last two segments as a straight line
    const secondLast = this.points[this.points.length - 2];
    const last = this.points[this.points.length - 1];
    this.ctx.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y);

    this.ctx.stroke();
  }

  // Helper function to calculate midpoint
  midPointBtw(p1: { x: number; y: number }, p2: { x: number; y: number }) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  }
  stopDrawing(): void {
    this.isDrawing = false;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.bzCurve(); // Redraw the smoothed curve

      // Draw the final arrowhead if there are enough points
      if (this.points.length > 1) {
        if (this.arrowHeadCanvasCtx) {
          this.ctx.drawImage(this.arrowHeadCanvas, 0, 0);
          this.arrowHeadCanvasCtx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
          );
        }
      }
    }
  }
}

export class StraightSkate {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.isDrawing = true;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number): void {
    if (this.ctx && this.isDrawing) {
      // Clear the canvas before drawing the new line
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Begin a new path for the new line
      this.ctx.beginPath();
      // Move to the initial point
      this.ctx.moveTo(this.x, this.y);
      // Draw a line to the current mouse position
      this.ctx.lineTo(newX, newY);
      // Actually draw the line
      this.ctx.stroke();

      const angle = Math.atan2(newY - this.y, newX - this.x);
      drawArrowhead(this.ctx, { x: newX, y: newY }, angle, 15);
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
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.isDrawing = true;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number): void {
    if (this.ctx && this.isDrawing) {
      // Clear the canvas before drawing the new line
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Begin a new path for the new line
      this.ctx.beginPath();
      // Move to the initial point
      this.ctx.moveTo(this.x, this.y);
      // Draw a line to the current mouse position
      this.ctx.lineTo(newX, newY);
      // Actually draw the line
      this.ctx.stroke();

      const angle = Math.atan2(newY - this.y, newX - this.x);
      drawArrowHeadWithBars(this.ctx, { x: newX, y: newY }, angle, 15);
    }
  }
  stopDrawing() {
    this.isDrawing = false;
  }
}

export class FreeHandSkateWithPuck {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  arrowHeadCanvas: HTMLCanvasElement;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  isDrawing: boolean = false;
  direction: boolean;
  radius: number;
  angle: number;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;

    this.arrowHeadCanvas = arrowHeadCanvas;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext("2d");
    if (this.arrowHeadCanvasCtx) this.arrowHeadCanvasCtx.lineWidth = 2;

    this.isDrawing = true;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.radius = 5;
    this.direction = false;
    this.angle = 0;
  }

  draw(newX: number, newY: number) {
    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = this.calculateDistance(this.lastZigzagPoint, currentPoint);

    if (distance > this.radius * 2) {
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
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
    if (!this.ctx) return;
    const distance = this.calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    let numArcs = Math.floor(distance / (this.radius * 2));
    let currentX = startPoint.x;
    let currentY = startPoint.y;

    for (let i = 0; i < numArcs; i++) {
      let centerX = currentX + this.radius * Math.cos(angle);
      let centerY = currentY + this.radius * Math.sin(angle);
      this.ctx.beginPath();
      this.ctx.arc(
        centerX,
        centerY,
        this.radius,
        Math.PI + angle,
        angle,
        this.direction
      );
      this.direction = !this.direction;
      this.ctx.stroke();
      currentX += this.radius * 2 * Math.cos(angle);
      currentY += this.radius * 2 * Math.sin(angle);
    }

    this.lastZigzagPoint = { x: currentX, y: currentY };
    this.angle = angle;

    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      drawArrowhead(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 10 * Math.cos(angle),
          y: endPoint.y + 10 * Math.sin(angle),
        },
        angle,
        15
      );
    }
  }
  stopDrawing(): void {
    this.isDrawing = false;
    if (this.arrowHeadCanvasCtx && this.ctx) {
      this.ctx.drawImage(this.arrowHeadCanvas, 0, 0);
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
  }
}
export class FreeHandSkateWithPuckAndStop {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  arrowHeadCanvas: HTMLCanvasElement;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  isDrawing: boolean = false;
  direction: boolean;
  radius: number;
  angle: number;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;

    this.arrowHeadCanvas = arrowHeadCanvas;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext("2d");
    if (this.arrowHeadCanvasCtx) this.arrowHeadCanvasCtx.lineWidth = 2;

    this.isDrawing = true;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.radius = 5;
    this.direction = false;
    this.angle = 0;
  }

  draw(newX: number, newY: number) {
    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = this.calculateDistance(this.lastZigzagPoint, currentPoint);

    if (distance > this.radius * 2) {
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
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
    if (!this.ctx) return;
    const distance = this.calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    let numArcs = Math.floor(distance / (this.radius * 2));
    let currentX = startPoint.x;
    let currentY = startPoint.y;

    for (let i = 0; i < numArcs; i++) {
      let centerX = currentX + this.radius * Math.cos(angle);
      let centerY = currentY + this.radius * Math.sin(angle);
      this.ctx.beginPath();
      this.ctx.arc(
        centerX,
        centerY,
        this.radius,
        Math.PI + angle,
        angle,
        this.direction
      );
      this.direction = !this.direction;
      this.ctx.stroke();
      currentX += this.radius * 2 * Math.cos(angle);
      currentY += this.radius * 2 * Math.sin(angle);
    }

    this.lastZigzagPoint = { x: currentX, y: currentY };
    this.angle = angle;

    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      drawArrowHeadWithBars(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 10 * Math.cos(angle),
          y: endPoint.y + 10 * Math.sin(angle),
        },
        angle,
        15
      );
    }
  }
  stopDrawing(): void {
    this.isDrawing = false;
    if (this.arrowHeadCanvasCtx && this.ctx) {
      this.ctx.drawImage(this.arrowHeadCanvas, 0, 0);
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
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
  arrowHeadCanvas: HTMLCanvasElement;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.isDrawing = true;
    this.lastZigzagPoint = null;
    this.radius = 5;
    this.direction = true;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.angle = 0;
    this.arrowHeadCanvas = arrowHeadCanvas;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext("2d");
    if (this.arrowHeadCanvasCtx) this.arrowHeadCanvasCtx.lineWidth = 2;
    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number) {
    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = this.calculateDistance(this.lastZigzagPoint, currentPoint);
    if (distance > this.radius * 3) {
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
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
    if (!this.ctx) return;
    const distance = this.calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    let numArcs = Math.floor(distance / (this.radius * 3));
    let currentX = startPoint.x;
    let currentY = startPoint.y;

    console.log(startPoint, "point-1");
    for (let i = 0; i < numArcs; i++) {
      let centerX = currentX + this.radius * Math.cos(angle);
      let centerY = currentY + this.radius * Math.sin(angle);
      this.ctx.beginPath();
      this.ctx.arc(
        centerX,
        centerY,
        this.radius,
        angle + Math.PI,
        angle,
        false
      );
      this.ctx.stroke();

      // Middle filled circle
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, this.radius / 2, 0, Math.PI * 2);
      this.ctx.fill();

      // Lower arc
      centerX += this.radius * Math.cos(angle); // Move to the midpoint for the start of the arc
      centerY += this.radius * Math.sin(angle);
      this.ctx.beginPath();
      this.ctx.arc(
        centerX,
        centerY,
        this.radius,
        angle,
        angle + Math.PI,
        false
      );
      this.ctx.stroke();
      currentX = centerX + this.radius * 2 * Math.cos(angle);
      currentY = centerY + this.radius * 2 * Math.sin(angle);
    }

    this.lastZigzagPoint = { x: currentX, y: currentY };
    console.log(this.lastZigzagPoint, "point-2");

    this.angle = angle;

    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      drawArrowHeadWithBars(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 10 * Math.cos(angle),
          y: endPoint.y + 10 * Math.sin(angle),
        },
        angle,
        15
      );
    }
  }
  stopDrawing(): void {
    this.isDrawing = false;
    if (this.arrowHeadCanvasCtx && this.ctx) {
      this.ctx.drawImage(this.arrowHeadCanvas, 0, 0);
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
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
  arrowHeadCanvas: HTMLCanvasElement;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.isDrawing = true;
    this.lastZigzagPoint = null;
    this.radius = 5;
    this.direction = true;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.angle = 0;
    this.arrowHeadCanvas = arrowHeadCanvas;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext("2d");
    if (this.arrowHeadCanvasCtx) this.arrowHeadCanvasCtx.lineWidth = 2;
    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number) {
    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = calculateDistance(this.lastZigzagPoint, currentPoint);
    if (distance > this.radius * 3) {
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
    }
  }
  drawArcZigzag(
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number }
  ) {
    if (!this.ctx) return;
    const distance = calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    let numArcs = Math.floor(distance / (this.radius * 3));
    let currentX = startPoint.x;
    let currentY = startPoint.y;

    for (let i = 0; i < numArcs; i++) {
      let centerX = currentX + this.radius * Math.cos(angle);
      let centerY = currentY + this.radius * Math.sin(angle);
      this.ctx.beginPath();
      this.ctx.arc(
        centerX,
        centerY,
        this.radius,
        angle + Math.PI,
        angle,
        false
      );
      this.ctx.stroke();

      // Middle filled circle
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, this.radius / 2, 0, Math.PI * 2);
      this.ctx.fill();

      // Lower arc
      centerX += this.radius * Math.cos(angle); // Move to the midpoint for the start of the arc
      centerY += this.radius * Math.sin(angle);
      this.ctx.beginPath();
      this.ctx.arc(
        centerX,
        centerY,
        this.radius,
        angle,
        angle + Math.PI,
        false
      );
      this.ctx.stroke();
      currentX = centerX + this.radius * 2 * Math.cos(angle);
      currentY = centerY + this.radius * 2 * Math.sin(angle);
    }

    this.lastZigzagPoint = { x: currentX, y: currentY };

    this.angle = angle;

    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      drawArrowhead(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 10 * Math.cos(angle),
          y: endPoint.y + 10 * Math.sin(angle),
        },
        angle,
        15
      );
    }
  }
  stopDrawing(): void {
    this.isDrawing = false;
    if (this.arrowHeadCanvasCtx && this.ctx) {
      this.ctx.drawImage(this.arrowHeadCanvas, 0, 0);
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
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
  arrowHeadCanvas: HTMLCanvasElement;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.isDrawing = true;
    this.lastZigzagPoint = null;
    this.radius = 5;
    this.direction = true;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.angle = 0;
    this.arrowHeadCanvas = arrowHeadCanvas;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext("2d");
    if (this.arrowHeadCanvasCtx) this.arrowHeadCanvasCtx.lineWidth = 2;
    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number) {
    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = this.calculateDistance(this.lastZigzagPoint, currentPoint);
    if (distance > this.radius * 3) {
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
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
    if (!this.ctx) return;
    const distance = this.calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    let numArcs = Math.floor(distance / (this.radius * 3));
    let currentX = startPoint.x;
    let currentY = startPoint.y;

    for (let i = 0; i < numArcs; i++) {
      let centerX = currentX + this.radius * Math.cos(angle);
      let centerY = currentY + this.radius * Math.sin(angle);
      this.ctx.beginPath();
      this.ctx.arc(
        centerX,
        centerY,
        this.radius,
        angle + Math.PI,
        angle,
        false
      );
      this.ctx.stroke();

      // Lower arc
      centerX += this.radius * Math.cos(angle); // Move to the midpoint for the start of the arc
      centerY += this.radius * Math.sin(angle);
      this.ctx.beginPath();
      this.ctx.arc(
        centerX,
        centerY,
        this.radius,
        angle,
        angle + Math.PI,
        false
      );
      this.ctx.stroke();
      currentX = centerX + this.radius * 2 * Math.cos(angle);
      currentY = centerY + this.radius * 2 * Math.sin(angle);
    }

    this.lastZigzagPoint = { x: currentX, y: currentY };
    this.angle = angle;
    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      drawArrowHeadWithBars(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 10 * Math.cos(angle),
          y: endPoint.y + 10 * Math.sin(angle),
        },
        angle,
        15
      );
    }
  }
  stopDrawing(): void {
    this.isDrawing = false;
    if (this.arrowHeadCanvasCtx && this.ctx) {
      this.ctx.drawImage(this.arrowHeadCanvas, 0, 0);
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
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
  arrowHeadCanvas: HTMLCanvasElement;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.isDrawing = true;
    this.lastZigzagPoint = null;
    this.radius = 5;
    this.direction = true;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.angle = 0;
    this.arrowHeadCanvas = arrowHeadCanvas;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext("2d");
    if (this.arrowHeadCanvasCtx) this.arrowHeadCanvasCtx.lineWidth = 2;
    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(newX: number, newY: number) {
    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = this.calculateDistance(this.lastZigzagPoint, currentPoint);
    if (distance > this.radius * 3) {
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
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
    if (!this.ctx) return;
    const distance = this.calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    let numArcs = Math.floor(distance / (this.radius * 3));
    let currentX = startPoint.x;
    let currentY = startPoint.y;

    for (let i = 0; i < numArcs; i++) {
      let centerX = currentX + this.radius * Math.cos(angle);
      let centerY = currentY + this.radius * Math.sin(angle);
      this.ctx.beginPath();
      this.ctx.arc(
        centerX,
        centerY,
        this.radius,
        angle + Math.PI,
        angle,
        false
      );
      this.ctx.stroke();

      // Lower arc
      centerX += this.radius * Math.cos(angle); // Move to the midpoint for the start of the arc
      centerY += this.radius * Math.sin(angle);
      this.ctx.beginPath();
      this.ctx.arc(
        centerX,
        centerY,
        this.radius,
        angle,
        angle + Math.PI,
        false
      );
      this.ctx.stroke();
      currentX = centerX + this.radius * 2 * Math.cos(angle);
      currentY = centerY + this.radius * 2 * Math.sin(angle);
    }

    this.lastZigzagPoint = { x: currentX, y: currentY };
    this.angle = angle;
    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      drawArrowhead(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 10 * Math.cos(angle),
          y: endPoint.y + 10 * Math.sin(angle),
        },
        angle,
        15
      );
    }
  }
  stopDrawing(): void {
    this.isDrawing = false;
    if (this.arrowHeadCanvasCtx && this.ctx) {
      this.ctx.drawImage(this.arrowHeadCanvas, 0, 0);
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
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
    }
  }

  draw(newX: number, newY: number): void {
    if (this.ctx && this.isDrawing) {
      // Clear the canvas before drawing the new line
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Begin a new path for the new line
      this.ctx.lineWidth = 2; // Increase this value to make the stroke wider
      this.ctx.setLineDash([10, 3]); // 5 pixels of line followed by 3 pixels of space
      this.ctx.beginPath();
      // Move to the initial point
      this.ctx.moveTo(this.x, this.y);
      // Draw a line to the current mouse position
      this.ctx.lineTo(newX, newY);
      // Actually draw the line
      this.ctx.stroke();

      // Draw arrow head (solid line)
      this.ctx.setLineDash([]); // Reset to solid line for the arrowhead
      const arrowLength = 10; // Length of the arrowhead lines
      const angle = Math.atan2(newY - this.y, newX - this.x);
      drawArrowhead(this.ctx, { x: newX, y: newY }, angle, 15);
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

    //arrowHead Logic
    const midPointX = (line1EndX + line2EndX) / 2 + 10 * Math.cos(angle);
    const midPointY = (line1EndY + line2EndY) / 2 + 10 * Math.sin(angle);

    drawArrowhead(this.ctx, { x: midPointX, y: midPointY }, angle, 15);
  }

  stopDrawing() {
    this.isDrawing = false;
  }
}

export class FreehandLateralSkating {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  arrowHeadCanvas: HTMLCanvasElement;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  angle: number;
  gapBetweenLine: number;
  linHeight: number;
  lastZigzagPoint: { x: number; y: number }; // To store the path points

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;
    this.arrowHeadCanvas = arrowHeadCanvas;
    this.arrowHeadCanvasCtx = this.arrowHeadCanvas.getContext("2d");
    if (this.arrowHeadCanvasCtx) this.arrowHeadCanvasCtx.lineWidth = 2;
    this.isDrawing = true;
    this.angle = 0;
    this.gapBetweenLine = 10;
    this.linHeight = 15;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
  }

  draw(newX: number, newY: number): void {
    if (!this.isDrawing) return;
    if (!this.ctx) return;

    const distance = calculateDistance(
      { x: newX, y: newY },
      this.lastZigzagPoint
    );
    // if (distance < this.gapBetweenLine) return;
    this.drawArcZigzag(this.lastZigzagPoint, { x: newX, y: newY });
  }
  drawArcZigzag(
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number }
  ) {
    if (!this.ctx) return;
    const distance = calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    let numOfLines = Math.floor(distance / (this.gapBetweenLine + 2));
    let currentX = startPoint.x;
    let currentY = startPoint.y;
    const perpendicularAngle = angle + Math.PI / 2; // Rotate the angle by 90 degrees
    for (let i = 0; i < numOfLines; i++) {
      let startX =
        currentX + (this.linHeight / 2) * Math.cos(perpendicularAngle);
      let startY =
        currentY + (this.linHeight / 2) * Math.sin(perpendicularAngle);
      let endX = currentX - (this.linHeight / 2) * Math.cos(perpendicularAngle);
      let endY = currentY - (this.linHeight / 2) * Math.sin(perpendicularAngle);

      console.log(
        { currentX, currentY, startX, startY, endX, endY, angle },
        Math.cos(angle),
        "points"
      );
      this.ctx.beginPath();
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
      currentX += this.gapBetweenLine * Math.cos(angle);
      currentY += this.gapBetweenLine * Math.sin(angle);
    }
    this.lastZigzagPoint = { x: currentX, y: currentY };
    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      drawArrowhead(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 2 * Math.cos(angle),
          y: endPoint.y + 2 * Math.sin(angle),
        },
        angle,
        15
      );
    }
  }

  stopDrawing(): void {
    this.isDrawing = false;
    if (this.arrowHeadCanvasCtx && this.ctx) {
      this.ctx.drawImage(this.arrowHeadCanvas, 0, 0);
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
  }
}
export class FreehandLateralSkatingToStop {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  arrowHeadCanvas: HTMLCanvasElement;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  angle: number;
  gapBetweenLine: number;
  linHeight: number;
  lastZigzagPoint: { x: number; y: number }; // To store the path points

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;
    this.arrowHeadCanvas = arrowHeadCanvas;
    this.arrowHeadCanvasCtx = this.arrowHeadCanvas.getContext("2d");
    if (this.arrowHeadCanvasCtx) this.arrowHeadCanvasCtx.lineWidth = 2;
    this.isDrawing = true;
    this.angle = 0;
    this.gapBetweenLine = 10;
    this.linHeight = 15;
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
  }

  draw(newX: number, newY: number): void {
    if (!this.isDrawing) return;
    if (!this.ctx) return;

    const distance = calculateDistance(
      { x: newX, y: newY },
      this.lastZigzagPoint
    );
    // if (distance < this.gapBetweenLine) return;
    this.drawArcZigzag(this.lastZigzagPoint, { x: newX, y: newY });
  }
  drawArcZigzag(
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number }
  ) {
    if (!this.ctx) return;
    const distance = calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    let numOfLines = Math.floor(distance / (this.gapBetweenLine + 2));
    let currentX = startPoint.x;
    let currentY = startPoint.y;
    const perpendicularAngle = angle + Math.PI / 2; // Rotate the angle by 90 degrees
    for (let i = 0; i < numOfLines; i++) {
      let startX =
        currentX + (this.linHeight / 2) * Math.cos(perpendicularAngle);
      let startY =
        currentY + (this.linHeight / 2) * Math.sin(perpendicularAngle);
      let endX = currentX - (this.linHeight / 2) * Math.cos(perpendicularAngle);
      let endY = currentY - (this.linHeight / 2) * Math.sin(perpendicularAngle);

      console.log(
        { currentX, currentY, startX, startY, endX, endY, angle },
        Math.cos(angle),
        "points"
      );
      this.ctx.beginPath();
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
      currentX += this.gapBetweenLine * Math.cos(angle);
      currentY += this.gapBetweenLine * Math.sin(angle);
    }
    this.lastZigzagPoint = { x: currentX, y: currentY };
    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      drawArrowHeadWithBars(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 2 * Math.cos(angle),
          y: endPoint.y + 2 * Math.sin(angle),
        },
        angle,
        15
      );
    }
  }

  stopDrawing(): void {
    this.isDrawing = false;
    if (this.arrowHeadCanvasCtx && this.ctx) {
      this.ctx.drawImage(this.arrowHeadCanvas, 0, 0);
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
  }
}

export class Puck {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(x: number, y: number): void {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, 3, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
}
export class GroupOfPucks {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) this.ctx.lineWidth = 2;
  }

  draw(startX: number, startY: number): void {
    if (!this.ctx) return;
    for (let i = 0; i < 10; i++) {
      const x = startX + Math.random() * 30 + 5; // Add 5px padding from edges
      const y = startY + Math.random() * 30 + 5; // Add 5px padding from edges
      const radius = 3; // Random radius between 5 and 15
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
}

export class RectangleOverlay {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  startX: number = 0;
  startY: number = 0;
  currentX: number = 0;
  currentY: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) {
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"; // Black color, semi-transparent for the border
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    }
  }

  resetDrawing(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.isDrawing = false;
  }

  startDrawing(x: number, y: number): void {
    this.resetDrawing(); // Reset any existing drawing before starting a new one
    this.isDrawing = true;
    this.startX = x;
    this.startY = y;
  }

  draw(x: number, y: number): void {
    console.log("this.isDrawing", this.isDrawing);

    if (!this.isDrawing || !this.ctx) return;
    this.currentX = x;
    this.currentY = y;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    this.ctx.beginPath();
    this.ctx.rect(this.startX, this.startY, x - this.startX, y - this.startY);
    this.ctx.fill();
    this.ctx.stroke();
  }

  stopDrawing(): void {
    this.isDrawing = false;
    // Finalize the drawing if necessary, e.g., save the rectangle data
  }
}
export class RectangleBorder {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  startX: number = 0;
  startY: number = 0;
  currentX: number = 0;
  currentY: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) {
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "rgba(0, 0, 0, 1)"; // Black color, fully opaque for the border
      this.ctx.fillStyle = "rgba(0, 0, 0, 0)"; // No fill
    }
  }

  resetDrawing(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.isDrawing = false;
  }

  startDrawing(x: number, y: number): void {
    this.resetDrawing(); // Reset any existing drawing before starting a new one
    this.isDrawing = true;
    this.startX = x;
    this.startY = y;
  }

  draw(x: number, y: number): void {
    if (!this.isDrawing || !this.ctx) return;
    this.currentX = x;
    this.currentY = y;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    this.ctx.beginPath();
    this.ctx.rect(this.startX, this.startY, x - this.startX, y - this.startY);
    this.ctx.stroke(); // Only stroke the border, no fill
  }

  stopDrawing(): void {
    this.isDrawing = false;
    // Finalize the drawing if necessary, e.g., save the rectangle data
  }
}

export class CircleOverlay {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  startX: number = 0;
  startY: number = 0;
  radius: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) {
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"; // Black color, semi-transparent for the border
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; // Black color, semi-transparent for the fill
    }
  }

  resetDrawing(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.isDrawing = false;
  }

  startDrawing(x: number, y: number): void {
    this.resetDrawing(); // Reset any existing drawing before starting a new one
    this.isDrawing = true;
    this.startX = x;
    this.startY = y;
  }

  draw(x: number, y: number): void {
    if (!this.isDrawing || !this.ctx) return;

    // Calculate the radius based on the distance from the start point to the current point
    this.radius = Math.sqrt(
      Math.pow(x - this.startX, 2) + Math.pow(y - this.startY, 2)
    );

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    this.ctx.beginPath();
    this.ctx.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2, false); // Create a full circle
    this.ctx.fill();
    this.ctx.stroke();
  }

  stopDrawing(): void {
    this.isDrawing = false;
    // Finalize the drawing if necessary, e.g., save the circle data
  }
}

export class BorderedCircle {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  startX: number = 0;
  startY: number = 0;
  radius: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) {
      this.ctx.lineWidth = 2; // Set the border width to match the previous photo
      this.ctx.strokeStyle = "rgba(0, 0, 0, 0.8)"; // Black color for the border
      this.ctx.fillStyle = "rgba(255, 255, 255, 0)";
    }
  }

  resetDrawing(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.isDrawing = false;
  }

  startDrawing(x: number, y: number): void {
    this.resetDrawing(); // Reset any existing drawing before starting a new one
    this.isDrawing = true;
    this.startX = x;
    this.startY = y;
  }

  draw(x: number, y: number): void {
    if (!this.isDrawing || !this.ctx) return;

    // Calculate the radius based on the distance from the start point to the current point
    this.radius = Math.sqrt(
      Math.pow(x - this.startX, 2) + Math.pow(y - this.startY, 2)
    );

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    this.ctx.beginPath();
    this.ctx.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2, false); // Create a full circle
    this.ctx.fill();
    this.ctx.stroke();
  }

  stopDrawing(): void {
    this.isDrawing = false;
    // Finalize the drawing if necessary, e.g., save the circle data
  }
}

export class TriangleOverlay {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  vertices: Array<{ x: number; y: number }> = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) {
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"; // Black color for the border
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; // Grey color, semi-transparent for the fill
    }
  }

  resetDrawing(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.isDrawing = false;
    this.vertices = [];
  }

  startDrawing(x: number, y: number): void {
    this.resetDrawing(); // Reset any existing drawing before starting a new one
    this.isDrawing = true;
    this.vertices.push({ x, y }); // Assuming the triangle's apex is the starting point
  }

  draw(x: number, y: number): void {
    if (!this.isDrawing || !this.ctx || this.vertices.length !== 1) return;

    // Calculate the height of the triangle from the apex to the base
    const height = Math.abs(y - this.vertices[0].y);

    // Calculate the width of the triangle's base using a reasonable ratio
    // Here we assume the base is twice the height for a flat isosceles triangle
    const baseWidth = height * 2;

    // Calculate the base vertices
    const vertex2 = {
      x: this.vertices[0].x - baseWidth / 2,
      y: this.vertices[0].y + height,
    };
    const vertex3 = {
      x: this.vertices[0].x + baseWidth / 2,
      y: this.vertices[0].y + height,
    };

    // Clear the previous drawing
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Begin the path for the triangle
    this.ctx.beginPath();
    this.ctx.moveTo(this.vertices[0].x, this.vertices[0].y); // Apex of the triangle
    this.ctx.lineTo(vertex2.x, vertex2.y); // Left base vertex
    this.ctx.lineTo(vertex3.x, vertex3.y); // Right base vertex
    this.ctx.closePath(); // Close the path to create the last side of the triangle

    // Draw the triangle with the updated style
    this.ctx.stroke();
    this.ctx.fill(); // If you want the triangle to be filled
  }

  stopDrawing(): void {
    this.isDrawing = false;
    // Finalize the drawing if necessary, e.g., save the triangle data
  }
}

export class BorderTriangle {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  startX: number = 0;
  startY: number = 0;
  endX: number = 0;
  endY: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) {
      this.ctx.lineWidth = 2; // Set the border width
      this.ctx.strokeStyle = "rgba(0, 0, 0, 0.8)"; // Black color for the border
    }
  }

  resetDrawing(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.isDrawing = false;
  }

  startDrawing(x: number, y: number): void {
    this.resetDrawing(); // Reset any existing drawing before starting a new one
    this.isDrawing = true;
    this.startX = x;
    this.startY = y;
  }

  draw(x: number, y: number): void {
    if (!this.isDrawing || !this.ctx) return;

    this.endX = x;
    this.endY = y;

    // Calculate the height of the triangle
    const height = Math.sqrt(
      Math.pow(this.endX - this.startX, 2) +
        Math.pow(this.endY - this.startY, 2)
    );

    // Calculate the base vertices assuming an isosceles triangle for simplicity
    const vertex2 = { x: this.startX - height / 2, y: this.endY };
    const vertex3 = { x: this.startX + height / 2, y: this.endY };

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY); // Top vertex
    this.ctx.lineTo(vertex2.x, vertex2.y); // Bottom left vertex
    this.ctx.lineTo(vertex3.x, vertex3.y); // Bottom right vertex
    this.ctx.closePath();
    this.ctx.stroke();
  }

  stopDrawing(): void {
    this.isDrawing = false;
    // Finalize the drawing if necessary, e.g., save the triangle data
  }
}

export class StraightLine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  startX: number = 0;
  startY: number = 0;
  endX: number = 0;
  endY: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) {
      this.ctx.lineWidth = 2; // Set the line width
      this.ctx.strokeStyle = "rgba(0, 0, 0, 0.8)"; // Black color for the line
    }
  }

  startDrawing(x: number, y: number): void {
    this.isDrawing = true;
    this.startX = x;
    this.startY = y;
  }

  draw(x: number, y: number): void {
    if (!this.isDrawing || !this.ctx) return;

    this.endX = x;
    this.endY = y;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY); // Start point of the line
    this.ctx.lineTo(this.endX, this.endY); // End point of the line
    this.ctx.stroke(); // Draw the line
  }

  stopDrawing(): void {
    this.isDrawing = false;
  }
}

export class FreehandLine {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  points: Array<{ x: number; y: number }>;

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
    if (!this.isDrawing || !this.ctx) return;
    const lastPoint = this.points[this.points.length - 1];
    if (!(calculateDistance(lastPoint, { x: newX, y: newY }) > 5)) return;
    this.ctx.beginPath();
    this.ctx.moveTo(lastPoint.x, lastPoint.y);
    this.ctx.lineTo(newX, newY);
    this.ctx.stroke();

    this.addPoint(newX, newY);
  }

  addPoint(pointX: number, pointY: number): void {
    this.points.push({ x: pointX, y: pointY });
  }

  bzCurve() {
    const f = 0.3;
    const t = 0.6;

    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);

    var m = 0;
    var dx1 = 0;
    var dy1 = 0;
    var dx2 = 0;
    var dy2 = 0;

    var preP = this.points[0];

    for (var i = 1; i < this.points.length; i++) {
      var curP = this.points[i];
      var nexP = this.points[i + 1];
      if (nexP) {
        m = calculateAngle(preP, nexP);
        dx2 = (nexP.x - curP.x) * -f;
        dy2 = dx2 * m * t;
      } else {
        dx2 = 0;
        dy2 = 0;
      }

      this.ctx.bezierCurveTo(
        preP.x - dx1,
        preP.y - dy1,
        curP.x + dx2,
        curP.y + dy2,
        curP.x,
        curP.y
      );

      dx1 = dx2;
      dy1 = dy2;
      preP = curP;
    }
    this.ctx.stroke();
  }
  stopDrawing(): void {
    this.isDrawing = false;
  }
}

export class StraightDashedLine {
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
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
    this.isDrawing = true;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) {
      this.ctx.lineWidth = 2;
    }
  }

  draw(newX: number, newY: number): void {
    if (this.ctx && this.isDrawing) {
      // Clear the canvas before drawing the new line
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Begin a new path for the new line
      this.ctx.lineWidth = 2; // Increase this value to make the stroke wider
      this.ctx.setLineDash([10, 3]); // 5 pixels of line followed by 3 pixels of space
      this.ctx.beginPath();
      // Move to the initial point
      this.ctx.moveTo(this.x, this.y);
      // Draw a line to the current mouse position
      this.ctx.lineTo(newX, newY);
      // Actually draw the line
      this.ctx.stroke();

      // Draw arrow head (solid line)
      this.ctx.setLineDash([]); // Reset to solid line for the arrowhead
    }
  }
  stopDrawing() {
    this.isDrawing = false;
  }
}

export class FreehandDashedLine {
  canvas: HTMLCanvasElement;
  isDrawing: boolean = false;
  ctx: CanvasRenderingContext2D | null;
  points: Array<{ x: number; y: number }>; // Store all points

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.points = []; // Initialize the points array

    if (this.ctx) {
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      this.ctx.setLineDash([10, 5]); // Set the dashed line pattern
    }
  }

  startDrawing(x: number, y: number): void {
    this.isDrawing = true;
    this.points.push({ x, y }); // Start with the first point
  }

  draw(x: number, y: number): void {
    if (!this.ctx || !this.isDrawing) return;

    // Add the new point to the points array
    this.points.push({ x, y });

    // Clear the canvas before drawing the new line
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Begin a new path for the dashed line
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);

    // Draw a line through all points
    for (const point of this.points) {
      this.ctx.lineTo(point.x, point.y);
    }

    // Actually draw the dashed line
    this.ctx.stroke();
  }

  stopDrawing(): void {
    this.isDrawing = false;
    // Reset the dashed line pattern to solid after drawing
    this.ctx?.setLineDash([]);
  }
}
