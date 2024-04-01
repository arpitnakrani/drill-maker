'use client'
import Tooltip from "@/components/Tooltip";
import ToolSelection from "@/components/tool-selection";
import { FreeHandSkate, FreeHandSkateWithPuck, FreeHandSkateWithPuckAndStop, FreeHandSkateWithStop, FreehandLateralSkating, FreehandLateralSkatingToStop, FreehandSkateBackwardWithPuck, FreehandSkateBackwardWithPuckAndStop, FreehandSkateBackwardWithoutPuck, FreehandSkateBackwardWithoutPuckAndStop, IDrillCurve, Pass, Shot, StraightSkate, StraightSkateWithStop } from "@/data/drill-curves";
import { IDrillImage } from "@/data/drill-images";
import { drillMaps } from "@/data/drill-map";
import { toolsConfig } from "@/data/toolsConfig";
import { CurveTypes, DrillActions } from "@/types/drill-actions";
import Image from "next/image";
import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";

let currentShape: FreeHandSkateWithStop | FreeHandSkateWithPuck | StraightSkate | StraightSkateWithStop | FreeHandSkate | FreeHandSkateWithPuckAndStop | FreehandSkateBackwardWithPuckAndStop | FreehandSkateBackwardWithPuck | FreehandSkateBackwardWithoutPuckAndStop | FreehandSkateBackwardWithoutPuck | null = null;
export default function Home() {
  type MouseOrTouchEvent = MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>;
  const [canvasStates, setCanvasStates] = useState<string[]>([]);
  const [redoStates, setRedoStates] = useState<string[]>([]);
  const [actionTracker, setActionTracker] = useState<{ selectedMap: string, selectedTool: IDrillCurve | IDrillImage }>({
    selectedMap: drillMaps[0].svgImagePath,
    selectedTool: toolsConfig['skate'][0]
  })
  const canvas_Ref_Main = useRef<HTMLCanvasElement | null>(null)
  const canvas_Ref_Temp = useRef<HTMLCanvasElement | null>(null)
  const canvas_Ref_Arrowhead = useRef<HTMLCanvasElement | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 992, height: 496 });

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvasWrapper = document.getElementById('canvas_Wrapper');
      if (!canvasWrapper) return;

      const maxWidth = canvasWrapper.clientWidth - 16; // Adjust based on the actual padding/margin
      const aspectRatio = 992 / 496;
      let newWidth = maxWidth < 992 ? maxWidth : 992; // Ensure canvas width is less than or equal to screen width
      let newHeight = newWidth / aspectRatio;

      setCanvasSize({ width: newWidth, height: newHeight });
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const onChangeTool = (tool: IDrillCurve | IDrillImage) => {
    setActionTracker((prevAction) => ({ ...prevAction, selectedTool: tool }))
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
    let clientX, clientY;

    if ('touches' in event && event.touches) {
      // Type assertion for touch event
      const touchEvent = event as TouchEvent;
      clientX = touchEvent.changedTouches[0].clientX;
      clientY = touchEvent.changedTouches[0].clientY;
    } else {
      // Type assertion for mouse event
      const mouseEvent = event as MouseEvent<HTMLCanvasElement>;
      clientX = mouseEvent.clientX;
      clientY = mouseEvent.clientY;
    }

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


  // const mouseMove: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
  //   if (currentShape && canvas_Ref_Temp.current) {
  //     const rect = canvas_Ref_Temp.current.getBoundingClientRect();
  //     currentShape.draw(event.clientX - rect.left, event.clientY - rect.top)
  //   }
  // };

  // const mouseUp: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
  //   if (currentShape && canvas_Ref_Main.current && canvas_Ref_Temp.current) {
  //     const mainCtx = canvas_Ref_Main.current.getContext('2d')
  //     const tempCtx = canvas_Ref_Temp.current.getContext('2d')
  //     currentShape.stopDrawing()

  //     if (mainCtx && tempCtx) {
  //       mainCtx.drawImage(canvas_Ref_Temp.current, 0, 0);
  //       tempCtx.clearRect(0, 0, canvas_Ref_Main.current.width, canvas_Ref_Main.current.height);
  //     }
  //   }
  //   captureCanvasState()
  // }

  const mouseLeave: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    console.log(event, 'event-down')
  }

  const mouseClick = (event: MouseOrTouchEvent) => {
    if (!(actionTracker.selectedTool.actionType === DrillActions.draw || (actionTracker.selectedTool.actionType === DrillActions.text))) return;

    if (actionTracker.selectedTool.actionType === DrillActions.draw) {

      const mainCtx = canvas_Ref_Main.current?.getContext('2d');
      const tempCtx = canvas_Ref_Temp.current?.getContext('2d');
      if (!canvas_Ref_Temp.current || !mainCtx || !tempCtx) return; // Guard against null values

      const img = document.createElement('img');
      const rect = canvas_Ref_Temp.current.getBoundingClientRect();
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

      img.src = actionTracker.selectedTool.imagePath;
      img.onload = () => {
        tempCtx.drawImage(img, clientX - rect.left, clientY - rect.top, 30, 30);
        if (canvas_Ref_Temp.current && canvas_Ref_Main.current) {
          mainCtx.drawImage(canvas_Ref_Temp.current, 0, 0); // Safe to use after the null check
          tempCtx.clearRect(0, 0, canvas_Ref_Main.current.width, canvas_Ref_Main.current.height);
        }
      };
    }
    if (actionTracker.selectedTool.actionType === DrillActions.text) {
      const userInput = prompt('write text') || ''
      const mainCtx = canvas_Ref_Main.current?.getContext('2d');
      const tempCtx = canvas_Ref_Temp.current?.getContext('2d');

      if (!canvas_Ref_Temp.current || !canvas_Ref_Main.current || !mainCtx || !tempCtx) return;
      const rect = canvas_Ref_Temp.current.getBoundingClientRect();
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
      tempCtx.font = "18px serif";
      tempCtx.fillText(userInput, clientX - rect.left, clientY - rect.top)
      mainCtx.drawImage(canvas_Ref_Temp.current, 0, 0);
      tempCtx.clearRect(0, 0, canvas_Ref_Main.current.width, canvas_Ref_Main.current.height);

    }
  };

  const onUndo = () => {
    if (canvasStates.length <= 1) return; // Keep initial state to avoid empty canvas
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
  const handleEvent = (event: any) => {
    const { clientX, clientY } = getCoordinates(event);
    if (!canvas_Ref_Temp.current || !clientX && !clientY) return;

    const rect = canvas_Ref_Temp.current.getBoundingClientRect();

    // At this point, TypeScript knows rect cannot be undefined because we've already checked canvas_Ref_Temp.current
    const x = clientX - rect.left;
    const y = clientY - rect.top;

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
      console.log(event.type, 'event.type');
      mouseClick(event); // Call mouseClick function with event
    }
  };

  return (
    <main className="max-w-[992px] mx-auto px-4 sm:px-6 lg:px-8">
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
          width={canvasSize.width} className="w-full max-w-[992px] max-h-[496px] h-full border-black mt-4" ref={canvas_Ref_Main} style={{ backgroundImage: `url(${actionTracker.selectedMap})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
        <canvas id="drill_Canvas_Arrowhead" className="absolute left-0 top-0 max-w-[992px]" height={canvasSize.height}
          width={canvasSize.width} ref={canvas_Ref_Arrowhead}
        />
        <canvas
          id="drill_Canvas_Temp"
          className="absolute left-0 top-0 max-w-[992px] max-h-[496px]"
          height={canvasSize.height}
          width={canvasSize.width}
          ref={canvas_Ref_Temp}
          onMouseDown={handleEvent}
          onTouchStart={handleEvent}
          onMouseMove={handleEvent}
          onTouchMove={handleEvent}
          onMouseUp={handleEvent}
          onTouchEnd={handleEvent}
          onMouseLeave={handleEvent}
          onTouchCancel={handleEvent}
          onClick={handleEvent} // Ensure touch events are also handled for click
        />

      </div>
      <ToolSelection onToolChange={onChangeTool} selectedTool={actionTracker.selectedTool} undo={onUndo} redo={onRedo} clear={onCanvasClear} />
    </main>
  );
}
