import { TPoint } from "@/types/curves";
import { CurveTypes, DrillActions } from "@/types/drill-actions";
import { calculateAngle } from "@/utils/calculateAngle";
import { calculateDistance } from "@/utils/calculateDistance";
import { drawArrowhead } from "@/utils/drawArrowHead";
import { drawArrowHeadWithBars } from "@/utils/drawArrowHeadWithBars";
import { drawPass, drawShot } from "@/utils/drawStaight";
import {
  drawArcZigzagBackward,
  drawArcZigzagPuck,
  drawArcZigzagWithoutBackward,
  drawLateralSkating,
} from "@/utils/drawZigZag";
import { smoothCurve } from "@/utils/smoothCurve";

export interface IDrillCurve {
  imagePath: string;
  label: string;
  actionType: DrillActions; //this field is created to track which action is perfrom by user , like drawing curve , drawing image , inserting text or delete,
  curveType: CurveTypes; // this is field is spesific for the curves because how can i know which shape is drawing ?
  active: boolean; // this field  is for which curve is selected by user
}

// all the curves object are listed below
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
    actionType: DrillActions.geometry,
    curveType: CurveTypes.rectangle,
    imagePath: "svgs/drill-curves-svgs/filled-rectangle.svg",
    label: "Zigzag",
    active: true,
  },
  {
    actionType: DrillActions.geometry,
    curveType: CurveTypes.filledRectangle,
    imagePath: "svgs/drill-curves-svgs/rectangle.svg",
    label: "Curve",
    active: true,
  },
  {
    actionType: DrillActions.geometry,
    curveType: CurveTypes.circle,
    imagePath: "svgs/drill-curves-svgs/circle.svg",
    label: "Circle",
    active: true,
  },

  {
    actionType: DrillActions.geometry,
    curveType: CurveTypes.filledCircle,
    imagePath: "svgs/drill-curves-svgs/filled-circle.svg",
    label: "Filled Circle",
    active: true,
  },
  {
    actionType: DrillActions.geometry,
    curveType: CurveTypes.triangle,
    imagePath: "svgs/drill-curves-svgs/triangle.svg",
    label: "Triangle",
    active: true,
  },
  {
    actionType: DrillActions.geometry,
    curveType: CurveTypes.filledTriangle,
    imagePath: "svgs/drill-curves-svgs/filled-triangle.svg",
    label: "Filled Triangle",
    active: true,
  },
  // {
  //   actionType: DrillActions.curve,
  //   curveType: CurveTypes.starightLine,
  //   imagePath: "svgs/drill-curves-svgs/square.svg",
  //   label: "Square",
  //   active: true,
  // },
  // {
  //   actionType: DrillActions.curve,
  //   curveType: CurveTypes.freehandLine,
  //   imagePath: "svgs/drill-curves-svgs/filled-square.svg",
  //   label: "Filled Square",
  //   active: true,
  // },
  // {
  //   actionType: DrillActions.curve,
  //   curveType: CurveTypes.straightDashedLine,
  //   imagePath: "svgs/drill-curves-svgs/hollow-square.svg",
  //   label: "Hollow Square",
  //   active: true,
  // },
  // {
  //   actionType: DrillActions.curve,
  //   curveType: CurveTypes.freehandDashedLine,
  //   imagePath: "svgs/drill-curves-svgs/diagonal-hatch-square.svg",
  //   label: "Diagonal Hatch Square",
  //   active: true,
  // },
  // ... add other shapes as needed
];

// i used class to demonstare all the shapes, all the class have 2 same properties , draw and stop drawing and rest are change basis on curve's complexity

// 1. this shape is used for freehand curve , where logic is to store points in number and then join those points because at the end we have to smooth the curves that time we need this points,
export class FreeHandSkate {
  canvasWidth: number;
  canvasHeight: number;
  isDrawing: boolean = false;
  points: Array<{ x: number; y: number }>;
  tempCanvasCtx: CanvasRenderingContext2D;
  arrowHeadCanvasCtx: CanvasRenderingContext2D;
  type: string;
  constructor(
    startingPointX: number,
    startingPointY: number,
    tempCanvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.isDrawing = true;
    this.tempCanvasCtx = tempCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.canvasWidth = tempCanvas.width;
    this.canvasHeight = tempCanvas.height;
    this.type = "FREEHAND";
  }

