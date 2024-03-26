import { CurveTypes, DrillActions } from "@/types/drill-actions";

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
    curveType: CurveTypes.straight,
    imagePath: "svgs/drill-curves-svgs/skate-with-stop-straight.svg",
    label: "Skate with  stop (straight)",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.straight,
    imagePath: "svgs/drill-curves-svgs/skate-straight.svg",
    label: "Skate (straight)",
    active: false,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.straight,
    imagePath: "svgs/drill-curves-svgs/skate-with-stop-freehand.svg",
    label: "Skate with  stop (Free Hand)",
    active: false,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.straight,
    imagePath: "svgs/drill-curves-svgs/skate-freehand.svg",
    label: "Skate (free hand)",
    active: false,
  },
];
export const drillSkateWithPuckCurves: IDrillCurve[] = [
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freeHand,
    imagePath: "svgs/drill-curves-svgs/skate-with-puck.svg",
    label: "Skate with  puck",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freeHand,
    imagePath: "svgs/drill-curves-svgs/skate-with-puck-stop.svg",
    label: "Skate with puck and stop",
    active: false,
  },
];
export const drillSkateBackwardCurves: IDrillCurve[] = [
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freeHand,
    imagePath: "svgs/drill-curves-svgs/skate-backward-with-puck-stop.svg",
    label: "Skate backward with puck and stop",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freeHand,
    imagePath: "svgs/drill-curves-svgs/skate-backward-with-puck.svg",
    label: "Skate backward with puck",
    active: false,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freeHand,
    imagePath: "svgs/drill-curves-svgs/skate-backward-without-puck-stop.svg",
    label: "Skate backward without puck and stop",
    active: false,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freeHand,
    imagePath: "svgs/drill-curves-svgs/skate-backward-without-puck.svg",
    label: "Skate backward without puck",
    active: false,
  },
];
export const drillPassCurves: IDrillCurve[] = [
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.straight,
    imagePath: "svgs/drill-curves-svgs/pass.svg",
    label: "Pass",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.straight,
    imagePath: "svgs/drill-curves-svgs/shot.svg",
    label: "Shot",
    active: false,
  },
];
export const drillLateralSkatingCurve: IDrillCurve[] = [
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freeHand,
    imagePath: "svgs/drill-curves-svgs/lateral-skating.svg",
    label: "Lateral Skating",
    active: true,
  },
  {
    actionType: DrillActions.curve,
    curveType: CurveTypes.freeHand,
    imagePath: "svgs/drill-curves-svgs/lateral-skating-stop.svg",
    label: "Lateral Skating to stop",
    active: false,
  },
];

export class StraightArrow {
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  isDrawing: boolean = false;

  constructor(
    startingPointX: number,
    startingPointY: number,
    canvas: HTMLCanvasElement
  ) {
    console.log(startingPointX, startingPointY, "start");
    this.x = startingPointX;
    this.y = startingPointY;
    this.canvas = canvas;
  }

  initiateDrawing() {
    this.isDrawing = true;
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
