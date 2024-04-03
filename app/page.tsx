'use client'
import Tooltip from "@/components/Tooltip";
import ToolSelection from "@/components/tool-selection";
import { FreeHandSkate, FreeHandSkateWithPuck, FreeHandSkateWithPuckAndStop, FreeHandSkateWithStop, FreehandLateralSkating, FreehandLateralSkatingToStop, FreehandSkateBackwardWithPuck, FreehandSkateBackwardWithPuckAndStop, FreehandSkateBackwardWithoutPuck, FreehandSkateBackwardWithoutPuckAndStop, GroupOfPucks, IDrillCurve, Pass, Puck, Shot, StraightSkate, StraightSkateWithStop, RectangleOverlay, RectangleBorder, CircleOverlay, BorderedCircle, TriangleOverlay, BorderTriangle, StarightLine, FreehandDashedLine, StraightDashedLine, FreehandLine } from "@/data/drill-curves";
import { IDrillImage } from "@/data/drill-images";
import { drillMaps } from "@/data/drill-map";
import { toolsConfig } from "@/data/toolsConfig";
import { CurveTypes, DrillActions } from "@/types/drill-actions";
import Image from "next/image";
import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";

let currentShape: FreeHandSkateWithStop | FreeHandSkateWithPuck | StraightSkate | StraightSkateWithStop | FreeHandSkate | FreeHandSkateWithPuckAndStop | FreehandSkateBackwardWithPuckAndStop | FreehandSkateBackwardWithPuck | FreehandSkateBackwardWithoutPuckAndStop | FreehandSkateBackwardWithoutPuck | RectangleOverlay | RectangleBorder | CircleOverlay | BorderedCircle | TriangleOverlay | BorderTriangle | StarightLine | FreehandDashedLine | StraightDashedLine | FreehandLine | null = null;
export default function Home() {
  type MouseOrTouchEvent = MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>;
  const [canvasStates, setCanvasStates] = useState<string[]>([]);
  const [redoStates, setRedoStates] = useState<string[]>([]);
  const [actionTracker, setActionTracker] = useState<{ selectedMap: string, selectedTool: IDrillCurve | IDrillImage, selectedColor: string }>({
    selectedMap: drillMaps[0].svgImagePath,
    selectedTool: toolsConfig['skate'][0],
    selectedColor: 'black'
  })
  const canvas_Ref_Main = useRef<HTMLCanvasElement | null>(null)
  const canvas_Ref_Temp = useRef<HTMLCanvasElement | null>(null)
  const canvas_Ref_Arrowhead = useRef<HTMLCanvasElement | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 992, height: 496 });

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

  console.log(canvasSize, 'size')
  const onChangeTool = (tool: IDrillCurve | IDrillImage) => {
    setActionTracker((prevAction) => ({ ...prevAction, selectedTool: tool }))
  }

  const onChangeColor = (color: string) => {
    setActionTracker((actionTracker) => ({ ...actionTracker, selectedColor: color }))
  }

  const captureCanvasState = () => {
    const canvas = canvas_Ref_Main.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      setCanvasStates([...canvasStates, dataUrl]);
      setRedoStates([]);
    }
  };
  const mouseDown = (event: MouseOrTouchEvent) => {

    if (canvas_Ref_Temp.current && canvas_Ref_Arrowhead.current && actionTracker.selectedTool.actionType === DrillActions.curve) {
      const rect = canvas_Ref_Temp.current.getBoundingClientRect();
      let clientX, clientY;

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

      const temp_Ctx = canvas_Ref_Temp.current.getContext('2d')
      const arrow_Ctx = canvas_Ref_Arrowhead.current.getContext('2d')
      if (temp_Ctx && arrow_Ctx) {
        temp_Ctx.strokeStyle = actionTracker.selectedColor;
        arrow_Ctx.strokeStyle = actionTracker.selectedColor;
      }
      if (actionTracker.selectedTool.actionType === DrillActions.curve) {
        if ('curveType' in actionTracker.selectedTool) {
          switch (actionTracker.selectedTool.curveType) {
            case CurveTypes.freeHandSkate:
              currentShape = new FreeHandSkate(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current, canvas_Ref_Arrowhead.current)
              break;
            case CurveTypes.freeHandSkateWithStop:
              currentShape = new FreeHandSkateWithStop(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current, canvas_Ref_Arrowhead.current)
              break;
            case CurveTypes.straightSkate:
              currentShape = new StraightSkate(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.straightSkateWithStop:
              currentShape = new StraightSkateWithStop(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.freeHandSkateWithPuck:
              currentShape = new FreeHandSkateWithPuck(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current, canvas_Ref_Arrowhead.current)
              break;
            case CurveTypes.freeHandSkateWithPuckAndStop:
              currentShape = new FreeHandSkateWithPuckAndStop(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current, canvas_Ref_Arrowhead.current)
              break;
            case CurveTypes.freehandSkateBackwardWithPuckAndStop:
              currentShape = new FreehandSkateBackwardWithPuckAndStop(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current, canvas_Ref_Arrowhead.current)
              break;
            case CurveTypes.freehandSkateBackwardWithPuck:
              currentShape = new FreehandSkateBackwardWithPuck(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current, canvas_Ref_Arrowhead.current)
              break;
            case CurveTypes.freehandSkateBackwardWithoutPuckAndStop:
              currentShape = new FreehandSkateBackwardWithoutPuckAndStop(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current, canvas_Ref_Arrowhead.current)
              break;
            case CurveTypes.freehandSkateBackwardWithoutPuck:
              currentShape = new FreehandSkateBackwardWithoutPuck(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current, canvas_Ref_Arrowhead.current)
              break;
            case CurveTypes.straightPass:
              currentShape = new Pass(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.straightShot:
              currentShape = new Shot(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.freehandLateralSkating:
              currentShape = new FreehandLateralSkating(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.freehandLateralSkatingToStop:
              currentShape = new FreehandLateralSkatingToStop(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.zigzag:
              currentShape = new RectangleOverlay(canvas_Ref_Temp.current);
              currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
              break;
            case CurveTypes.curve:
              currentShape = new RectangleBorder(canvas_Ref_Temp.current);
              currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
              break;
            case CurveTypes.circle:
              currentShape = new CircleOverlay(canvas_Ref_Temp.current);
              currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
              break;
            case CurveTypes.filledCircle:
              currentShape = new BorderedCircle(canvas_Ref_Temp.current);
              currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
              break;
            case CurveTypes.triangle:
              currentShape = new TriangleOverlay(canvas_Ref_Temp.current);
              currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
              break;
            case CurveTypes.filledTriangle:
              currentShape = new BorderTriangle(canvas_Ref_Temp.current);
              currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
              break;
            case CurveTypes.starightLine:
              currentShape = new StarightLine(canvas_Ref_Temp.current);
              currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
              break;
            case CurveTypes.freehandLine:
              currentShape = new FreehandLine(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current);
              break;
            case CurveTypes.straightDashedLine:
              currentShape = new StraightDashedLine(clientX - rect.left, clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.freehandDashedLine:
              currentShape = new FreehandDashedLine(canvas_Ref_Temp.current);
              currentShape.startDrawing(clientX - rect.left, clientY - rect.top);
              break;
            default:
              break;
          }
        }
      }

    }
  }

  const mouseMove = (event: MouseOrTouchEvent) => {
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

    if (currentShape && canvas_Ref_Temp.current) {
      const rect = canvas_Ref_Temp.current.getBoundingClientRect();
      currentShape.draw(clientX - rect.left, clientY - rect.top);
    }
  };

  const mouseUp = (event: MouseOrTouchEvent) => {
    if (currentShape && canvas_Ref_Main.current && canvas_Ref_Temp.current) {
      const mainCtx = canvas_Ref_Main.current.getContext('2d');
      const tempCtx = canvas_Ref_Temp.current.getContext('2d');
      currentShape.stopDrawing();
      if (mainCtx && tempCtx) {
        mainCtx.drawImage(canvas_Ref_Temp.current, 0, 0);
        tempCtx.clearRect(0, 0, canvas_Ref_Main.current.width, canvas_Ref_Main.current.height);
      }
    }
    captureCanvasState();
  };

  const mouseClick = (event: MouseOrTouchEvent) => {
    if (!canvas_Ref_Temp.current) return;

    const rect = canvas_Ref_Temp.current.getBoundingClientRect();
    const mainCtx = canvas_Ref_Main.current?.getContext('2d');
    const tempCtx = canvas_Ref_Temp.current?.getContext('2d');

    if (!mainCtx || !tempCtx || !canvas_Ref_Main.current) return; // Guard against null values

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

    if (actionTracker.selectedTool.actionType === DrillActions.draw) {
      const img = document.createElement('img');
      img.src = actionTracker.selectedTool.imagePath;
      img.onload = () => {
        tempCtx.drawImage(img, clientX - rect.left, clientY - rect.top, 30, 30);
        if (canvas_Ref_Temp.current && canvas_Ref_Main.current) {
          mainCtx.drawImage(canvas_Ref_Temp.current, 0, 0);
          tempCtx.clearRect(0, 0, canvas_Ref_Main.current.width, canvas_Ref_Main.current.height);
        }
      };
    }

    if (actionTracker.selectedTool.actionType === DrillActions.text) {
      const userInput = prompt('write text') || '';
      tempCtx.font = "18px serif";
      tempCtx.fillText(userInput, clientX - rect.left, clientY - rect.top);
      mainCtx.drawImage(canvas_Ref_Temp.current, 0, 0);
      tempCtx.clearRect(0, 0, canvas_Ref_Main.current.width, canvas_Ref_Main.current.height);
    }

    if (actionTracker.selectedTool.actionType === DrillActions.random && 'curveType' in actionTracker.selectedTool) {
      if (canvas_Ref_Temp.current) {
        const curveType = actionTracker.selectedTool.curveType;
        const puck = curveType === CurveTypes.puck ? new Puck(canvas_Ref_Temp.current) : new GroupOfPucks(canvas_Ref_Temp.current);
        puck.draw(clientX - rect.left, clientY - rect.top);
      }
    }
  };


  const onUndo = () => {
    if (canvasStates.length <= 0) return; // Keep initial state to avoid empty canvas
    const newState = [...canvasStates].slice(0, -1);
    setCanvasStates(newState);
    const lastState = canvasStates[canvasStates.length - 1];
    setRedoStates([...redoStates, lastState]);
    redrawCanvas(newState[newState.length - 1]);
  };

  const redrawCanvas = (dataUrl: string) => {
    const canvas = canvas_Ref_Main.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (!dataUrl) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
        const img = document.createElement('img');
        img.src = dataUrl;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
      }
    }
  };

  const onRedo = () => {
    if (redoStates.length === 0) return;
    const redoState = redoStates.pop();
    if (redoState) {
      setCanvasStates([...canvasStates, redoState]);
      redrawCanvas(redoState);
    }
  };

  const onCanvasClear = () => {
    const mainCtx = canvas_Ref_Main.current?.getContext('2d');
    if (mainCtx) {
      mainCtx.clearRect(0, 0, canvas_Ref_Main.current?.width || 0, canvas_Ref_Main.current?.height || 0)
    }
    setCanvasStates([])
    setRedoStates([])
  }

  const getCoordinates = (event: any) => {
    if (event.touches && event.touches.length > 0) {
      const touch = event.touches[0];
      return { clientX: touch.clientX, clientY: touch.clientY };
    }
    return { clientX: event.clientX, clientY: event.clientY };
  };

  const handleEvent = (event: MouseOrTouchEvent) => {
    const { clientX, clientY } = getCoordinates(event);
    if (!canvas_Ref_Temp.current || !clientX && !clientY) return;
    // Example: Handling mouseDown and touchStart
    if (event.type === 'mousedown' || event.type === 'touchstart') {
      mouseDown(event); // Call mouseDown function with event
    }

    // Example: Handling mouseMove and touchMove
    if (event.type === 'mousemove' || event.type === 'touchmove') {
      mouseMove(event); // Call mouseMove function with event
    }

    // Example: Handling mouseUp, mouseLeave, touchEnd, and touchCancel
    if (event.type === 'mouseup' || event.type === 'mouseleave' || event.type === 'touchend' || event.type === 'touchcancel') {
      mouseUp(event); // Call mouseUp function with event
      // Insert your existing mouseUp logic here
    }

    if (event.type === 'click' || event.type === 'touchstart') {
      mouseClick(event); // Call mouseClick function with event
    }
  };

  return (
    <main className="max-w-[992px] mx-auto px-4 lg:px-0">
      <div className="flex justify-center items-center gap-1 md:gap-4 flex-wrap mt-4">
        {
          drillMaps.map((map, index) => <Tooltip text={map.label} key={index}>
            <div className="group bg-gray-100 p-2 rounded-md h-20 w-20 m-auto cursor-pointer" onClick={() => setActionTracker((prevAction) => ({ ...prevAction, selectedMap: map.svgImagePath }))}>
              <Image src={map.svgImagePath} height={50} width={80} alt="full-rink" className="h-full m-auto" />
            </div>
          </Tooltip>
          )
        }
      </div>
      <div className="relative w-full" id="canvas_Wrapper">
        <canvas id="drill_Canvas" height={canvasSize.height}
          width={canvasSize.width} className=" border-black" ref={canvas_Ref_Main} style={{ backgroundImage: `url(${actionTracker.selectedMap})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
        <canvas id="drill_Canvas_Arrowhead" className="absolute left-0 top-0" height={canvasSize.height}
          width={canvasSize.width} ref={canvas_Ref_Arrowhead}
        />
        <canvas
          id="drill_Canvas_Temp"
          className="absolute left-0 top-0 "
          height={canvasSize.height}
          width={canvasSize.width}
          ref={canvas_Ref_Temp}
          onMouseDown={handleEvent}
          onTouchStart={handleEvent}
          onMouseMove={handleEvent}
          onTouchMove={handleEvent}
          onMouseUp={handleEvent}
          onTouchEnd={mouseUp}
          onMouseLeave={handleEvent}
          onTouchCancel={handleEvent}
          onClick={handleEvent} // Ensure touch events are also handled for click
        />

      </div >
      <ToolSelection onToolChange={onChangeTool} selectedTool={actionTracker.selectedTool} activeColor={actionTracker.selectedColor} undo={onUndo} redo={onRedo} clear={onCanvasClear} onChangeColor={onChangeColor} />
    </main >
  );
}
