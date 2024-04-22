import { ICurveShape, IImageShape, IGeometricShape, ITextShape, TPoint, IRandomShape } from "@/types/curves";
import { DrillActions } from "@/types/drill-actions";

type ITrackingShape = ICurveShape | IImageShape | IGeometricShape | ITextShape | IRandomShape;

function isPointNearLine(point: TPoint, p1: TPoint, p2: TPoint, threshold: number): boolean {
    const numerator = Math.abs((p2.y - p1.y) * point.x - (p2.x - p1.x) * point.y + p2.x * p1.y - p2.y * p1.x);
    const denominator = Math.sqrt((p2.y - p1.y) ** 2 + (p2.x - p1.x) ** 2);
    const distance = numerator / denominator;
    return distance <= threshold;
}

function isPointNearCurve(point: TPoint, points: TPoint[], threshold: number): boolean {
    for (let i = 0; i < points.length - 1; i++) {
        if (isPointNearLine(point, points[i], points[i + 1], threshold)) {
            return true;
        }
    }
    return false;
}

export function isPointNearShape(point: TPoint, shape: ITrackingShape, threshold: number = 5): boolean {
    switch (shape.actionType) {
        case DrillActions.curve:
            return isPointNearCurve(point, shape.points, threshold);
        case DrillActions.draw:
            // For images, check if the point is within the image bounds
            const imgShape = shape as IImageShape;
            const imgWidth = 30; // Use dynamic or predefined width
            const imgHeight = 30; // Use dynamic or predefined height
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
                Math.sqrt((p.x - point.x) ** 2 + (p.y - point.y) ** 2) <= threshold
            );
        default:
            return false;
    }
}

export function detectShapeAtPoint(point: TPoint, shapes: ITrackingShape[], threshold: number = 5): number {
    for (let i = shapes.length - 1; i >= 0; i--) {
        if (isPointNearShape(point, shapes[i], threshold)) {
            return i; // Return the first shape found, which is the topmost due to reverse iteration
        }
    }
    return -1; // Return null if no shape is detected at the point
}