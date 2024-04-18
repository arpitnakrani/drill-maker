import { ICurveShape, IImageShape, IGeometricShape, ITextShape, TPoint, IRandomShape } from "@/types/curves";
import { DrillActions } from "@/types/drill-actions";

type ITrackingShape = ICurveShape | IImageShape | IGeometricShape | ITextShape | IRandomShape;

export function isPointNearShape(point: TPoint, shape: ITrackingShape, threshold: number = 10): boolean {
    switch (shape.actionType) {
        case DrillActions.curve:
            if (shape.points.length === 2) {
                const [p1, p2] = shape.points;
                return isPointNearLine(point, p1, p2, threshold);
            } else {
                return shape.points.some(p =>
                    Math.sqrt((p.x - point.x) ** 2 + (p.y - point.y) ** 2) <= threshold
                );
            }
        case DrillActions.draw:
            const imgShape = shape as IImageShape;
            const imgWidth = 30;
            const imgHeight = 30;
            return (
                point.x >= imgShape.startingPoint.x && point.x <= imgShape.startingPoint.x + imgWidth &&
                point.y >= imgShape.startingPoint.y && point.y <= imgShape.startingPoint.y + imgHeight
            );
        case DrillActions.geometry:
            const geoShape = shape as IGeometricShape;
            if (geoShape.radius !== undefined) {
                const distance = Math.sqrt((point.x - geoShape.startingPoint.x) ** 2 + (point.y - geoShape.startingPoint.y) ** 2);
                return distance <= geoShape.radius + threshold;
            } else {
                const minX = Math.min(geoShape.startingPoint.x, geoShape.endingPoint.x) - threshold;
                const maxX = Math.max(geoShape.startingPoint.x, geoShape.endingPoint.x) + threshold;
                const minY = Math.min(geoShape.startingPoint.y, geoShape.endingPoint.y) - threshold;
                const maxY = Math.max(geoShape.startingPoint.y, geoShape.endingPoint.y) + threshold;
                return (
                    point.x >= minX && point.x <= maxX &&
                    point.y >= minY && point.y <= maxY
                );
            }

        case DrillActions.text:
            const textShape = shape as ITextShape;
            const minX = textShape.startingPoint.x - threshold;
            const maxX = textShape.startingPoint.x + textShape.boundingBox.width + threshold;
            const minY = textShape.startingPoint.y - threshold;
            const maxY = textShape.startingPoint.y + textShape.boundingBox.height + threshold;
            return (
                point.x >= minX && point.x <= maxX &&
                point.y >= minY && point.y <= maxY
            );
        case DrillActions.random:
            return (shape as IRandomShape).points.some(p =>
                Math.sqrt((p.x - point.x) ** 2 + (p.y - point.y) ** 2) <= 50
            );
        default:
            return false;
    }
}

function isPointNearLine(point: TPoint, p1: TPoint, p2: TPoint, threshold: number): boolean {
    const numerator = Math.abs((p2.y - p1.y) * point.x - (p2.x - p1.x) * point.y + p2.x * p1.y - p2.y * p1.x);
    const denominator = Math.sqrt((p2.y - p1.y) ** 2 + (p2.x - p1.x) ** 2);
    const distance = numerator / denominator;
    return distance <= threshold;
}