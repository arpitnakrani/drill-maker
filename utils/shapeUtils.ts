import { ICurveShape, IImageShape, IGeometricShape, ITextShape, TPoint } from "@/types/curves";
import { DrillActions } from "@/types/drill-actions";

export function isPointNearShape(point: TPoint, shape: ICurveShape | IImageShape | IGeometricShape | ITextShape, threshold: number = 10): boolean {
    switch (shape.actionType) {
        case DrillActions.curve:
            return (shape as ICurveShape).points.some(p =>
                Math.sqrt((p.x - point.x) ** 2 + (p.y - point.y) ** 2) <= threshold
            );

        case DrillActions.draw:
            const imgShape = shape as IImageShape;
            const imgWidth = 30; // Consider making these dynamic if possible
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

        default:
            return false;
    }
}