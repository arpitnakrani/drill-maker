import { CurveTypes, DrillActions } from "../drill-actions";

export type TPoint = {
  x: number;
  y: number;
};

export interface ICurveShape {
  actionType: DrillActions.curve;
  points: TPoint[];
  redrawFunction: ({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) => void;
}

export interface IImageShape {
  actionType: DrillActions.draw;
  imageUrl: string;
  startingPoint: TPoint;
  redrawFunction: () => void;
}

export interface IGeometricShape {
  actionType: DrillActions.geometry;
  startingPoint: TPoint;
  endingPoint: TPoint;
  radius?: number;
  redrawFunction: ({
    canvasCtx,
    startingPoint,
    endingPoint,
    radius
  }: {
    canvasCtx: CanvasRenderingContext2D;
    startingPoint: TPoint;
    endingPoint: TPoint;
    radius?: number;
  }) => void;
}

export interface ITextShape {
  actionType: DrillActions.text;
  startingPoint: { x: number; y: number; };
  boundingBox: { width: number; height: number; };
  redrawFunction: () => void;
}

export interface IRandomShape {
  actionType: DrillActions.random;
  points: TPoint[];
  redrawFunction: ({
    canvasCtx,
    points,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }
  ) => void;
}