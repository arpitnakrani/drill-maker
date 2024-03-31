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
    if (this.ctx) {
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // this.bzCurve(); // Redraw the smoothed curve

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
    console.log(this.points, "points");
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
    if (this.ctx && this.points.length > 1 && this.arrowHeadCanvasCtx) {
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
    const distance = this.calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    const numArcs = Math.max(1, Math.floor(distance / (2 * this.radius)));

    for (let i = 1; i <= numArcs; i++) {
      const arcDistance = 2 * this.radius * i;
      const arcRatio = arcDistance / distance;
      const arcPoint = {
        x: startPoint.x + (endPoint.x - startPoint.x) * arcRatio,
        y: startPoint.y + (endPoint.y - startPoint.y) * arcRatio,
      };

      if (this.ctx) {
        this.ctx.beginPath();
        this.ctx.arc(
          arcPoint.x,
          arcPoint.y,
          this.radius,
          angle + Math.PI,
          angle,
          this.direction
        );
        this.ctx.stroke();
        this.direction = !this.direction;
      }
    }

    this.lastZigzagPoint = endPoint;
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
    const distance = this.calculateDistance(startPoint, endPoint);
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );
    const numArcs = Math.max(1, Math.floor(distance / (2 * this.radius)));

    for (let i = 1; i <= numArcs; i++) {
      const arcDistance = 2 * this.radius * i;
      const arcRatio = arcDistance / distance;
      const arcPoint = {
        x: startPoint.x + (endPoint.x - startPoint.x) * arcRatio,
        y: startPoint.y + (endPoint.y - startPoint.y) * arcRatio,
      };

      if (this.ctx) {
        this.ctx.beginPath();
        this.ctx.arc(
          arcPoint.x,
          arcPoint.y,
          this.radius,
          angle + Math.PI,
          angle,
          this.direction
        );
        this.ctx.stroke();
        this.direction = !this.direction;
      }
    }

    this.lastZigzagPoint = endPoint;
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
    this.angle = angle;
    let rounds = 0;
    let tempX = startPoint.x + this.radius * Math.cos(angle);
    let tempY = startPoint.y + this.radius * Math.sin(angle);
    while (rounds <= distance / (5 * this.radius)) {
      if (this.ctx) {
        //upper arc
        this.ctx.beginPath();
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle);
        this.ctx.stroke();
        //middle filled circle
        this.ctx.beginPath();
        this.ctx.arc(tempX, tempY, this.radius / 2, 0, Math.PI * 2);
        this.ctx.fill();
        //lower arc
        this.ctx.beginPath();
        tempX += this.radius * Math.cos(angle);
        tempY += this.radius * Math.sin(angle);
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle, true);
        this.ctx.stroke();
        tempX += this.radius * Math.cos(angle) * 2;
        tempY += this.radius * Math.sin(angle) * 2;
      }
      rounds += 1;
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
    this.angle = angle;
    let rounds = 0;
    let tempX = startPoint.x + this.radius * Math.cos(angle);
    let tempY = startPoint.y + this.radius * Math.sin(angle);
    while (rounds <= distance / (5 * this.radius)) {
      if (this.ctx) {
        //upper arc
        this.ctx.beginPath();
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle);
        this.ctx.stroke();
        //middle filled circle
        this.ctx.beginPath();
        this.ctx.arc(tempX, tempY, this.radius / 2, 0, Math.PI * 2);
        this.ctx.fill();
        //lower arc
        this.ctx.beginPath();
        tempX += this.radius * Math.cos(angle);
        tempY += this.radius * Math.sin(angle);
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle, true);
        this.ctx.stroke();
        tempX += this.radius * Math.cos(angle) * 2;
        tempY += this.radius * Math.sin(angle) * 2;
      }
      rounds += 1;
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
    this.angle = angle;
    let rounds = 0;
    let tempX = startPoint.x + this.radius * Math.cos(angle);
    let tempY = startPoint.y + this.radius * Math.sin(angle);
    while (rounds <= distance / (5 * this.radius)) {
      if (this.ctx) {
        //upper arc
        this.ctx.beginPath();
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle);
        this.ctx.stroke();

        //lower arc
        this.ctx.beginPath();
        tempX += this.radius * Math.cos(angle);
        tempY += this.radius * Math.sin(angle);
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle, true);
        this.ctx.stroke();
        tempX += this.radius * Math.cos(angle) * 2;
        tempY += this.radius * Math.sin(angle) * 2;
      }
      rounds += 1;
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
    this.angle = angle;
    let rounds = 0;
    let tempX = startPoint.x + this.radius * Math.cos(angle);
    let tempY = startPoint.y + this.radius * Math.sin(angle);
    while (rounds <= distance / (5 * this.radius)) {
      if (this.ctx) {
        //upper arc
        this.ctx.beginPath();
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle);
        this.ctx.stroke();

        //lower arc
        this.ctx.beginPath();
        tempX += this.radius * Math.cos(angle);
        tempY += this.radius * Math.sin(angle);
        this.ctx.arc(tempX, tempY, this.radius, angle + Math.PI, angle, true);
        this.ctx.stroke();
        tempX += this.radius * Math.cos(angle) * 2;
        tempY += this.radius * Math.sin(angle) * 2;
      }
      rounds += 1;
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
    if (distance < 7) return;
    this.addPoint(newX, newY);
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
      const lineGap = 5; // Gap between parallel lines
      const lineHeight = 12; // Gap between parallel lines
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
    if (this.ctx) {
      const lastPoint = this.points[this.points.length - 1];
      drawArrowhead(
        this.ctx,
        {
          x: lastPoint.x + 10 * Math.cos(this.angle - Math.PI / 2),
          y: lastPoint.y + 10 * Math.sin(this.angle - Math.PI / 2),
        },
        this.angle - Math.PI / 2,
        12
      );
    }
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
    if (distance < 7) return;
    this.addPoint(newX, newY);
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
      const lineGap = 5; // Gap between parallel lines
      const lineHeight = 12; // Gap between parallel lines
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
    if (this.ctx) {
      const lastPoint = this.points[this.points.length - 1];
      drawArrowHeadWithBars(
        this.ctx,
        {
          x: lastPoint.x + 10 * Math.cos(this.angle - Math.PI / 2),
          y: lastPoint.y + 10 * Math.sin(this.angle - Math.PI / 2),
        },
        this.angle - Math.PI / 2,
        12
      );
    }
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