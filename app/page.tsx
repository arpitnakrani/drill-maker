'use client'

import Tooltip from '@/components/Tooltip';
import ToolSelection from '@/components/tool-selection';
import { drillMaps } from '@/data/drill-map';
import useCanvas from '@/data/hooks/useCanvas';
import { DrillActions } from '@/types/drill-actions';
import Image from 'next/image';
import React, { MouseEvent, TouchEvent, useEffect } from 'react';

type MouseOrTouchEvent = MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>;
export default function Home() {
  const {
    canvasRefMain,
    canvasRefTemp,
    canvasRefArrowhead,
    canvasSize,
    mouseDown,
    mouseMove,
    mouseUp,
    mouseClick,
    onUndo,
    onRedo,
    onCanvasClear,
    getCoordinates,
    onChangeColor,
    onChangeTool,
    actionTracker,
    handleMapClick,
    isEraserSelected,
    selectEraser,
  } = useCanvas();


  const handleEvent = (event: MouseOrTouchEvent) => {
    const { clientX, clientY } = getCoordinates(event);
    if (!canvasRefTemp.current || !clientX && !clientY) return;

    if (event.type === 'mousedown' || event.type === 'touchstart') {
      mouseDown(event);
    }

    if (event.type === 'mousemove' || event.type === 'touchmove') {
      mouseMove(event);
    }

    if (event.type === 'mouseup' || event.type === 'mouseleave' || event.type === 'touchend' || event.type === 'touchcancel') {
      mouseUp(event);
    }

    if (event.type === 'click' || event.type === 'touchstart') {
      mouseClick(event);
    }
  };

  useEffect(() => {
    const canvasWrapper = document.getElementById('canvas_Wrapper');
    if (canvasWrapper && actionTracker?.selectedTool?.actionType === DrillActions.draw) {
      canvasWrapper.style.cursor = `url(${actionTracker.selectedTool.imagePath}) 0 0, auto`;
    }
    return () => {
      // Optionally reset the cursor to default when the component unmounts or the effect cleanup runs
      if (canvasWrapper) {
        canvasWrapper.style.cursor = '';
      }
    }
  }, [actionTracker]);

  return (
    <main className="max-w-[992px] mx-auto px-4 lg:px-0">
      <div className="flex justify-center items-center gap-1 md:gap-4 flex-wrap my-4">
        {
          drillMaps.map((map, index) => <Tooltip text={map.label} key={index}>
            <div className="group bg-gray-100 p-2 rounded-md h-20 w-20 m-auto cursor-pointer" onClick={() => handleMapClick(map.svgImagePath)}>
              <Image src={map.svgImagePath} height={50} width={80} alt="full-rink" className="h-full m-auto" />
            </div>
          </Tooltip>
          )
        }
      </div >
      <div className="relative w-full" id="canvas_Wrapper">
        <canvas
          id="drill_Canvas"
          height={canvasSize.height}
          width={canvasSize.width}
          className=" border-black"
          ref={canvasRefMain}
          style={{ backgroundImage: `url(${actionTracker.selectedMap})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
        />
        <canvas id="drill_Canvas_Arrowhead" className="absolute left-0 top-0" height={canvasSize.height} width={canvasSize.width} ref={canvasRefArrowhead} />
        <canvas
          id="drill_Canvas_Temp"
          className="absolute left-0 top-0"
          height={canvasSize.height}
          width={canvasSize.width}
          ref={canvasRefTemp}
          onMouseDown={handleEvent}
          onTouchStart={handleEvent}
          onMouseMove={handleEvent}
          onTouchMove={handleEvent}
          onMouseUp={handleEvent}
          onTouchEnd={mouseUp}
          onMouseLeave={handleEvent}
          onTouchCancel={handleEvent}
          onClick={handleEvent}
        />
      </div>
      <ToolSelection
        onToolChange={onChangeTool}
        selectedTool={actionTracker.selectedTool}
        activeColor={actionTracker.selectedColor}
        undo={onUndo}
        redo={onRedo}
        clear={onCanvasClear}
        onChangeColor={onChangeColor}
        handleEraserSelection={selectEraser}
        isEraserSelected={isEraserSelected}
      />
    </main >
  );
}
