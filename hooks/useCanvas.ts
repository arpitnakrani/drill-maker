import {
  useState,
  useEffect,
  useRef,
  TouchEvent,
  MouseEvent,
  PointerEventHandler,
} from "react";
import { drillMaps } from "../data/drill-map";
import { toolsConfig } from "../data/toolsConfig";
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
  GroupOfPucks,
  IDrillCurve,
  Pass,
  Puck,
  RectangleBorder,
  RectangleOverlay,
  Shot,
  StraightLine,
  StraightDashedLine,
  StraightSkate,
  StraightSkateWithStop,
  TriangleOverlay,
} from "../data/drill-curves";
import { IDrillImage } from "../data/drill-images";
import { CurveTypes, DrillActions } from "@/types/drill-actions";
// import * as _ from "lodash";
import {
  ICurveShape,
  IGeometricShape,
  IImageShape,
  IRandomShape,
  ITextShape,
  TPoint,
} from "@/types/curves";
import { detectShapeAtPoint, isPointNearShape } from "@/utils/shapeUtils";
import { configureCurrentSHape } from "@/utils/configureCurrentShape";
type TShape =
  | FreeHandSkateWithStop
  | FreeHandSkateWithPuck
  | StraightSkate
  | StraightSkateWithStop
  | FreeHandSkate
  | FreeHandSkateWithPuckAndStop
  | FreehandSkateBackwardWithPuckAndStop
  | FreehandSkateBackwardWithPuck
  | FreehandSkateBackwardWithoutPuckAndStop
  | FreehandSkateBackwardWithoutPuck
  | RectangleOverlay
  | RectangleBorder
  | CircleOverlay
  | BorderedCircle
  | TriangleOverlay
  | BorderTriangle
  // | StraightLine
  // | FreehandDashedLine
  // | StraightDashedLine
  // | FreehandLine
  | Pass;

let currentShape: TShape | null = null;

type ITrackingShape = ICurveShape | IImageShape | IGeometricShape | ITextShape | IRandomShape;

