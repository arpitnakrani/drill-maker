import { useState, useEffect, useRef, TouchEvent, MouseEvent, useCallback } from 'react';
import { drillMaps } from '../drill-map';
import { toolsConfig } from '../toolsConfig';
import { BorderTriangle, BorderedCircle, CircleOverlay, FreeHandSkate, FreeHandSkateWithPuck, FreeHandSkateWithPuckAndStop, FreeHandSkateWithStop, FreehandDashedLine, FreehandLateralSkating, FreehandLateralSkatingToStop, FreehandLine, FreehandSkateBackwardWithPuck, FreehandSkateBackwardWithPuckAndStop, FreehandSkateBackwardWithoutPuck, FreehandSkateBackwardWithoutPuckAndStop, GroupOfPucks, IDrillCurve, Pass, Puck, RectangleBorder, RectangleOverlay, Shot, StraightLine, StraightDashedLine, StraightSkate, StraightSkateWithStop, TriangleOverlay } from '../drill-curves';
import { IDrillImage } from '../drill-images';
import { CurveTypes, DrillActions } from '@/types/drill-actions';

let currentShape: FreeHandSkateWithStop | FreeHandSkateWithPuck | StraightSkate | StraightSkateWithStop | FreeHandSkate | FreeHandSkateWithPuckAndStop | FreehandSkateBackwardWithPuckAndStop | FreehandSkateBackwardWithPuck | FreehandSkateBackwardWithoutPuckAndStop | FreehandSkateBackwardWithoutPuck | RectangleOverlay | RectangleBorder | CircleOverlay | BorderedCircle | TriangleOverlay | BorderTriangle | StraightLine | FreehandDashedLine | StraightDashedLine | FreehandLine | null = null;
type MouseOrTouchEvent = MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>;

