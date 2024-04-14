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
  dimension: number;
  redrawFunction: ({
    canvasCtx,
    startingPoint,
    dimension
  }: {
    canvasCtx: CanvasRenderingContext2D;
    startingPoint: TPoint;
    dimension: number;
  }) => void;
}
