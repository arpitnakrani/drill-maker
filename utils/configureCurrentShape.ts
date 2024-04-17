import {
    BorderTriangle,
    BorderedCircle,
    CircleOverlay,
    FreeHandSkate,
    FreeHandSkateWithPuck,
    FreeHandSkateWithPuckAndStop,
    FreeHandSkateWithStop,
    FreehandDashedLine,
    FreehandLateralSkating,
    FreehandLateralSkatingToStop,
    FreehandLine,
    FreehandSkateBackwardWithPuck,
    FreehandSkateBackwardWithPuckAndStop,
    FreehandSkateBackwardWithoutPuck,
    FreehandSkateBackwardWithoutPuckAndStop,
    Pass,
    RectangleBorder,
    RectangleOverlay,
    Shot,
    StraightDashedLine,
    StraightLine,
    StraightSkate,
    StraightSkateWithStop,
    TriangleOverlay,
} from "@/data/drill-curves";
import { TPoint } from "@/types/curves";
import { CurveTypes } from "@/types/drill-actions";

interface IConfigureCurrentSHape {
    curveType: CurveTypes;
    currentPointer: TPoint;
    tempCanvas: HTMLCanvasElement;
    arrowHeadCanvas: HTMLCanvasElement;
}
export function configureCurrentSHape({
    curveType,
    arrowHeadCanvas,
    currentPointer,
    tempCanvas,
}: IConfigureCurrentSHape) {
    switch (curveType) {
        case CurveTypes.freeHandSkate:
            return new FreeHandSkate(
                currentPointer.x,
                currentPointer.y,
                tempCanvas,
                arrowHeadCanvas
            );
        case CurveTypes.freeHandSkateWithStop:
            return new FreeHandSkateWithStop(
                currentPointer.x,
                currentPointer.y,
                tempCanvas,
                arrowHeadCanvas
            );
        case CurveTypes.straightSkate:
            return new StraightSkate(currentPointer.x, currentPointer.y, tempCanvas);
        case CurveTypes.straightSkateWithStop:
            return new StraightSkateWithStop(
                currentPointer.x,
                currentPointer.y,
                tempCanvas
            );
        case CurveTypes.freeHandSkateWithPuck:
            return new FreeHandSkateWithPuck(
                currentPointer.x,
                currentPointer.y,
                tempCanvas,
                arrowHeadCanvas
            );
        case CurveTypes.freeHandSkateWithPuckAndStop:
            return new FreeHandSkateWithPuckAndStop(
                currentPointer.x,
                currentPointer.y,
                tempCanvas,
                arrowHeadCanvas
            );
        case CurveTypes.freehandSkateBackwardWithPuckAndStop:
            return new FreehandSkateBackwardWithPuckAndStop(
                currentPointer.x,
                currentPointer.y,
                tempCanvas,
                arrowHeadCanvas
            );
        case CurveTypes.freehandSkateBackwardWithPuck:
            return new FreehandSkateBackwardWithPuck(
                currentPointer.x,
                currentPointer.y,
                tempCanvas,
                arrowHeadCanvas
            );
        case CurveTypes.freehandSkateBackwardWithoutPuckAndStop:
            return new FreehandSkateBackwardWithoutPuckAndStop(
                currentPointer.x,
                currentPointer.y,
                tempCanvas,
                arrowHeadCanvas
            );
        case CurveTypes.freehandSkateBackwardWithoutPuck:
            return new FreehandSkateBackwardWithoutPuck(
                currentPointer.x,
                currentPointer.y,
                tempCanvas,
                arrowHeadCanvas
            );
        case CurveTypes.straightPass:
            return new Pass(currentPointer.x, currentPointer.y, tempCanvas);
        case CurveTypes.straightShot:
            return new Shot(currentPointer.x, currentPointer.y, tempCanvas);
        case CurveTypes.freehandLateralSkating:
            return new FreehandLateralSkating(
                currentPointer.x,
                currentPointer.y,
                tempCanvas,
                arrowHeadCanvas
            );
        case CurveTypes.freehandLateralSkatingToStop:
            return new FreehandLateralSkatingToStop(
                currentPointer.x,
                currentPointer.y,
                tempCanvas,
                arrowHeadCanvas
            );
        case CurveTypes.filledRectangle:
            return new RectangleOverlay(
                currentPointer.x,
                currentPointer.y,
                tempCanvas
            );
        case CurveTypes.rectangle:
            return new RectangleBorder(currentPointer.x,
                currentPointer.y,
                tempCanvas);
        case CurveTypes.circle:
            return new CircleOverlay(
                currentPointer.x,
                currentPointer.y,
                tempCanvas
            );
        case CurveTypes.filledCircle:
            return new BorderedCircle(
                currentPointer.x,
                currentPointer.y,
                tempCanvas
            );
        case CurveTypes.triangle:
            return new TriangleOverlay(
                currentPointer.x,
                currentPointer.y,
                tempCanvas
            );
        case CurveTypes.filledTriangle:
            return new BorderTriangle(
                currentPointer.x,
                currentPointer.y,
                tempCanvas
            );
            // case CurveTypes.starightLine:
            // return new StraightLine(tempCanvas);
        //   currentShape.startDrawing(currentPointer.x, currentPointer.y);
        //   break;
        // case CurveTypes.freehandLine:
        // return new FreehandLine(
        //     currentPointer.x,
        //     currentPointer.y,
        //     tempCanvas
        //   );
        //   break;
        // case CurveTypes.straightDashedLine:
        // return new StraightDashedLine(
        //     currentPointer.x,
        //     currentPointer.y,
        //     tempCanvas
        //   );
        //   break;
        // case CurveTypes.freehandDashedLine:
        // return new FreehandDashedLine(tempCanvas);
        //   currentShape.startDrawing(currentPointer.x, currentPointer.y);
        //   break;
        default:
            return null;
    }
}