  draw(newX: number, newY: number): void {
    if (!this.isDrawing || !this.tempCanvasCtx || !this.arrowHeadCanvasCtx)
      return;
    const lastPoint = this.points[this.points.length - 1];
    const currrentPoint = { x: newX, y: newY };
    if (!(calculateDistance(lastPoint, currrentPoint) > 5)) return;
    this.tempCanvasCtx.beginPath();
    this.tempCanvasCtx.moveTo(lastPoint.x, lastPoint.y);
    this.tempCanvasCtx.lineTo(newX, newY);
    this.tempCanvasCtx.stroke();
    console.log(this.canvasWidth, this.canvasHeight);
    //arrowhead
    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      const angle = Math.atan2(newY - lastPoint.y, newX - lastPoint.x);
      drawArrowhead(this.arrowHeadCanvasCtx, { x: newX, y: newY }, angle, 15);
    }

    this.addPoint(newX, newY);
  }

  addPoint(pointX: number, pointY: number): void {
    this.points.push({ x: pointX, y: pointY });
  }

  stopDrawing(): void {
    this.isDrawing = false;
    if (this.tempCanvasCtx) {
      this.tempCanvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      smoothCurve({ canvasContext: this.tempCanvasCtx, points: this.points }); // Redraw the smoothed curve
    }
  }
  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    smoothCurve({ canvasContext: canvasCtx, points }); // Redraw the smoothed curve
    const lastPoint = points[points.length - 1];
    const secondLastPoint = points[points.length - 2];
    const angle = calculateAngle(secondLastPoint, lastPoint);
    drawArrowhead(canvasCtx, lastPoint, angle, 15);
  }
}

//2. this shape is same logic as freehandskate but the difference is with arrowhead
export class FreeHandSkateWithStop {
  canvasWidth: number;
  canvasHeight: number;
  isDrawing: boolean = false;
  points: Array<{ x: number; y: number }>;
  tempCanvasCtx: CanvasRenderingContext2D;
  arrowHeadCanvasCtx: CanvasRenderingContext2D;
  type: string;
  constructor(
    startingPointX: number,
    startingPointY: number,
    tempCanvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.isDrawing = true;
    this.tempCanvasCtx = tempCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.canvasWidth = tempCanvas.width;
    this.canvasHeight = tempCanvas.height;
    this.type = "FREEHAND";
  }

  draw(newX: number, newY: number): void {
    if (!this.isDrawing || !this.tempCanvasCtx || !this.arrowHeadCanvasCtx)
      return;
    const lastPoint = this.points[this.points.length - 1];
    const currentPoint = { x: newX, y: newY };
    if (!(calculateDistance(lastPoint, currentPoint) > 5)) return;
    this.tempCanvasCtx.beginPath();
    this.tempCanvasCtx.moveTo(lastPoint.x, lastPoint.y);
    this.tempCanvasCtx.lineTo(newX, newY);
    this.tempCanvasCtx.stroke();
    console.log(this.canvasWidth, this.canvasHeight);
    //arrowhead
    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
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

  stopDrawing(): void {
    this.isDrawing = false;
    if (this.tempCanvasCtx) {
      this.tempCanvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      smoothCurve({ canvasContext: this.tempCanvasCtx, points: this.points }); // Redraw the smoothed curve
    }
  }
  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    smoothCurve({ canvasContext: canvasCtx, points }); // Redraw the smoothed curve
    const lastPoint = points[points.length - 1];
    const secondLastPoint = points[points.length - 2];
    const angle = calculateAngle(secondLastPoint, lastPoint);
    drawArrowHeadWithBars(
      canvasCtx,
      { x: lastPoint.x, y: lastPoint.y },
      angle,
      15
    );
  }
}

export class StraightSkate {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  points: Array<{ x: number; y: number }>;
  type: string;

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
    this.points = [
      {
        x: startingPointX,
        y: startingPointY,
      },
    ];
    this.type = "STRAIGHT";
  }

  draw(newX: number, newY: number): void {
    if (this.ctx && this.isDrawing) {
      this.points[1] = {
        x: newX,
        y: newY,
      };
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

  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    const startPoint = points[0];
    const endPoint = points[1];
    canvasCtx.beginPath();

    canvasCtx.moveTo(startPoint.x, startPoint.y);
    canvasCtx.lineTo(endPoint.x, endPoint.y);
    canvasCtx.stroke();
    const angle = calculateAngle(startPoint, endPoint);
    drawArrowhead(canvasCtx, endPoint, angle, 15);
  }
}
export class StraightSkateWithStop {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  points: Array<{ x: number; y: number }>;
  type: string;

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
    this.points = [
      {
        x: startingPointX,
        y: startingPointY,
      },
    ];
    this.type = "STRAIGHT";
  }

  draw(newX: number, newY: number): void {
    if (this.ctx && this.isDrawing) {
      this.points[1] = {
        x: newX,
        y: newY,
      };
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

  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    const startPoint = points[0];
    const endPoint = points[1];
    canvasCtx.beginPath();

    canvasCtx.moveTo(startPoint.x, startPoint.y);
    canvasCtx.lineTo(endPoint.x, endPoint.y);
    canvasCtx.stroke();
    const angle = calculateAngle(startPoint, endPoint);
    drawArrowHeadWithBars(canvasCtx, endPoint, angle, 15);
  }
}

