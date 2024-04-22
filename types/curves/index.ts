import { CurveTypes, DrillActions } from "../drill-actions";

export type TPoint = {
  x: number;
  y: number;
};

export interface ICurveShape {
  id: number;
  actionType: DrillActions.curve;
  points: TPoint[];
  redrawFunction: (props: {
    canvasCtx: CanvasRenderingContext2D;
    points: TPoint[];
  }) => void;
}

export interface IImageShape {
  id: number;
  actionType: DrillActions.draw;
  imageUrl: string;
  startingPoint: TPoint;
  redrawFunction: () => void;
}

export interface IGeometricShape {
  id: number;
  actionType: DrillActions.geometry;
  startingPoint: TPoint;
  endingPoint: TPoint;
  radius?: number;
  redrawFunction: (props: {
    canvasCtx: CanvasRenderingContext2D;
    startingPoint: TPoint;
    endingPoint: TPoint;
    color?: string;
    radius?: number;
  }) => void;
}

export interface ITextShape {
  id: number;
  actionType: DrillActions.text;
  startingPoint: { x: number; y: number; };
  boundingBox: { width: number; height: number; };
  redrawFunction: () => void;
}

export interface IRandomShape {
  id: number;
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