interface IRedoState {
  operation: "ADD" | "DELETE";
  index?: number | undefined;
  shape: ITrackingShape;
}
const useCanvas = () => {
  const [undoStates, setUndoStates] = useState<IRedoState[]>([]);
  const [redoStates, setRedoStates] = useState<IRedoState[]>([]);
  const canvasRefMain = useRef<HTMLCanvasElement | null>(null);
  const canvasRefTemp = useRef<HTMLCanvasElement | null>(null);
  const canvasRefArrowhead = useRef<HTMLCanvasElement | null>(null);
  const [shapes, setShapes] = useState<ITrackingShape[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 992, height: 496 });
  const [actionTracker, setActionTracker] = useState({
    selectedMap: drillMaps[0].svgImagePath,
    selectedTool: toolsConfig["skate"][0],
    selectedColor: "black",
  });

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvasWrapper = document.getElementById("canvas_Wrapper");
      if (!canvasWrapper) return;

      const maxWidth = window.outerWidth - 32; // Adjust based on the actual padding/margin
      const aspectRatio = 992 / 496;
      let newWidth = maxWidth < 992 ? maxWidth : 992; // Ensure canvas width is less than or equal to screen width
      let newHeight = newWidth / aspectRatio;

      setCanvasSize({ width: newWidth, height: newHeight });
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  const pointerDown: PointerEventHandler<HTMLCanvasElement> = (event) => {
    //check first does selected tool's action is curve or geometry because that only action is dependent on pointerdown
    if (!(actionTracker.selectedTool.actionType === DrillActions.curve || actionTracker.selectedTool.actionType === DrillActions.geometry)) return;

    const main_Ctx = canvasRefMain.current?.getContext("2d");
    const temp_Ctx = canvasRefTemp.current?.getContext("2d");
    const arrow_Ctx = canvasRefArrowhead.current?.getContext("2d");

    const rect = canvasRefTemp.current?.getBoundingClientRect();

    //check does all canvas is accecible
    if (!(main_Ctx && temp_Ctx && arrow_Ctx && rect && canvasRefTemp.current && canvasRefArrowhead.current && canvasRefMain.current)) return;

    const clientX = event.clientX;
    const clientY = event.clientY;

    temp_Ctx.strokeStyle = actionTracker.selectedColor;
    arrow_Ctx.strokeStyle = actionTracker.selectedColor;

    temp_Ctx.lineWidth = 2;
    arrow_Ctx.lineWidth = 2;
    main_Ctx.lineWidth = 2;

    if ("curveType" in actionTracker.selectedTool) {
      currentShape = configureCurrentSHape({
        arrowHeadCanvas: canvasRefArrowhead.current,
        currentPointer: { x: clientX - rect.left, y: clientY - rect.top },
        curveType: actionTracker.selectedTool.curveType,
        tempCanvas: canvasRefTemp.current
      })
    }
  };

  const pointerMove: PointerEventHandler<HTMLCanvasElement> = (event) => {
    const clientX = event.clientX;
    const clientY = event.clientY;
    if (currentShape && canvasRefTemp.current) {
      const rect = canvasRefTemp.current.getBoundingClientRect();
      currentShape.draw(clientX - rect.left, clientY - rect.top);
    }
  };
  console.log("shapes", shapes);

  const pointerUp: PointerEventHandler<HTMLCanvasElement> = (event) => {
    if (!currentShape) return;
    if (
      !(currentShape &&
        canvasRefMain.current &&
        canvasRefTemp.current &&
        canvasRefArrowhead.current)
    ) return;


    const mainCtx = canvasRefMain.current.getContext("2d");
    const tempCtx = canvasRefTemp.current.getContext("2d");
    const arrowHeadCtx = canvasRefArrowhead.current.getContext("2d");

    if (!mainCtx || !tempCtx || !arrowHeadCtx) return;

    currentShape.stopDrawing();
    tempCtx.drawImage(canvasRefArrowhead.current, 0, 0);
    arrowHeadCtx.clearRect(
      0,
      0,
      canvasRefMain.current.width,
      canvasRefMain.current.height
    );

    // Draw temp canvas on main and clear the temp canvas
    mainCtx.drawImage(canvasRefTemp.current, 0, 0);
    tempCtx.clearRect(
      0,
      0,
      canvasRefMain.current.width,
      canvasRefMain.current.height
    );
    let shapeObject: ITrackingShape | null = null;
    if ("curveType" in actionTracker.selectedTool) {
      switch (actionTracker.selectedTool.actionType) {
        case DrillActions.curve:
          if ((currentShape as unknown as ICurveShape).points.length > 1) {
            shapeObject = {
              actionType: DrillActions.curve,
              points: (currentShape as unknown as ICurveShape).points,
              redrawFunction: currentShape.redrawCurve,
            } as ICurveShape;
          }
          break;
        case DrillActions.geometry:
          if (
            "startX" in currentShape &&
            "startY" in currentShape &&
            "endX" in currentShape &&
            "endY" in currentShape &&
            (currentShape.endX !== 0 || currentShape.endY !== 0)
          ) {
            shapeObject = {
              actionType: DrillActions.geometry,
              startingPoint: {
                x: currentShape.startX,
                y: currentShape.startY,
              } as TPoint,
              endingPoint: {
                x: currentShape.endX,
                y: currentShape.endY,
              } as TPoint,
              radius:
                "radius" in currentShape ? currentShape.radius : undefined,
              redrawFunction:
                currentShape.redrawCurve as IGeometricShape["redrawFunction"],
            } as IGeometricShape;
          }
          break;
        default:
          break;
      }
    }

    if (shapeObject) {
      addShape(shapeObject)
    }
    currentShape = null;
  };

  const pointerClick = (event: MouseEvent) => {
    if (!canvasRefTemp.current) return;
    const rect = canvasRefTemp.current.getBoundingClientRect();
    const mainCtx = canvasRefMain.current?.getContext("2d");
    const tempCtx = canvasRefTemp.current?.getContext("2d");

    if (!mainCtx || !tempCtx || !canvasRefMain.current) return; // Guard against null values

    const clientX = event.clientX;
    const clientY = event.clientY;

    if (actionTracker.selectedTool.actionType === DrillActions.draw) {
      const img = document.createElement("img");
      img.src = actionTracker.selectedTool.imagePath;
      img.onload = () => {
        mainCtx.drawImage(img, clientX - rect.left, clientY - rect.top, 30, 30);
        const shapeObject: ITrackingShape = {
          startingPoint: { x: clientX - rect.left, y: clientY - rect.top },
          imageUrl: actionTracker.selectedTool.imagePath,
          redrawFunction: () => {
            mainCtx.drawImage(img, clientX - rect.left, clientY - rect.top, 30, 30);
          },
          actionType: DrillActions.draw,
        };
        addShape(shapeObject)
      };
    }

    if (actionTracker.selectedTool.actionType === DrillActions.text) {
      const userInput = prompt("write text") || "";
      mainCtx.font = "18px serif";
      const metrics = mainCtx.measureText(userInput);
      const textHeight = parseInt(tempCtx.font, 10);
      mainCtx.fillText(userInput, clientX - rect.left, clientY - rect.top);
      mainCtx.drawImage(canvasRefTemp.current, 0, 0);
      const textShape: ITextShape = {
        actionType: DrillActions.text,
        startingPoint: { x: clientX - rect.left, y: clientY - rect.top },
        boundingBox: { width: metrics.width, height: textHeight },
        redrawFunction: () => {
          mainCtx.font = "18px serif";
          mainCtx.fillText(userInput, clientX - rect.left, clientY - rect.top);
        },
      };

      // setShapes((prevShapes) => [...prevShapes, textShape]);
      addShape(textShape)
    }

    if (
      actionTracker.selectedTool.actionType === DrillActions.random &&
      "curveType" in actionTracker.selectedTool
    ) {
      if (mainCtx) {
        const curveType = actionTracker.selectedTool.curveType;
        const puck = curveType === CurveTypes.puck
          ? new Puck(canvasRefTemp.current)
          : new GroupOfPucks(canvasRefTemp.current);
        puck.draw(clientX - rect.left, clientY - rect.top);
        const shapeObject = {
          actionType: DrillActions.random,
          points: puck.points,
          redrawFunction: puck.redrawCurve,
        } as IRandomShape;
        addShape(shapeObject)
      }
    }
    if (actionTracker.selectedTool.actionType === DrillActions.delete) {
      const mainCtx = canvasRefMain.current?.getContext("2d");
      if (!mainCtx) return;
      const clickedShape = detectShapeAtPoint({ x: clientX - rect.left, y: clientY - rect.top }, shapes);
      if (clickedShape) {
        const index = shapes.findIndex(shape => shape === clickedShape);
        if (index !== -1) {
          setUndoStates(prev => [...prev, { operation: "DELETE", index: index, shape: shapes[index] }]);
          const shapesAfterDelete = shapes.filter((_, shapeIndex) => shapeIndex !== index);
          mainCtx.clearRect(0, 0, canvasRefMain.current.width, canvasRefMain.current.height);
          tempCtx.clearRect(0, 0, canvasRefMain.current.width, canvasRefMain.current.height);
          redrawCanvas(shapesAfterDelete);
          setShapes(shapesAfterDelete);
        }
      }
    }
  };

  const addShape = (newShape: ITrackingShape) => {
    setShapes(prevShapes => [...prevShapes, newShape]);
    if (redoStates.length > 0 || undoStates.length > 0) {
      setRedoStates([]);
      setUndoStates([])
    }
  };

  const onUndo = () => {
    let newShapes = [...shapes];
    const mainCtx = canvasRefMain.current?.getContext("2d");
    const tempCtx = canvasRefTemp.current?.getContext("2d");
    if (!mainCtx || !tempCtx || !canvasRefMain.current) return;
    mainCtx.clearRect(0, 0, canvasRefMain.current.width, canvasRefMain.current.height);
    tempCtx.clearRect(0, 0, canvasRefMain.current.width, canvasRefMain.current.height)

    let actionForRedo;
    if (undoStates.length !== 0) {
      const lastAction = undoStates.pop();
      if (!lastAction || lastAction.index === undefined) return
      if (lastAction.operation === "DELETE") {
        newShapes.splice(lastAction.index, 0, lastAction.shape);
        actionForRedo = lastAction;
      } else {
        const removedShape = newShapes.pop(); // Assuming the shape to undo is the last one added
        if (removedShape) {
          actionForRedo = { operation: "ADD", shape: removedShape, index: newShapes.length };
        }
      }
    } else {
      if (newShapes.length > 0) {
        const removedShape = newShapes.pop(); // Remove the last shape as a default undo action
        actionForRedo = { operation: "ADD", shape: removedShape, index: newShapes.length };
      }
    }
    setShapes(newShapes);
    redrawCanvas(newShapes);
    if (actionForRedo) {
      setRedoStates((prev) => [...prev, actionForRedo]);
    }
  };

  const onRedo = () => {
    if (redoStates.length === 0) return;
    const mainCtx = canvasRefMain.current?.getContext("2d");
    const tempCtx = canvasRefTemp.current?.getContext("2d");
    if (!mainCtx || !tempCtx || !canvasRefMain.current) return;
    mainCtx.clearRect(0, 0, canvasRefMain.current.width, canvasRefMain.current.height);
    tempCtx.clearRect(0, 0, canvasRefMain.current.width, canvasRefMain.current.height)
    const redoAction = redoStates.pop();
    if (!redoAction) return;

    let newShapes = [...shapes];

    if (redoAction.operation === "DELETE" && typeof redoAction.index === 'number') {
      newShapes = newShapes.filter((_, index) => index !== redoAction.index);
    } else {
      newShapes.push(redoAction.shape);
    }
    setShapes(newShapes);
    if (canvasRefMain.current)
      redrawCanvas(newShapes);
    setUndoStates((prev) => [...prev, redoAction]);
  };

  const redrawCanvas = (shapes: ITrackingShape[]) => {
    const mainCtx = canvasRefMain.current?.getContext("2d");
    if (!mainCtx) return;
    mainCtx.lineWidth = 2;
    shapes.forEach((shape) => {
      switch (shape.actionType) {
        case DrillActions.curve:
          (shape as ICurveShape).redrawFunction({
            canvasCtx: mainCtx,
            points: shape.points
          });
          break;
        case DrillActions.draw:
          (shape as IImageShape).redrawFunction();
          break;
        case DrillActions.geometry:
          (shape as IGeometricShape).redrawFunction({
            canvasCtx: mainCtx,
            startingPoint: shape.startingPoint,
            endingPoint: shape.endingPoint,
            radius: shape.radius
          });
          break;
        case DrillActions.random:
          (shape as IRandomShape).redrawFunction({
            canvasCtx: mainCtx,
            points: shape.points,
          });
          break;
        case DrillActions.text:
          (shape as ITextShape).redrawFunction();
          break;
        default:
          console.log("Unknown shape type or missing data for redraw");
      }
    });
  };

  const onCanvasClear = () => {
    const mainCtx = canvasRefMain.current?.getContext("2d");
    if (mainCtx) {
      mainCtx.clearRect(
        0,
        0,
        canvasRefMain.current?.width || 0,
        canvasRefMain.current?.height || 0
      );
    }
    setRedoStates([]);
  };

  const onChangeTool = (tool: IDrillCurve | IDrillImage) => {
    setActionTracker((prevAction) => ({ ...prevAction, selectedTool: tool }));
  };

  const onChangeColor = (color: string) => {
    setActionTracker((actionTracker) => ({
      ...actionTracker,
      selectedColor: color,
    }));
  };

  const handleMapChange = (svgImagePath: string) => {
    setActionTracker((prevAction) => ({
      ...prevAction,
      selectedMap: svgImagePath,
    }));
  };

  return {
    canvasRefMain,
    canvasRefTemp,
    canvasRefArrowhead,
    canvasSize,
    pointerDown,
    pointerMove,
    pointerUp,
    pointerClick,
    onUndo,
    onRedo,
    onCanvasClear,
    onChangeColor,
    onChangeTool,
    actionTracker,
    handleMapChange,
  };
};

export default useCanvas;