export class FreeHandSkateWithPuck {
  tempCanvasCtx: CanvasRenderingContext2D | null;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  isDrawing: boolean = false;
  direction: boolean;
  radius: number;
  angle: number;
  canvasWidth: number;
  canvasHeight: number;
  points: Array<{ x: number; y: number }>;
  type: string;

  constructor(
    startingPointX: number,
    startingPointY: number,
    tempCanvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.tempCanvasCtx = tempCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    this.isDrawing = true;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.radius = 5;
    this.angle = 0;
    this.direction = false;
    this.canvasWidth = tempCanvas.width;
    this.canvasHeight = tempCanvas.height;
    this.type = "FREEHAND";
  }

  draw(newX: number, newY: number) {
    console.log(this.points, "points");

    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = calculateDistance(this.lastZigzagPoint, currentPoint);

    if (distance >= this.radius * 2) {
      this.points.push(this.lastZigzagPoint);
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
    }
  }

  drawArcZigzag(
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number }
  ) {
    if (!this.tempCanvasCtx) return;
    const distance = calculateDistance(startPoint, endPoint);
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
      this.tempCanvasCtx.beginPath();
      this.tempCanvasCtx.arc(
        centerX,
        centerY,
        this.radius,
        Math.PI + angle,
        angle,
        this.direction
      );
      this.direction = !this.direction;
      this.tempCanvasCtx.stroke();
      currentX += this.radius * 2 * Math.cos(angle);
      currentY += this.radius * 2 * Math.sin(angle);
    }

    this.lastZigzagPoint = { x: currentX, y: currentY };
    this.points.push({ x: currentX, y: currentY });
    this.angle = angle;

    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
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
  }
  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    let direction = false;
    let startPoint = points[0];
    console.log(points, "points");
    for (let i = 0; i < points.length - 1; i++) {
      const data = drawArcZigzagPuck({
        canvasContext: canvasCtx,
        endPoint: points[i + 1],
        startPoint,
        lastDirection: direction,
        radius: 5,
      });
      direction = data.lastDirection;
      startPoint = data.lastZigzagPoint;
    }
    const lastPoint = points[points.length - 1];
    const secondLastPoint = points[points.length - 2];
    const angle = calculateAngle(secondLastPoint, lastPoint);
    drawArrowhead(canvasCtx, lastPoint, angle, 15);
  }
}

export class FreeHandSkateWithPuckAndStop {
  tempCanvasCtx: CanvasRenderingContext2D | null;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  isDrawing: boolean = false;
  direction: boolean;
  radius: number;
  angle: number;
  canvasWidth: number;
  canvasHeight: number;
  points: Array<{ x: number; y: number }>;
  type: string;

  constructor(
    startingPointX: number,
    startingPointY: number,
    tempCanvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.tempCanvasCtx = tempCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    this.isDrawing = true;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.radius = 5;
    this.angle = 0;
    this.direction = false;
    this.canvasWidth = tempCanvas.width;
    this.canvasHeight = tempCanvas.height;
    this.type = "FREEHAND";
  }

  draw(newX: number, newY: number) {
    console.log(this.points, "points");

    if (!this.isDrawing || !this.lastZigzagPoint) return;
    const currentPoint = { x: newX, y: newY };
    const distance = calculateDistance(this.lastZigzagPoint, currentPoint);

    if (distance >= this.radius * 2) {
      this.points.push(this.lastZigzagPoint);
      this.drawArcZigzag(this.lastZigzagPoint, currentPoint);
    }
  }

