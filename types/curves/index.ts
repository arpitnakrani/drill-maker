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
  redrawFunction: ({
    canvasCtx,
    imageUrl,
  }: {
    canvasCtx: CanvasRenderingContext2D;
    imageUrl: string;
  }) => void;
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
  content: string;
  startingPoint: { x: number; y: number; };
  font: string;
  boundingBox: { width: number; height: number; };
  redrawFunction: ({
    canvasCtx,
    startingPoint,
    content
  }: {
    canvasCtx: CanvasRenderingContext2D;
    startingPoint: TPoint;
    content: string
  }) => void;
}