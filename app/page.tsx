'use client'
import Tooltip from "@/components/Tooltip";
import ToolSelection from "@/components/tool-selection";
import { FreeHandSkate, FreeHandSkateWithPuck, FreeHandSkateWithPuckAndStop, FreeHandSkateWithStop, FreehandLateralSkating, FreehandLateralSkatingToStop, FreehandSkateBackwardWithPuck, FreehandSkateBackwardWithPuckAndStop, FreehandSkateBackwardWithoutPuck, FreehandSkateBackwardWithoutPuckAndStop, IDrillCurve, Pass, Shot, StraightSkate, StraightSkateWithStop } from "@/data/drill-curves";
import { IDrillImage } from "@/data/drill-images";
import { drillMaps } from "@/data/drill-map";
import { toolsConfig } from "@/data/toolsConfig";
import { CurveTypes, DrillActions } from "@/types/drill-actions";
import Image from "next/image";
import { useRef, useState } from "react";

let currentShape: FreeHandSkateWithStop | FreeHandSkateWithPuck | StraightSkate | StraightSkateWithStop | FreeHandSkate | null = null;
export default function Home() {
  const [canvasStates, setCanvasStates] = useState<string[]>([]);
  const [redoStates, setRedoStates] = useState<string[]>([]);
  const [actionTracker, setActionTracker] = useState<{ selectedMap: string, selectedTool: IDrillCurve | IDrillImage }>({
    selectedMap: drillMaps[0].svgImagePath,
    selectedTool: toolsConfig['skate'][0]
  })
  const canvas_Ref_Main = useRef<HTMLCanvasElement | null>(null)
  const canvas_Ref_Temp = useRef<HTMLCanvasElement | null>(null)

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
  const mouseDown: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (canvas_Ref_Temp.current && actionTracker.selectedTool.actionType === DrillActions.curve) {
      const rect = canvas_Ref_Temp.current.getBoundingClientRect();
      if (actionTracker.selectedTool.actionType === DrillActions.curve) {
        if ('curveType' in actionTracker.selectedTool) {
          switch (actionTracker.selectedTool.curveType) {
            case CurveTypes.freeHandSkate:
              currentShape = new FreeHandSkate(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.freeHandSkateWithStop:
              currentShape = new FreeHandSkateWithStop(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.straightSkate:
              currentShape = new StraightSkate(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.straightSkateWithStop:
              currentShape = new StraightSkateWithStop(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.freeHandSkateWithPuck:
              currentShape = new FreeHandSkateWithPuck(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.freeHandSkateWithPuckAndStop:
              currentShape = new FreeHandSkateWithPuckAndStop(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.freehandSkateBackwardWithPuckAndStop:
              currentShape = new FreehandSkateBackwardWithPuckAndStop(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.freehandSkateBackwardWithoutPuck:
              currentShape = new FreehandSkateBackwardWithPuck(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.freehandSkateBackwardWithoutPuckAndStop:
              currentShape = new FreehandSkateBackwardWithoutPuckAndStop(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.freehandSkateBackwardWithoutPuck:
              currentShape = new FreehandSkateBackwardWithoutPuck(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.straightPass:
              currentShape = new Pass(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.straightShot:
              currentShape = new Shot(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.freehandLateralSkating:
              currentShape = new FreehandLateralSkating(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            case CurveTypes.freehandLateralSkatingToStop:
              currentShape = new FreehandLateralSkatingToStop(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
              break;
            default:
              break;
          }
        }
      }

    }
  }

  const mouseMove: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (currentShape && canvas_Ref_Temp.current) {
      const rect = canvas_Ref_Temp.current.getBoundingClientRect();
      currentShape.draw(event.clientX - rect.left, event.clientY - rect.top)
    }
  };

  const mouseUp: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (currentShape && canvas_Ref_Main.current && canvas_Ref_Temp.current) {
      const mainCtx = canvas_Ref_Main.current.getContext('2d')
      const tempCtx = canvas_Ref_Temp.current.getContext('2d')
      currentShape.stopDrawing()

      if (mainCtx && tempCtx) {
        mainCtx.drawImage(canvas_Ref_Temp.current, 0, 0);
        tempCtx.clearRect(0, 0, canvas_Ref_Main.current.width, canvas_Ref_Main.current.height);
      }
    }
    captureCanvasState()
  }

  const mouseLeave: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    console.log(event, 'event-down')
  }

  const mouseClick: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (!(actionTracker.selectedTool.actionType === DrillActions.draw || (actionTracker.selectedTool.actionType === DrillActions.text))) return;

    if (actionTracker.selectedTool.actionType === DrillActions.draw) {

      const mainCtx = canvas_Ref_Main.current?.getContext('2d');
      const tempCtx = canvas_Ref_Temp.current?.getContext('2d');
      if (!canvas_Ref_Temp.current || !mainCtx || !tempCtx) return; // Guard against null values

      const img = document.createElement('img');
      const rect = canvas_Ref_Temp.current.getBoundingClientRect();
      img.src = actionTracker.selectedTool.imagePath;
      img.onload = () => {
        tempCtx.drawImage(img, event.clientX - rect.left, event.clientY - rect.top, 30, 30);
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
      tempCtx.font = "18px serif";
      tempCtx.fillText(userInput, event.clientX - rect.left, event.clientY - rect.top)
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
      <div className="relative w-full">
        <canvas id="drill_Canvas" className="border-black mt-4 w-full h-auto" style={{ maxHeight: '496px', maxWidth: '992px', backgroundImage: `url(${actionTracker.selectedMap})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} ref={canvas_Ref_Main} />
        <canvas id="drill_Canvas_Temp" className="absolute left-0 top-0 w-full h-auto" style={{ maxHeight: '496px', maxWidth: '992px' }} ref={canvas_Ref_Temp}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseUp={mouseUp}
          onMouseLeave={mouseLeave}
          onClick={mouseClick}
        />
      </div>
      <ToolSelection onToolChange={onChangeTool} selectedTool={actionTracker.selectedTool} undo={onUndo} redo={onRedo} clear={onCanvasClear} />
    </main>
  );
}