  drawArcZigzag(
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number }
  ) {
    if (!this.tempCanvasCtx) return;
    const distance = calculateDistance(startPoint, endPoint);
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
      this.tempCanvasCtx.beginPath();
      this.tempCanvasCtx.arc(
        centerX,
        centerY,
        this.radius,
        Math.PI + angle,
        angle,
        this.direction
      );
      this.direction = !this.direction;
      this.tempCanvasCtx.stroke();
      currentX += this.radius * 2 * Math.cos(angle);
      currentY += this.radius * 2 * Math.sin(angle);
    }

    this.lastZigzagPoint = { x: currentX, y: currentY };
    this.points.push(this.lastZigzagPoint);
    this.angle = angle;

    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
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
  }
  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    let direction = false;
    let startPoint = points[0];
    console.log(points, "points");
    for (let i = 0; i < points.length - 1; i++) {
      const data = drawArcZigzagPuck({
        canvasContext: canvasCtx,
        endPoint: points[i + 1],
        startPoint,
        lastDirection: direction,
        radius: 5,
      });
      direction = data.lastDirection;
      startPoint = data.lastZigzagPoint;
    }
    const lastPoint = points[points.length - 1];
    const secondLastPoint = points[points.length - 2];
    const angle = calculateAngle(secondLastPoint, lastPoint);
    drawArrowHeadWithBars(canvasCtx, lastPoint, angle, 15);
  }
}
export class FreehandSkateBackwardWithPuckAndStop {
  tempCanvasCtx: CanvasRenderingContext2D | null;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  isDrawing: boolean = false;
  direction: boolean;
  radius: number;
  canvasWidth: number;
  canvasHeight: number;
  points: Array<{ x: number; y: number }>;
  type: string;
  constructor(
    startingPointX: number,
    startingPointY: number,
    tempCanvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.tempCanvasCtx = tempCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    this.isDrawing = true;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.radius = 5;
    this.direction = false;
    this.canvasWidth = tempCanvas.width;
    this.canvasHeight = tempCanvas.height;
    this.type = "FREEHAND";
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
    if (!this.tempCanvasCtx) return;
    const data = drawArcZigzagBackward({
      canvasContext: this.tempCanvasCtx,
      endPoint,
      startPoint,
      lastDirection: this.direction,
      radius: this.radius,
    });

    this.lastZigzagPoint = data.lastZigzagPoint;
    this.direction = data.lastDirection;
    this.points.push(this.lastZigzagPoint);

    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      drawArrowHeadWithBars(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 10 * Math.cos(data.angle),
          y: endPoint.y + 10 * Math.sin(data.angle),
        },
        data.angle,
        15
      );
    }
  }
  stopDrawing(): void {
    this.isDrawing = false;
  }
  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    let direction = false;
    let startPoint = points[0];
    console.log(points, "points");
    for (let i = 0; i < points.length - 1; i++) {
      const data = drawArcZigzagBackward({
        canvasContext: canvasCtx,
        endPoint: points[i + 1],
        startPoint,
        lastDirection: direction,
        radius: 5,
      });
      direction = data.lastDirection;
      startPoint = data.lastZigzagPoint;
    }
    const lastPoint = points[points.length - 1];
    const secondLastPoint = points[points.length - 2];
    const angle = calculateAngle(secondLastPoint, lastPoint);
    drawArrowHeadWithBars(canvasCtx, lastPoint, angle, 15);
  }
}
export class FreehandSkateBackwardWithPuck {
  tempCanvasCtx: CanvasRenderingContext2D | null;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  isDrawing: boolean = false;
  direction: boolean;
  radius: number;
  canvasWidth: number;
  canvasHeight: number;
  points: Array<{ x: number; y: number }>;
  type: string;
  constructor(
    startingPointX: number,
    startingPointY: number,
    tempCanvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.tempCanvasCtx = tempCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    this.isDrawing = true;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.radius = 5;
    this.direction = false;
    this.canvasWidth = tempCanvas.width;
    this.canvasHeight = tempCanvas.height;
    this.type = "FREEHAND";
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
    if (!this.tempCanvasCtx) return;
    const data = drawArcZigzagBackward({
      canvasContext: this.tempCanvasCtx,
      endPoint,
      startPoint,
      lastDirection: this.direction,
      radius: this.radius,
    });

    this.lastZigzagPoint = data.lastZigzagPoint;
    this.direction = data.lastDirection;
    this.points.push(this.lastZigzagPoint);

    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      drawArrowhead(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 10 * Math.cos(data.angle),
          y: endPoint.y + 10 * Math.sin(data.angle),
        },
        data.angle,
        15
      );
    }
  }
  stopDrawing(): void {
    this.isDrawing = false;
  }
  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    let direction = false;
    let startPoint = points[0];
    console.log(points, "points");
    for (let i = 0; i < points.length - 1; i++) {
      const data = drawArcZigzagBackward({
        canvasContext: canvasCtx,
        endPoint: points[i + 1],
        startPoint,
        lastDirection: direction,
        radius: 5,
      });
      direction = data.lastDirection;
      startPoint = data.lastZigzagPoint;
    }
    const lastPoint = points[points.length - 1];
    const secondLastPoint = points[points.length - 2];
    const angle = calculateAngle(secondLastPoint, lastPoint);
    drawArrowhead(canvasCtx, lastPoint, angle, 15);
  }
}