interface ActionTrackerState {
    selectedMap: string;
    selectedTool: IDrillCurve | IDrillImage | null; // Allow null as a possible value
    selectedColor: string;
}
interface SerializableDrawnItem {
    height: number;
    radius: number;
    width: number;
    y: number;
    x: number;
    type: string;
    isDrawing: boolean;
    points: { x: number; y: number }[];
    // Add other properties that describe the drawn item's state
}
type Point = {
    x: number;
    y: number;
};
const useCanvas = () => {
    const [canvasStates, setCanvasStates] = useState<string[]>([]);
    const [redoStates, setRedoStates] = useState<string[]>([]);
    const canvasRefMain = useRef<HTMLCanvasElement | null>(null);
    const canvasRefTemp = useRef<HTMLCanvasElement | null>(null);
    const canvasRefArrowhead = useRef<HTMLCanvasElement | null>(null);
    const [canvasSize, setCanvasSize] = useState({ width: 992, height: 496 });
    const [actionTracker, setActionTracker] = useState<ActionTrackerState>({
        selectedMap: drillMaps[0].svgImagePath,
        selectedTool: toolsConfig['skate'][0],
        selectedColor: 'black',
    });
    let hasDrawn = false;
    let isDrawing = false;
    const [isEraserSelected, setIsEraserSelected] = useState(false);
    const [drawnItems, setDrawnItems] = useState<any[]>([]);
    console.log("canvasStates", canvasStates);

    useEffect(() => {
        const updateCanvasSize = () => {
            const canvasWrapper = document.getElementById('canvas_Wrapper');
            if (!canvasWrapper) return;

            const maxWidth = window.outerWidth - 32; // Adjust based on the actual padding/margin
            console.log(window.outerWidth, 'maxw')
            const aspectRatio = 992 / 496;
            let newWidth = maxWidth < 992 ? maxWidth : 992; // Ensure canvas width is less than or equal to screen width
            let newHeight = newWidth / aspectRatio;

            setCanvasSize({ width: newWidth, height: newHeight });
        };

        window.addEventListener('resize', updateCanvasSize);
        updateCanvasSize();
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    const selectEraser = () => {
        setIsEraserSelected(true);
        setActionTracker(prevAction => ({
            ...prevAction,
            selectedTool: null, // or {} if it must be an object
        }));
    };

    // Function to clear the entire canvas
    const clearCanvas = () => {
        const mainCtx = canvasRefMain.current?.getContext('2d');
        if (mainCtx) {
            if (canvasRefMain.current) {
                mainCtx.clearRect(0, 0, canvasRefMain.current.width, canvasRefMain.current.height);
            }
        }
    };



    // Function to remove a drawn item by index
    const removeDrawnItem = (index: number) => {
        if (index < 0 || index >= drawnItems.length) return; // Guard against invalid index

        // Remove the item from drawnItems
        const newDrawnItems = [...drawnItems];
        newDrawnItems.splice(index, 1);
        setDrawnItems(newDrawnItems);

        // Remove the corresponding canvas state if necessary
        const newCanvasStates = [...canvasStates];
        newCanvasStates.splice(index, 1);
        setCanvasStates(newCanvasStates);

        // Redraw the canvas based on the new state
        // redrawCanvas();
    };

    // ... rest of your useCanvas hook code ...

    const findClickedItemIndex = (event: MouseOrTouchEvent): number => {
        const canvas = canvasRefMain.current;
        if (!canvas) return -1;

        const rect = canvas.getBoundingClientRect();
        let clickX: number, clickY: number;

        if ('touches' in event && event.touches.length > 0) {
            clickX = event.touches[0].clientX - rect.left;
            clickY = event.touches[0].clientY - rect.top;
        } else {
            const mouseEvent = event as MouseEvent;
            clickX = mouseEvent.clientX - rect.left;
            clickY = mouseEvent.clientY - rect.top;
        }

        for (let i = 0; i < drawnItems.length; i++) {
            const item = drawnItems[i];
            if (item.points && item.points.length > 0) {
                for (let j = 0; j < item.points.length - 1; j++) {
                    const point1 = item.points[j];
                    const point2 = item.points[j + 1] || item.points[j]; // Use the same point if it's the last one
                    if (isPointNearLine(clickX, clickY, point1.x, point1.y, point2.x, point2.y)) {
                        console.log("i", i);

                        return i;
                    }
                }
            }
        }

        return -1;
    };

    // Helper function to check if a point is near a line segment
    const isPointNearLine = (
        px: number,
        py: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        tolerance: number = 5
    ): boolean => {
        // Calculate the distance from the point to the line segment
        const L2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        // console.log("L2", L2);

        if (L2 === 0) return false; // Line segment is a point

        let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / L2;
        t = Math.max(0, Math.min(1, t));
        const projectionX = x1 + t * (x2 - x1);
        const projectionY = y1 + t * (y2 - y1);

        // Distance from p to the projection
        const d2 = (px - projectionX) * (px - projectionX) + (py - projectionY) * (py - projectionY);
        console.log("d2", d2 < tolerance * tolerance);
        console.log("tolerance", tolerance);



        return d2 < tolerance * tolerance; // If the distance is less than the tolerance, it's a hit
    };

    // const captureCanvasState = () => {

    //     const canvas = canvasRefMain.current;
    //     console.log("canvas", canvas);

    //     if (canvas && hasDrawn) {
    //         // const dataUrl = canvas.toDataURL();
    //         // const lastState = canvasStates[canvasStates.length - 1];
    //         // if (!lastState || lastState !== dataUrl) {
    //         //     setCanvasStates(prevStates => [...prevStates, dataUrl]);
    //         //     setRedoStates([]);
    //         // }
    //     }
    // };

    const captureCanvasState = useCallback(() => {
        // Transform drawnItems into a serializable structure
        const serializableDrawnItems = drawnItems && drawnItems.map(item => ({
            isDrawing: item.isDrawing,
            points: item.points && item.points.map((point: Point) => ({ x: point.x, y: point.y })),
            // Copy other necessary properties here
        }));
        // Now you can safely serialize serializableDrawnItems
        const serializedState = JSON.stringify(serializableDrawnItems);
        setCanvasStates(prevStates => [...prevStates, serializedState]);
        setRedoStates([]);
    }, [drawnItems]);



    const mouseDown = (event: MouseOrTouchEvent) => {
        if (canvasRefTemp.current && canvasRefArrowhead.current && actionTracker?.selectedTool?.actionType === DrillActions.curve) {
            const rect = canvasRefTemp.current.getBoundingClientRect();
            let clientX, clientY;
            const scaleFactor = canvasRefTemp.current.width / 992; // originalCanvasWidth is the width of the canvas at which t

            // Check if it's a touch event
            if ('touches' in event && event.touches) {
                // Type assertion for touch event
                const touchEvent = event as TouchEvent;
                clientX = touchEvent.touches[0].clientX;
                clientY = touchEvent.touches[0].clientY;
            } else {
                // Type assertion for mouse event
                const mouseEvent = event as MouseEvent<HTMLCanvasElement>;
                clientX = mouseEvent.clientX;
                clientY = mouseEvent.clientY;
            }

            const temp_Ctx = canvasRefTemp.current.getContext('2d')
            const arrow_Ctx = canvasRefArrowhead.current.getContext('2d')
            if (temp_Ctx && arrow_Ctx) {
                temp_Ctx.strokeStyle = actionTracker.selectedColor;
                arrow_Ctx.strokeStyle = actionTracker.selectedColor;
            }
            if (actionTracker.selectedTool.actionType === DrillActions.curve) {
                if ('curveType' in actionTracker.selectedTool) {
                    switch (actionTracker.selectedTool.curveType) {
                        case CurveTypes.freeHandSkate:
                            currentShape = new FreeHandSkate(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, canvasRefArrowhead.current, scaleFactor)
                            break;
                        case CurveTypes.freeHandSkateWithStop:
                            currentShape = new FreeHandSkateWithStop(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, canvasRefArrowhead.current, scaleFactor)
                            break;
                        case CurveTypes.straightSkate:
                            currentShape = new StraightSkate(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, scaleFactor)
                            break;
                        case CurveTypes.straightSkateWithStop:
                            currentShape = new StraightSkateWithStop(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, scaleFactor)
                            break;
                        case CurveTypes.freeHandSkateWithPuck:
                            currentShape = new FreeHandSkateWithPuck(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, canvasRefArrowhead.current, scaleFactor)
                            break;
                        case CurveTypes.freeHandSkateWithPuckAndStop:
                            currentShape = new FreeHandSkateWithPuckAndStop(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, canvasRefArrowhead.current, scaleFactor)
                            break;
                        case CurveTypes.freehandSkateBackwardWithPuckAndStop:
                            currentShape = new FreehandSkateBackwardWithPuckAndStop(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, canvasRefArrowhead.current, scaleFactor)
                            break;
                        case CurveTypes.freehandSkateBackwardWithPuck:
                            currentShape = new FreehandSkateBackwardWithPuck(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, canvasRefArrowhead.current, scaleFactor)
                            break;
                        case CurveTypes.freehandSkateBackwardWithoutPuckAndStop:
                            currentShape = new FreehandSkateBackwardWithoutPuckAndStop(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, canvasRefArrowhead.current, scaleFactor)
                            break;
                        case CurveTypes.freehandSkateBackwardWithoutPuck:
                            currentShape = new FreehandSkateBackwardWithoutPuck(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, canvasRefArrowhead.current, scaleFactor)
                            break;
                        case CurveTypes.straightPass:
                            currentShape = new Pass(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, scaleFactor)
                            break;
                        case CurveTypes.straightShot:
                            currentShape = new Shot(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, scaleFactor)
                            break;
                        case CurveTypes.freehandLateralSkating:
                            currentShape = new FreehandLateralSkating(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, canvasRefArrowhead.current, scaleFactor)
                            break;
                        case CurveTypes.freehandLateralSkatingToStop:
                            currentShape = new FreehandLateralSkatingToStop(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, canvasRefArrowhead.current, scaleFactor)
                            break;
                        case CurveTypes.zigzag:
                            currentShape = new RectangleOverlay(canvasRefTemp.current, scaleFactor);
                            currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
                            break;
                        case CurveTypes.curve:
                            currentShape = new RectangleBorder(canvasRefTemp.current, scaleFactor);
                            currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
                            break;
                        case CurveTypes.circle:
                            currentShape = new CircleOverlay(canvasRefTemp.current, scaleFactor);
                            currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
                            break;
                        case CurveTypes.filledCircle:
                            currentShape = new BorderedCircle(canvasRefTemp.current, scaleFactor);
                            currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
                            break;
                        case CurveTypes.triangle:
                            currentShape = new TriangleOverlay(canvasRefTemp.current, scaleFactor);
                            currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
                            break;
                        case CurveTypes.filledTriangle:
                            currentShape = new BorderTriangle(canvasRefTemp.current, scaleFactor);
                            currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
                            break;
                        case CurveTypes.starightLine:
                            currentShape = new StraightLine(canvasRefTemp.current, scaleFactor);
                            currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
                            break;
                        case CurveTypes.freehandLine:
                            currentShape = new FreehandLine(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, scaleFactor);
                            break;
                        case CurveTypes.straightDashedLine:
                            currentShape = new StraightDashedLine(clientX - rect.left, clientY - rect.top, canvasRefTemp.current, scaleFactor)
                            break;
                        case CurveTypes.freehandDashedLine:
                            currentShape = new FreehandDashedLine(canvasRefTemp.current, scaleFactor);
                            currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
                            break;
                        default:
                            break;
                    }
                }
            }

        }
        isDrawing = true;

    }

    const mouseMove = (event: MouseOrTouchEvent) => {
        if (isDrawing) {
            let clientX, clientY;

            if ('touches' in event && event.touches) {
                // Type assertion for touch event
                const touchEvent = event as TouchEvent;
                clientX = touchEvent.touches[0].clientX;
                clientY = touchEvent.touches[0].clientY;
            } else {
                // Type assertion for mouse event
                const mouseEvent = event as MouseEvent<HTMLCanvasElement>;
                clientX = mouseEvent.clientX;
                clientY = mouseEvent.clientY;
            }

            if (currentShape && canvasRefTemp.current) {
                const rect = canvasRefTemp.current.getBoundingClientRect();
                currentShape.draw(clientX - rect.left, clientY - rect.top);
            }
            hasDrawn = true; // Set the flag to true only if the mouse is down and moving
        }
    };

    const mouseUp = (event: MouseOrTouchEvent) => {
        if (currentShape && canvasRefMain.current && canvasRefTemp.current) {
            const mainCtx = canvasRefMain.current.getContext('2d');
            const tempCtx = canvasRefTemp.current.getContext('2d');
            currentShape.stopDrawing();
            if (mainCtx && tempCtx) {
                mainCtx.drawImage(canvasRefTemp.current, 0, 0);
                tempCtx.clearRect(0, 0, canvasRefMain.current.width, canvasRefMain.current.height);
                console.log("currentShape", currentShape);

                if (hasDrawn) {
                    drawnItems.push(currentShape);
                }

            }
        }
        if (hasDrawn) {
            captureCanvasState();
        }
        isDrawing = false; // Reset the flag when the mouse is released
        hasDrawn = false;
    };

    const mouseClick = (event: MouseOrTouchEvent) => {
        if (isEraserSelected) {
            const clickedItemIndex = findClickedItemIndex(event);
            if (clickedItemIndex !== -1) {
                removeDrawnItem(clickedItemIndex);
            }
        } else {
            if (!canvasRefTemp.current) return;

            const rect = canvasRefTemp.current.getBoundingClientRect();
            const mainCtx = canvasRefMain.current?.getContext('2d');
            const tempCtx = canvasRefTemp.current?.getContext('2d');
            const scaleFactor = canvasRefTemp.current.width / 992;

            if (!mainCtx || !tempCtx || !canvasRefMain.current) return; // Guard against null values

            let clientX: number, clientY: number;

            if ('touches' in event && event.touches) {
                // Type assertion for touch event
                const touchEvent = event as TouchEvent;
                clientX = touchEvent.touches[0].clientX;
                clientY = touchEvent.touches[0].clientY;
            } else {
                // Type assertion for mouse event
                const mouseEvent = event as MouseEvent<HTMLCanvasElement>;
                clientX = mouseEvent.clientX;
                clientY = mouseEvent.clientY;
            }

            if (actionTracker?.selectedTool?.actionType === DrillActions.draw) {
                const img = document.createElement('img');
                img.src = actionTracker.selectedTool.imagePath;
                img.onload = () => {
                    tempCtx.drawImage(img, clientX - rect.left, clientY - rect.top, 30, 30);
                    if (canvasRefTemp.current && canvasRefMain.current) {
                        mainCtx.drawImage(canvasRefTemp.current, 0, 0);
                        tempCtx.clearRect(0, 0, canvasRefMain.current.width, canvasRefMain.current.height);
                    }
                };
            }

            if (actionTracker?.selectedTool?.actionType === DrillActions.text) {
                const userInput = prompt('write text') || '';
                tempCtx.font = "18px serif";
                tempCtx.fillText(userInput, clientX - rect.left, clientY - rect.top);
                mainCtx.drawImage(canvasRefTemp.current, 0, 0);
                tempCtx.clearRect(0, 0, canvasRefMain.current.width, canvasRefMain.current.height);
            }

            if (actionTracker?.selectedTool?.actionType === DrillActions.random && 'curveType' in actionTracker.selectedTool) {
                if (canvasRefTemp.current) {
                    const curveType = actionTracker.selectedTool.curveType;
                    const puck = curveType === CurveTypes.puck ? new Puck(canvasRefTemp.current, scaleFactor) : new GroupOfPucks(canvasRefTemp.current, scaleFactor);
                    puck.draw(clientX - rect.left, clientY - rect.top);
                }
            }
        }
    };

    const redrawCanvas = useCallback(() => {
        const canvas = canvasRefMain.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        // Clear the entire canvas before redrawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        console.log('Redrawing canvas with states:', canvasStates);

        // Iterate over each serialized state in the canvasStates array
        canvasStates.forEach((serializedState, stateIndex) => {
            console.log(`Redrawing state ${stateIndex}:`, serializedState);
            const stateItems = JSON.parse(serializedState) as SerializableDrawnItem[];

            // Iterate over each item and redraw it based on its type and properties
            stateItems.forEach((item, itemIndex) => {
                if (!item.isDrawing) return; // Skip if the item is not meant to be drawn

                console.log(`Redrawing item ${itemIndex}:`, item);

                // Assuming the item is a freehand drawing with a 'points' array
                ctx.beginPath();
                item.points.forEach((point, index) => {
                    if (index === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                });
                ctx.stroke(); // Apply the stroke to the path
            });
        });
    }, [canvasStates, canvasRefMain]);


    const onUndo = useCallback(() => {
        if (canvasStates.length > 0) {
            const newCanvasStates = [...canvasStates];
            const lastState = newCanvasStates.pop(); // Remove the last state
            setCanvasStates(newCanvasStates);
            if (lastState !== undefined) {
                setRedoStates(prevRedoStates => [...prevRedoStates, lastState]);
            }
            console.log('Undo: newCanvasStates after pop', newCanvasStates);
            redrawCanvas(); // Redraw the canvas after updating the states
        }
    }, [canvasStates, redrawCanvas, setRedoStates]);

    // const redrawCanvas = useCallback(() => {
    //     const canvas = canvasRefMain.current;
    //     const ctx = canvas?.getContext('2d');
    //     if (!ctx || !canvas) return;

    //     // Clear the entire canvas before redrawing
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     // Redraw all states up to the last one
    //     canvasStates.forEach((serializedState) => {
    //         const stateItems = JSON.parse(serializedState) as SerializableDrawnItem[];
    //         stateItems.forEach(item => {
    //             // Redraw each item based on its type and properties
    //             if (item.isDrawing) {
    //                 // Example for drawing lines
    //                 ctx.beginPath();
    //                 item.points.forEach((point, index) => {
    //                     if (index === 0) {
    //                         ctx.moveTo(point.x, point.y);
    //                     } else {
    //                         ctx.lineTo(point.x, point.y);
    //                     }
    //                 });
    //                 ctx.stroke();
    //             }
    //             // Add other drawing logic for different types of items here
    //             // For example, if you have rectangles or circles, handle their drawing logic
    //         });
    //     });
    // }, [canvasStates, canvasRefMain]);

    // const onUndo = useCallback(() => {
    //     if (canvasStates.length > 0) {
    //         const newCanvasStates = [...canvasStates];
    //         newCanvasStates.pop(); // Remove the last state
    //         setCanvasStates(newCanvasStates);
    //         setRedoStates(prevRedoStates => [...prevRedoStates, canvasStates[canvasStates.length - 1]]);
    //         redrawCanvas(); // Redraw the canvas after updating the states
    //     }
    // }, [canvasStates, redrawCanvas, setRedoStates]);


    const onRedo = useCallback(() => {
        if (redoStates.length > 0) {
            const newRedoStates = [...redoStates];
            const nextState = newRedoStates.pop();
            setRedoStates(newRedoStates);
            if (nextState !== undefined) {
                setCanvasStates(prevCanvasStates => [...prevCanvasStates, nextState]);
            }
            const nextDrawnItems = nextState ? JSON.parse(nextState) as SerializableDrawnItem[] : [];
            setDrawnItems(nextDrawnItems);
            redrawCanvas();
        }
    }, [redoStates, redrawCanvas]);
    // const onUndo = () => {
    //     if (canvasStates.length <= 0) return; // Keep initial state to avoid empty canvas
    //     const newState = [...canvasStates].slice(0, -1);
    //     setCanvasStates(newState);
    //     const lastState = canvasStates[canvasStates.length - 1];
    //     setRedoStates([...redoStates, lastState]);
    //     redrawCanvas(newState[newState.length - 1]);
    // };

    // const redrawCanvas = (dataUrl: string) => {
    //     const canvas = canvasRefMain.current;

    //     if (canvas) {
    //         const ctx = canvas.getContext('2d');
    //         if (ctx) {
    //             if (!dataUrl) {
    //                 ctx.clearRect(0, 0, canvas.width, canvas.height);
    //                 return;
    //             }
    //             const img = document.createElement('img');
    //             img.src = dataUrl;
    //             img.onload = () => {
    //                 ctx.clearRect(0, 0, canvas.width, canvas.height);
    //                 ctx.drawImage(img, 0, 0);
    //             };
    //         }
    //     }
    // };




    // const onRedo = () => {
    //     if (redoStates.length === 0) return;
    //     const redoState = redoStates.pop();
    //     if (redoState) {
    //         setCanvasStates([...canvasStates, redoState]);
    //         // redrawCanvas(redoState);
    //     }
    // };



    const onCanvasClear = () => {
        // const mainCtx = canvasRefMain.current?.getContext('2d');
        // if (mainCtx) {
        //     mainCtx.clearRect(0, 0, canvasRefMain.current?.width || 0, canvasRefMain.current?.height || 0)
        // }
        // setCanvasStates([])
        // setRedoStates([])
    }

    const getCoordinates = (event: any) => {
        if (event.touches && event.touches.length > 0) {
            const touch = event.touches[0];
            return { clientX: touch.clientX, clientY: touch.clientY };
        }
        return { clientX: event.clientX, clientY: event.clientY };
    };


    const onChangeTool = (tool: IDrillCurve | IDrillImage) => {
        setActionTracker((prevAction) => ({ ...prevAction, selectedTool: tool }));
        setIsEraserSelected(false)
    };

    const onChangeColor = (color: string) => {
        setActionTracker((actionTracker) => ({ ...actionTracker, selectedColor: color }));
    };

    const handleMapClick = (svgImagePath: string) => {
        setActionTracker((prevAction) => ({ ...prevAction, selectedMap: svgImagePath }));
    };


    return {
        canvasRefMain,
        canvasRefTemp,
        canvasRefArrowhead,
        canvasSize,
        getCoordinates,
        mouseDown,
        mouseMove,
        mouseUp,
        mouseClick,
        onUndo,
        onRedo,
        onCanvasClear,
        onChangeColor,
        onChangeTool,
        actionTracker,
        handleMapClick,
        isEraserSelected,
        selectEraser,
    };
};

export default useCanvas;
