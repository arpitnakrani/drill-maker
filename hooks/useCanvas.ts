import { useState, useEffect, useRef, TouchEvent, MouseEvent, PointerEventHandler } from "react";
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

let currentShape:
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
  | StraightLine
  | FreehandDashedLine
  | StraightDashedLine
  | FreehandLine
  | null = null;
type MouseOrTouchEvent =
  | MouseEvent<HTMLCanvasElement>
  | TouchEvent<HTMLCanvasElement>;

const useCanvas = () => {
  const [undoStates, setUndoStates] = useState<string[]>([]);
  const [redoStates, setRedoStates] = useState<string[]>([]);
  const canvasRefMain = useRef<HTMLCanvasElement | null>(null);
  const canvasRefTemp = useRef<HTMLCanvasElement | null>(null);
  const canvasRefArrowhead = useRef<HTMLCanvasElement | null>(null);
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

  const captureCanvasState = () => {
    const canvas = canvasRefMain.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      setUndoStates([...undoStates, dataUrl]);
      setRedoStates([]);
    }
  };

  const pointerDown = (event: MouseOrTouchEvent) => {
    const body = document.getElementsByTagName("body")[0];
    if (body) {
      body.style.overflow = "hidden";
    }
    if (!(canvasRefTemp.current && canvasRefArrowhead.current && actionTracker.selectedTool.actionType === DrillActions.curve)) return;

    const rect = canvasRefTemp.current.getBoundingClientRect();
    const clientX = "touches" in event ? event.touches[0].clientX : (event as MouseEvent<HTMLCanvasElement>).clientX;
    const clientY = "touches" in event ? event.touches[0].clientY : (event as MouseEvent<HTMLCanvasElement>).clientY;

    const temp_Ctx = canvasRefTemp.current.getContext("2d");
    const arrow_Ctx = canvasRefArrowhead.current.getContext("2d");

    if (!temp_Ctx || !arrow_Ctx) return;

    temp_Ctx.strokeStyle = actionTracker.selectedColor;
    arrow_Ctx.strokeStyle = actionTracker.selectedColor;

    temp_Ctx.lineWidth = 2;
    arrow_Ctx.lineWidth = 2;

    if (actionTracker.selectedTool.actionType === DrillActions.curve) {
      if ("curveType" in actionTracker.selectedTool) {
        switch (actionTracker.selectedTool.curveType) {
          case CurveTypes.freeHandSkate:
            currentShape = new FreeHandSkate(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current,
              canvasRefArrowhead.current
            );
            break;
          case CurveTypes.freeHandSkateWithStop:
            currentShape = new FreeHandSkateWithStop(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current,
              canvasRefArrowhead.current
            );
            break;
          case CurveTypes.straightSkate:
            currentShape = new StraightSkate(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current
            );
            break;
          case CurveTypes.straightSkateWithStop:
            currentShape = new StraightSkateWithStop(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current
            );
            break;
          case CurveTypes.freeHandSkateWithPuck:
            currentShape = new FreeHandSkateWithPuck(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current,
              canvasRefArrowhead.current
            );
            break;
          case CurveTypes.freeHandSkateWithPuckAndStop:
            currentShape = new FreeHandSkateWithPuckAndStop(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current,
              canvasRefArrowhead.current
            );
            break;
          case CurveTypes.freehandSkateBackwardWithPuckAndStop:
            currentShape = new FreehandSkateBackwardWithPuckAndStop(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current,
              canvasRefArrowhead.current
            );
            break;
          case CurveTypes.freehandSkateBackwardWithPuck:
            currentShape = new FreehandSkateBackwardWithPuck(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current,
              canvasRefArrowhead.current
            );
            break;
          case CurveTypes.freehandSkateBackwardWithoutPuckAndStop:
            currentShape = new FreehandSkateBackwardWithoutPuckAndStop(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current,
              canvasRefArrowhead.current
            );
            break;
          case CurveTypes.freehandSkateBackwardWithoutPuck:
            currentShape = new FreehandSkateBackwardWithoutPuck(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current,
              canvasRefArrowhead.current
            );
            break;
          case CurveTypes.straightPass:
            currentShape = new Pass(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current
            );
            break;
          case CurveTypes.straightShot:
            currentShape = new Shot(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current
            );
            break;
          case CurveTypes.freehandLateralSkating:
            currentShape = new FreehandLateralSkating(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current,
              canvasRefArrowhead.current
            );
            break;
          case CurveTypes.freehandLateralSkatingToStop:
            currentShape = new FreehandLateralSkatingToStop(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current,
              canvasRefArrowhead.current
            );
            break;
          case CurveTypes.zigzag:
            currentShape = new RectangleOverlay(canvasRefTemp.current);
            currentShape.startDrawing(
              clientX - rect.left,
              clientY - rect.top
            );
            break;
          case CurveTypes.curve:
            currentShape = new RectangleBorder(canvasRefTemp.current);
            currentShape.startDrawing(
              clientX - rect.left,
              clientY - rect.top
            );
            break;
          case CurveTypes.circle:
            currentShape = new CircleOverlay(canvasRefTemp.current);
            currentShape.startDrawing(
              clientX - rect.left,
              clientY - rect.top
            );
            break;
          case CurveTypes.filledCircle:
            currentShape = new BorderedCircle(canvasRefTemp.current);
            currentShape.startDrawing(
              clientX - rect.left,
              clientY - rect.top
            );
            break;
          case CurveTypes.triangle:
            currentShape = new TriangleOverlay(canvasRefTemp.current);
            currentShape.startDrawing(
              clientX - rect.left,
              clientY - rect.top
            );
            break;
          case CurveTypes.filledTriangle:
            currentShape = new BorderTriangle(canvasRefTemp.current);
            currentShape.startDrawing(
              clientX - rect.left,
              clientY - rect.top
            );
            break;
          case CurveTypes.starightLine:
            currentShape = new StraightLine(canvasRefTemp.current);
            currentShape.startDrawing(
              clientX - rect.left,
              clientY - rect.top
            );
            break;
          case CurveTypes.freehandLine:
            currentShape = new FreehandLine(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current
            );
            break;
          case CurveTypes.straightDashedLine:
            currentShape = new StraightDashedLine(
              clientX - rect.left,
              clientY - rect.top,
              canvasRefTemp.current
            );
            break;
          case CurveTypes.freehandDashedLine:
            currentShape = new FreehandDashedLine(canvasRefTemp.current);
            currentShape.startDrawing(
              clientX - rect.left,
              clientY - rect.top
            );
            break;
          default:
            break;
        }
      }
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

    const body = document.getElementsByTagName("body")[0];
    if (body) {
      body.style.overflow = "unset";
    }

    if (
      currentShape &&
      canvasRefMain.current &&
      canvasRefTemp.current &&
      canvasRefArrowhead.current
    ) {
      const mainCtx = canvasRefMain.current.getContext("2d");
      const tempCtx = canvasRefTemp.current.getContext("2d");
      const arrowHeadCtx = canvasRefArrowhead.current.getContext("2d");

      if (!mainCtx || !tempCtx || !arrowHeadCtx) return;

      currentShape.stopDrawing();

      // Draw arrow on temp canvas and clear the arrowhead canvas (applicable for freehand curve)
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
    }

    captureCanvasState();
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
        captureCanvasState()
      };
    }

    if (actionTracker.selectedTool.actionType === DrillActions.text) {
      const userInput = prompt("write text") || "";
      tempCtx.font = "18px serif";
      tempCtx.fillText(userInput, clientX - rect.left, clientY - rect.top);
      mainCtx.drawImage(canvasRefTemp.current, 0, 0);
      tempCtx.clearRect(
        0,
        0,
        canvasRefMain.current.width,
        canvasRefMain.current.height
      );
      captureCanvasState()

    }

    if (
      actionTracker.selectedTool.actionType === DrillActions.random &&
      "curveType" in actionTracker.selectedTool
    ) {
      if (canvasRefTemp.current) {
        const curveType = actionTracker.selectedTool.curveType;
        const puck =
          curveType === CurveTypes.puck
            ? new Puck(canvasRefTemp.current)
            : new GroupOfPucks(canvasRefTemp.current);
        puck.draw(clientX - rect.left, clientY - rect.top);
      }
      captureCanvasState()
    }
  };

  console.log(undoStates, 'state')

  // undo logic :  we store canvas snapshot at every time after user draw curve then we store it into the undo state(array)(here name as canvasstate) and when we click on undo we remove that last draw from the state and push into redo state and display last element of undo state

  const onUndo = () => {
    if (undoStates.length <= 0) return; // Keep initial state to avoid empty canvas
    const newState = [...undoStates].slice(0, -1);
    setUndoStates(newState);
    const lastState = undoStates[undoStates.length - 1];
    setRedoStates([...redoStates, lastState]);
    redrawCanvas(newState[newState.length - 1]);
  };

  const onRedo = () => {
    if (redoStates.length === 0) return;
    const redoState = redoStates.pop();
    if (redoState) {
      setUndoStates([...undoStates, redoState]);
      redrawCanvas(redoState);
    }
  };

  const redrawCanvas = (dataUrl: string) => {
    const canvas = canvasRefMain.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        if (!dataUrl) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
        const img = document.createElement("img");
        img.src = dataUrl;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
      }
    }
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
    setUndoStates([]);
    setRedoStates([]);
  };

  const getCoordinates = (event: any) => {
    if (event.touches && event.touches.length > 0) {
      const touch = event.touches[0];
      return { clientX: touch.clientX, clientY: touch.clientY };
    }
    return { clientX: event.clientX, clientY: event.clientY };
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
    getCoordinates,
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