export class FreehandSkateBackwardWithoutPuckAndStop {
  tempCanvasCtx: CanvasRenderingContext2D | null;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  isDrawing: boolean = false;
  direction: boolean;
  radius: number;
  canvasWidth: number;
  canvasHeight: number;
  points: Array<{ x: number; y: number }>;
  type: string;
  constructor(
    startingPointX: number,
    startingPointY: number,
    tempCanvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.tempCanvasCtx = tempCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    this.isDrawing = true;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.radius = 5;
    this.direction = false;
    this.canvasWidth = tempCanvas.width;
    this.canvasHeight = tempCanvas.height;
    this.type = "FREEHAND";
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
    if (!this.tempCanvasCtx) return;
    const data = drawArcZigzagWithoutBackward({
      canvasContext: this.tempCanvasCtx,
      endPoint,
      lastDirection: this.direction,
      radius: this.radius,
      startPoint,
    });

    this.lastZigzagPoint = data.lastZigzagPoint;
    this.direction = data.lastDirection;
    this.points.push(this.lastZigzagPoint);

    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      drawArrowHeadWithBars(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 10 * Math.cos(data.angle),
          y: endPoint.y + 10 * Math.sin(data.angle),
        },
        data.angle,
        15
      );
    }
  }
  stopDrawing(): void {
    this.isDrawing = false;
  }
  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    let direction = false;
    let startPoint = points[0];
    console.log(points, "points");
    for (let i = 0; i < points.length - 1; i++) {
      const data = drawArcZigzagWithoutBackward({
        canvasContext: canvasCtx,
        endPoint: points[i + 1],
        startPoint,
        lastDirection: direction,
        radius: 5,
      });
      direction = data.lastDirection;
      startPoint = data.lastZigzagPoint;
    }
    const lastPoint = points[points.length - 1];
    const secondLastPoint = points[points.length - 2];
    const angle = calculateAngle(secondLastPoint, lastPoint);
    drawArrowHeadWithBars(canvasCtx, lastPoint, angle, 15);
  }
}
export class FreehandSkateBackwardWithoutPuck {
  tempCanvasCtx: CanvasRenderingContext2D | null;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;
  lastZigzagPoint: { x: number; y: number } | null; // To store the path points
  isDrawing: boolean = false;
  direction: boolean;
  radius: number;
  canvasWidth: number;
  canvasHeight: number;
  points: Array<{ x: number; y: number }>;
  type: string;
  constructor(
    startingPointX: number,
    startingPointY: number,
    tempCanvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.tempCanvasCtx = tempCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    this.isDrawing = true;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.radius = 5;
    this.direction = false;
    this.canvasWidth = tempCanvas.width;
    this.canvasHeight = tempCanvas.height;
    this.type = "FREEHAND";
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
    if (!this.tempCanvasCtx) return;
    const data = drawArcZigzagWithoutBackward({
      canvasContext: this.tempCanvasCtx,
      endPoint,
      lastDirection: this.direction,
      radius: this.radius,
      startPoint,
    });

    this.lastZigzagPoint = data.lastZigzagPoint;
    this.direction = data.lastDirection;
    this.points.push(this.lastZigzagPoint);

    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      drawArrowhead(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 10 * Math.cos(data.angle),
          y: endPoint.y + 10 * Math.sin(data.angle),
        },
        data.angle,
        15
      );
    }
  }
  stopDrawing(): void {
    this.isDrawing = false;
  }
  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    let direction = false;
    let startPoint = points[0];
    console.log(points, "points");
    for (let i = 0; i < points.length - 1; i++) {
      const data = drawArcZigzagWithoutBackward({
        canvasContext: canvasCtx,
        endPoint: points[i + 1],
        startPoint,
        lastDirection: direction,
        radius: 5,
      });
      direction = data.lastDirection;
      startPoint = data.lastZigzagPoint;
    }
    const lastPoint = points[points.length - 1];
    const secondLastPoint = points[points.length - 2];
    const angle = calculateAngle(secondLastPoint, lastPoint);
    drawArrowhead(canvasCtx, lastPoint, angle, 15);
  }
}

export class Pass {
  x: number;
  y: number;
  tempCanvasCtx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  points: Array<{ x: number; y: number }>;
  type: string;
  canvasWidth: number;
  canvasHeight: number;
  constructor(
    startingPointX: number,
    startingPointY: number,
    tempCanvas: HTMLCanvasElement
  ) {
    this.x = startingPointX;
    this.y = startingPointY;
    this.tempCanvasCtx = tempCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.canvasWidth = tempCanvas.width;
    this.canvasHeight = tempCanvas.height;
    this.isDrawing = true;

    this.points = [
      {
        x: startingPointX,
        y: startingPointY,
      },
    ];
    this.type = "STRAIGHT";
  }

