'use client'
import Tooltip from "@/components/Tooltip";
import ToolSelection from "@/components/tool-selection";
import { IDrillCurve, StraightArrow } from "@/data/drill-curves";
import { IDrillImage } from "@/data/drill-images";
import { drillMaps } from "@/data/drill-map";
import { toolsConfig } from "@/data/toolsConfig";
import { DrillActions } from "@/types/drill-actions";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

let currentShape: StraightArrow | null = null;
export default function Home() {
  const [actonTracker, setActonTracker] = useState<{ selectedMap: string, selectedTool: IDrillCurve | IDrillImage }>({
    selectedMap: drillMaps[0].svgImagePath,
    selectedTool: toolsConfig['skate'][0]
  })
  const [selectedMapPath, setSelectedMapPath] = useState(drillMaps[0].svgImagePath);
  const canvas_Ref_Main = useRef<HTMLCanvasElement | null>(null)
  const canvas_Ref_Temp = useRef<HTMLCanvasElement | null>(null)
  const isDrawing = useRef<boolean>(false)

  const onChangeTool = (tool: IDrillCurve | IDrillImage) => {
    setActonTracker((prevAction) => ({ ...prevAction, selectedTool: tool }))
  }

  const startingPoints = useRef<{ x: number, y: number }>({
    x: 0,
    y: 0
  })
  // useEffect(() => {
  //   if (canvas_Ref_Main.current) {
  //     const canvas_Ctx = canvas_Ref_Main.current.getContext('2d')
  //     const img = document.createElement('img');
  //     img.src = selectedMapPath;
  //     img.onload = function () {
  //       canvas_Ctx?.drawImage(img, 0, 0);
  //     }
  //     img.style.margin = 'auto'
  //   }
  // }, [selectedMapPath])

  const mouseDown: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (canvas_Ref_Temp.current) {
      const rect = canvas_Ref_Temp.current.getBoundingClientRect();
      console.log(rect, 'temp can')
      currentShape = new StraightArrow(event.clientX - rect.left, event.clientY - rect.top, canvas_Ref_Temp.current)
      currentShape.initiateDrawing()
    }
  }

  const mouseMove: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (currentShape && canvas_Ref_Temp.current) {
      const rect = canvas_Ref_Temp.current.getBoundingClientRect();
      currentShape.draw(event.clientX - rect.left, event.clientY - rect.top)
    }
  };

  const mouseUp: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    console.log(event, 'event-down')
    isDrawing.current = false;
    if (currentShape && canvas_Ref_Main.current && canvas_Ref_Temp.current) {
      const mainCtx = canvas_Ref_Main.current.getContext('2d')
      const tempCtx = canvas_Ref_Temp.current.getContext('2d')
      if (mainCtx && tempCtx) {
        mainCtx.drawImage(canvas_Ref_Temp.current, 0, 0);
        tempCtx.clearRect(0, 0, canvas_Ref_Main.current.width, canvas_Ref_Main.current.height);
      }
      currentShape.stopDrawing()
    }
  }

  const mouseLeave: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    console.log(event, 'event-down')
  }

  const mouseClick: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (actonTracker.selectedTool.actionType !== DrillActions.draw) return;

    const mainCtx = canvas_Ref_Main.current?.getContext('2d');
    const tempCtx = canvas_Ref_Temp.current?.getContext('2d');
    if (!canvas_Ref_Temp.current || !mainCtx || !tempCtx) return; // Guard against null values

    const img = document.createElement('img');
    img.src = actonTracker.selectedTool.imagePath;
    img.onload = () => {
      tempCtx.drawImage(img, event.clientX, event.clientY);
      if (canvas_Ref_Temp.current && canvas_Ref_Main.current) {
        mainCtx.drawImage(canvas_Ref_Temp.current, 0, 0); // Safe to use after the null check
        tempCtx.clearRect(0, 0, canvas_Ref_Main.current.width, canvas_Ref_Main.current.height);
      }
    };
  };
  return (
    <main className="max-w-[992px] mx-auto">
      <div className="flex justify-center items-center gap-4 flex-wrap mt-4">
        {
          drillMaps.map((map, index) => <Tooltip text={map.label} key={index}>
            <div className="group bg-gray-100 p-4 rounded-md h-24 w-24 m-auto cursor-pointer" onClick={() => setActonTracker((prevAction) => ({ ...prevAction, selectedMap: map.svgImagePath }))}>
              <Image src={map.svgImagePath} height={200} width={200} alt="full-rink" className="h-full m-auto" />
            </div>
          </Tooltip>
          )
        }
      </div>
      <div className="relative">
        <canvas id="drill_Canvas" height={496} width={992} className=" border-black mt-4" ref={canvas_Ref_Main} style={{ backgroundImage: `url(${actonTracker.selectedMap})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
        <canvas id="drill_Canvas_Temp" height={496} width={992} className=" absolute left-0 top-0" ref={canvas_Ref_Temp}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseUp={mouseUp}
          onMouseLeave={mouseLeave}
          onClick={mouseClick}
        />
      </div>
      <ToolSelection onToolChange={onChangeTool} selectedTool={actonTracker.selectedTool} />
    </main>
  );
}
