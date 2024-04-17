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
import { isPointNearShape } from "@/utils/shapeUtils";
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
  operation: "UNDO" | "DELETE";
  index?: number;
  shape: ITrackingShape;
}
const useCanvas = () => {
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
          shapeObject = {
            actionType: DrillActions.curve,
            points: (currentShape as unknown as ICurveShape).points,
            redrawFunction: currentShape.redrawCurve,
          } as ICurveShape;
          break;
        case DrillActions.geometry:
          if (
            "startX" in currentShape &&
            "startY" in currentShape &&
            "endX" in currentShape &&
            "endY" in currentShape
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
      setShapes((prevShapes) => [...prevShapes, shapeObject]);
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
            const img = new Image();
            img.src = actionTracker.selectedTool.imagePath;;
            img.onload = () => {
              mainCtx.drawImage(img, clientX - rect.left, clientY - rect.top, 30, 30);
            };
          },
          actionType: DrillActions.draw,
        };
        setShapes((prevShapes) => [...prevShapes, shapeObject]);
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

      setShapes((prevShapes) => [...prevShapes, textShape]);
    }

    if (
      actionTracker.selectedTool.actionType === DrillActions.random &&
      "curveType" in actionTracker.selectedTool
    ) {
      if (canvasRefTemp.current) {

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
        setShapes((prevShapes) => [...prevShapes, shapeObject]);
      }
    }

    if (actionTracker.selectedTool.actionType === DrillActions.delete) {
      const mainCtx = canvasRefMain.current?.getContext("2d");
      if (!mainCtx) return;
      for (let i = 0; i < shapes.length; i++) {
        if (
          isPointNearShape(
            { x: clientX - rect.left, y: clientY - rect.top },
            shapes[i]
          )
        ) {
          mainCtx.clearRect(
            0,
            0,
            canvasRefMain.current.width,
            canvasRefMain.current.height
          ); // Clear the entire canvas
          tempCtx.clearRect(0, 0, canvasRefMain.current.width,
            canvasRefMain.current.height)
          const shapesAfterDelete = shapes.filter(
            (_, shapeIndex) => shapeIndex !== i
          );
          setShapes(shapesAfterDelete);
          redrawCanvas(shapesAfterDelete)
          return;
        }
      }
    }
  };
  console.log("shapes", shapes);

  const onUndo = (shape: ITrackingShape) => {
    if (shapes.length <= 0) return;
    const shapesAfterUndo = shapes.slice(0, -1);

    setRedoStates((prev) => [
      ...prev,
      {
        operation: "UNDO",
        shape,
      },
    ]);
    setShapes(shapesAfterUndo);
    redrawCanvas(shapesAfterUndo);
  };

  const onRedo = () => {
    if (redoStates.length === 0) return;
    const redoState = redoStates.pop();
    if (!redoState) return;
    if (redoState?.operation === "DELETE") {
      if (redoState.shape.actionType === DrillActions.draw) {
      } else if (redoState.shape.actionType === DrillActions.curve) {
        const shapeAfterRedo = shapes.splice(
          redoState.index || 0,
          0,
          redoState.shape
        );
        redrawCanvas(shapeAfterRedo);
      }
    } else {
      const shapeAfterRedo = [...shapes, redoState.shape];
      redrawCanvas(shapeAfterRedo);
    }
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