  draw(newX: number, newY: number): void {
    if (this.tempCanvasCtx && this.isDrawing) {
      // Clear the canvas before drawing the new line
      this.tempCanvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.points[1] = {
        x: newX,
        y: newY,
      };
      const startPoint = this.points[0];
      const endPoint = this.points[1];
      drawPass({
        canvasContext: this.tempCanvasCtx,
        endPoint: this.points[1],
        startPoint: this.points[0],
      });
      const angle = calculateAngle(startPoint, endPoint);
      drawArrowhead(this.tempCanvasCtx, endPoint, angle, 15);
    }
  }
  stopDrawing() {
    this.isDrawing = false;
  }
  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    if (points.length < 2) return;
    const startPoint = points[0];
    const endPoint = points[1];
    drawPass({
      canvasContext: canvasCtx,
      endPoint,
      startPoint,
    });
    const angle = calculateAngle(startPoint, endPoint);
    drawArrowhead(canvasCtx, endPoint, angle, 15);
  }
}
export class Shot {
  x: number;
  y: number;
  tempCanvasCtx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  points: Array<{ x: number; y: number }>;
  type: string;
  canvasWidth: number;
  canvasHeight: number;
  lineOffset: number; // Distance between the two parallel lines

  constructor(
    startingPointX: number,
    startingPointY: number,
    tempCanvas: HTMLCanvasElement
  ) {
    this.x = startingPointX;
    this.y = startingPointY;
    this.tempCanvasCtx = tempCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.canvasWidth = tempCanvas.width;
    this.canvasHeight = tempCanvas.height;
    this.isDrawing = true;
    this.lineOffset = 5; // Set the desired offset for parallel lines
    this.points = [
      {
        x: startingPointX,
        y: startingPointY,
      },
    ];
    this.type = "STRAIGHT";
  }

  draw(newX: number, newY: number): void {
    if (!this.tempCanvasCtx || !this.isDrawing) return;

    // Clear the canvas before drawing the new lines
    this.tempCanvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.points[1] = {
      x: newX,
      y: newY,
    };
    // Calculate the angle of the line
    const startPoint = this.points[0];
    const endPoint = this.points[1];
    const angle = calculateAngle(startPoint, endPoint);
    drawShot({
      canvasContext: this.tempCanvasCtx,
      endPoint,
      lineOffset: this.lineOffset,
      startPoint,
    });

    // arrowHead Logic
    const midPointX = endPoint.x + 10 * Math.cos(angle);
    const midPointY = endPoint.y + 10 * Math.sin(angle);

    drawArrowhead(
      this.tempCanvasCtx,
      { x: midPointX, y: midPointY },
      angle,
      15
    );
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    if (points.length < 2) return;
    const startPoint = points[0];
    const endPoint = points[1];
    drawShot({
      canvasContext: canvasCtx,
      endPoint,
      startPoint,
      lineOffset: 5,
    });
    const angle = calculateAngle(startPoint, endPoint);
    const midPointX = endPoint.x + 10 * Math.cos(angle);
    const midPointY = endPoint.y + 10 * Math.sin(angle);
    drawArrowhead(canvasCtx, { x: midPointX, y: midPointY }, angle, 15);
  }
}

export class FreehandLateralSkating {
  tempCanvasCtx: CanvasRenderingContext2D | null;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;
  lastZigzagPoint: { x: number; y: number }; // To store the path points
  isDrawing: boolean = false;
  direction: boolean;
  radius: number;
  canvasWidth: number;
  canvasHeight: number;
  points: Array<{ x: number; y: number }>;
  type: string;
  gapBetweenLine: number;
  linHeight: number;
  constructor(
    startingPointX: number,
    startingPointY: number,
    tempCanvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.tempCanvasCtx = tempCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    this.isDrawing = true;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.radius = 5;
    this.direction = false;
    this.gapBetweenLine = 10;
    this.linHeight = 15;
    this.canvasWidth = tempCanvas.width;
    this.canvasHeight = tempCanvas.height;
    this.type = "FREEHAND";
  }

  draw(newX: number, newY: number): void {
    if (!this.isDrawing) return;
    if (!this.tempCanvasCtx) return;

    const distance = calculateDistance(
      { x: newX, y: newY },
      this.lastZigzagPoint
    );
    if (distance < this.gapBetweenLine) return;
    this.drawArcZigzag(this.lastZigzagPoint, { x: newX, y: newY });
  }
  drawArcZigzag(
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number }
  ) {
    if (!this.tempCanvasCtx) return;
    const data = drawLateralSkating({
      canvasContext: this.tempCanvasCtx,
      endPoint,
      startPoint,
      gapBetweenLine: this.gapBetweenLine,
      linHeight: this.linHeight,
    });
    this.lastZigzagPoint = data.lastZigzagPoint;
    this.points.push(this.lastZigzagPoint);
    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      drawArrowhead(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 2 * Math.cos(data.angle),
          y: endPoint.y + 2 * Math.sin(data.angle),
        },
        data.angle,
        15
      );
    }
  }

  stopDrawing(): void {
    this.isDrawing = false;
  }
  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    console.log(points, "points");
    let startPoint = points[0];
    console.log(points, "points");
    for (let i = 0; i < points.length - 1; i++) {
      const data = drawLateralSkating({
        canvasContext: canvasCtx,
        endPoint: points[i + 1],
        startPoint,
        gapBetweenLine: 10,
        linHeight: 15,
      });
      startPoint = data.lastZigzagPoint;
    }
    const lastPoint = points[points.length - 1];
    const secondLastPoint = points[points.length - 2];
    const angle = calculateAngle(secondLastPoint, lastPoint);
    drawArrowhead(canvasCtx, lastPoint, angle, 15);
  }
}
export class FreehandLateralSkatingToStop {
  tempCanvasCtx: CanvasRenderingContext2D | null;
  arrowHeadCanvasCtx: CanvasRenderingContext2D | null;
  lastZigzagPoint: { x: number; y: number }; // To store the path points
  isDrawing: boolean = false;
  direction: boolean;
  radius: number;
  canvasWidth: number;
  canvasHeight: number;
  points: Array<{ x: number; y: number }>;
  type: string;
  gapBetweenLine: number;
  linHeight: number;
  constructor(
    startingPointX: number,
    startingPointY: number,
    tempCanvas: HTMLCanvasElement,
    arrowHeadCanvas: HTMLCanvasElement
  ) {
    this.tempCanvasCtx = tempCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.arrowHeadCanvasCtx = arrowHeadCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    this.isDrawing = true;
    this.points = [{ x: startingPointX, y: startingPointY }];
    this.lastZigzagPoint = { x: startingPointX, y: startingPointY };
    this.radius = 5;
    this.direction = false;
    this.gapBetweenLine = 10;
    this.linHeight = 15;
    this.canvasWidth = tempCanvas.width;
    this.canvasHeight = tempCanvas.height;
    this.type = "FREEHAND";
  }

  draw(newX: number, newY: number): void {
    if (!this.isDrawing) return;
    if (!this.tempCanvasCtx) return;

    const distance = calculateDistance(
      { x: newX, y: newY },
      this.lastZigzagPoint
    );
    if (distance < this.gapBetweenLine) return;
    this.drawArcZigzag(this.lastZigzagPoint, { x: newX, y: newY });
  }
  drawArcZigzag(
    startPoint: { x: number; y: number },
    endPoint: { x: number; y: number }
  ) {
    if (!this.tempCanvasCtx) return;
    const data = drawLateralSkating({
      canvasContext: this.tempCanvasCtx,
      endPoint,
      startPoint,
      gapBetweenLine: this.gapBetweenLine,
      linHeight: this.linHeight,
    });
    this.lastZigzagPoint = data.lastZigzagPoint;
    this.points.push(this.lastZigzagPoint);
    if (this.arrowHeadCanvasCtx) {
      this.arrowHeadCanvasCtx.clearRect(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      drawArrowHeadWithBars(
        this.arrowHeadCanvasCtx,
        {
          x: endPoint.x + 2 * Math.cos(data.angle),
          y: endPoint.y + 2 * Math.sin(data.angle),
        },
        data.angle,
        15
      );
    }
  }

  stopDrawing(): void {
    this.isDrawing = false;
  }
  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    console.log(points, "points");
    let startPoint = points[0];
    console.log(points, "points");
    for (let i = 0; i < points.length - 1; i++) {
      const data = drawLateralSkating({
        canvasContext: canvasCtx,
        endPoint: points[i + 1],
        startPoint,
        gapBetweenLine: 10,
        linHeight: 15,
      });
      startPoint = data.lastZigzagPoint;
    }
    const lastPoint = points[points.length - 1];
    const secondLastPoint = points[points.length - 2];
    const angle = calculateAngle(secondLastPoint, lastPoint);
    drawArrowHeadWithBars(canvasCtx, lastPoint, angle, 15);
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
  canvasWidth: number;
  canvasHeight: number;
  tempCanvasCtx: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  startX: number = 0;
  startY: number = 0;
  currentX: number = 0;
  currentY: number = 0;

  constructor(tempCanvas: HTMLCanvasElement) {
    this.tempCanvasCtx = tempCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.canvasWidth = tempCanvas.width;
    this.canvasHeight = tempCanvas.height;
    if (this.tempCanvasCtx) {
      this.tempCanvasCtx.strokeStyle = "rgba(0, 0, 0, 0.1)"; // Black color, semi-transparent for the border
      this.tempCanvasCtx.fillStyle = "rgba(0, 0, 0, 0.4)";
    }
  }

  resetDrawing(): void {
    if (this.tempCanvasCtx) {
      this.tempCanvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
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
    if (!this.isDrawing || !this.tempCanvasCtx) return;
    this.currentX = x;
    this.currentY = y;
    this.tempCanvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // Clear the canvas
    this.tempCanvasCtx.beginPath();
    this.tempCanvasCtx.rect(this.startX, this.startY, x - this.startX, y - this.startY);
    this.tempCanvasCtx.fill();
    this.tempCanvasCtx.stroke();
  }

  stopDrawing(): void {
    this.isDrawing = false;
    // Finalize the drawing if necessary, e.g., save the rectangle data
  }

  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    if (!canvasCtx || points.length < 2) return;
    const startX = points[0].x;
    const startY = points[0].y;
    const endX = points[1].x;
    const endY = points[1].y;
    canvasCtx.strokeStyle = "rgba(0, 0, 0, 0.1)"; // Black color, semi-transparent for the border
    canvasCtx.fillStyle = "rgba(0, 0, 0, 0.4)";
    canvasCtx.beginPath();
    canvasCtx.rect(startX, startY, endX - startX, endY - startY);
    canvasCtx.fill();
    canvasCtx.stroke();
  };
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
  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    if (!canvasCtx || points.length < 2) return;
    const startX = points[0].x;
    const startY = points[0].y;
    const endX = points[1].x;
    const endY = points[1].y;
    canvasCtx.strokeStyle = "rgba(0, 0, 0, 1)"; // Black color, semi-transparent for the border
    canvasCtx.fillStyle = "rgba(0, 0, 0, 0)";
    canvasCtx.beginPath();
    canvasCtx.rect(startX, startY, endX - startX, endY - startY);
    canvasCtx.fill();
    canvasCtx.stroke();
  };
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
  redrawCurve({
    canvasCtx,
    points,
    radius,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
    radius: number;
  }) {
    if (!canvasCtx || points.length === 0) return;
    const centerX = points[0].x;
    const centerY = points[0].y;
    canvasCtx.strokeStyle = "rgba(0, 0, 0, 0.1)"; // Black color, semi-transparent for the border
    canvasCtx.fillStyle = "rgba(0, 0, 0, 0.4)";
    canvasCtx.beginPath();
    canvasCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    canvasCtx.fill();
    canvasCtx.stroke();
  };
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
  redrawCurve({
    canvasCtx,
    points,
    radius,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
    radius: number;
  }) {
    if (!canvasCtx || points.length === 0) return;
    const centerX = points[0].x;
    const centerY = points[0].y;
    canvasCtx.strokeStyle = "rgba(0, 0, 0, 0.8)"; // Black color, semi-transparent for the border
    canvasCtx.fillStyle = "rgba(255, 255, 255, 0)";
    canvasCtx.beginPath();
    canvasCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    canvasCtx.fill();
    canvasCtx.stroke();
  };
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

  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    if (!canvasCtx || points.length < 3) return; // Ensure there are at least three points

    canvasCtx.beginPath();
    canvasCtx.moveTo(points[0].x, points[0].y); // Move to the first vertex
    for (let i = 1; i < points.length; i++) {
      canvasCtx.lineTo(points[i].x, points[i].y); // Draw line to the next vertex
    }
    canvasCtx.closePath(); // Close the path to form the last side of the triangle
    canvasCtx.fill();
    canvasCtx.stroke();
  };
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
  redrawCurve({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) {
    if (!canvasCtx || points.length < 3) return; // Ensure there are at least three points
    canvasCtx.strokeStyle = "rgba(0, 0, 0, 0.1)"; // Black color for the border
    canvasCtx.fillStyle = "rgba(0, 0, 0, 0.4)";
    canvasCtx.beginPath();
    canvasCtx.moveTo(points[0].x, points[0].y); // Move to the first vertex
    for (let i = 1; i < points.length; i++) {
      canvasCtx.lineTo(points[i].x, points[i].y); // Draw line to the next vertex
    }
    canvasCtx.closePath(); // Close the path to form the last side of the triangle
    canvasCtx.fill();
    canvasCtx.stroke();
  };
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
