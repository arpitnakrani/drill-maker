import { IDrillCurve } from "@/data/drill-curves";
import Image from "next/image";
import styles from './tool-selection.module.css';
import cn from "classnames";
import { toolsConfig } from "@/data/toolsConfig";
import { IDrillImage } from "@/data/drill-images";
import { useState } from "react";
import Tooltip from "../Tooltip";
import { colors } from "@/data/drill-colors";
import Brush from "../Brush";
import { drillDelete } from "@/data/drill-actions";
import { DrillActions } from "@/types/drill-actions";

interface ToolSelectionProps {
    activeColor: string
    selectedTool: IDrillCurve | IDrillImage;
    onToolChange: (tool: IDrillCurve | IDrillImage) => void;
    onChangeColor: (color: string) => void;
    undo: () => void;
    redo: () => void;
    clear: () => void
}

const ToolSelection = ({ onToolChange, selectedTool, activeColor = 'black', redo, undo, clear, onChangeColor }: ToolSelectionProps) => {
    const [availableTools, setAvailableTools] = useState(toolsConfig);

    return (
        <section className="flex gap-1 mt-4 justify-center flex-wrap w-full">
            {Object.entries(availableTools).map(([toolCategory, toolList]) => {
                const isSelected = toolList?.some(tool => tool.imagePath === selectedTool.imagePath);
                const toolImageSrc = isSelected ? selectedTool.imagePath : (toolList?.find(tool => tool.active)?.imagePath || '');
                const ActiveToolLabel = (toolList?.find(tool => tool.active)?.label || '');
                return (
                    <div key={toolCategory} className={cn("cursor-pointer text-black w-11 h-11 border-none outline-none m-0 text-3xl flex items-center justify-center relative hover:bg-gray-300", styles.open_On_Hover, isSelected ? 'bg-gray-200' : '')}>
                        <Tooltip text={ActiveToolLabel} position="right">
                            <Image className="p-2 w-11 h-11 " src={toolImageSrc} alt={toolList && toolList[0].imagePath} height={40} width={40} />
                        </Tooltip>
                        <div className={cn("absolute bottom-full left-0 flex-col-reverse z-0 border-b border-gray-400 hidden ", styles.target_To_Open)}>
                            {toolList?.map((tool, index) => (
                                <Tooltip key={tool.label} text={tool.label} position="right">
                                    <div className="cursor-pointer hover:bg-gray-300 bg-gray-200 text-black p-2 border-none outline-none m-0 text-3xl w-11 h-11 flex items-center justify-center" onClick={() => {
                                        onToolChange(tool);
                                        setAvailableTools(prevTools => ({
                                            ...prevTools,
                                            [toolCategory]: prevTools[toolCategory].map(t => ({ ...t, active: t.imagePath === tool.imagePath }))
                                        }));
                                    }}>
                                        <Image src={tool.imagePath} alt={tool.imagePath} height={40} width={40} />
                                    </div>
                                </Tooltip>
                            ))}
                        </div>
                    </div>
                );
            })}
            {/* actions */}
            {
                <div key='color selection' className={cn("cursor-pointer text-black  border-none outline-none m-0 text-3xl w-11 h-11 flex items-center justify-center relative hover:bg-gray-300", styles.open_On_Hover)}>
                    <Tooltip text={'Change color'} position="right">
                        <div className="w-11 h-11 p-2">
                            <Brush color={activeColor} />
                        </div>
                    </Tooltip>

                    <div className={cn("absolute bottom-full left-0 flex-col-reverse z-0 border-b border-gray-400 hidden ", styles.target_To_Open)}>
                        {colors.map((color, index) => (
                            <Tooltip key={color.label} text={color.label} position="right">
                                <div className={cn("cursor-pointer    text-black p-2 border-none outline-none m-0 text-3xl w-11 h-11 flex items-center justify-center")} style={{ backgroundColor: `${color.colorCode}` }} onClick={() => {
                                    onChangeColor(color.colorCode)
                                }}>
                                </div>
                            </Tooltip>
                        ))}
                    </div>

                </div>
            }
            <div key='undo' className={cn("cursor-pointer text-black  border-none outline-none m-0 text-3xl w-11 h-11 flex items-center justify-center relative hover:bg-gray-300", styles.open_On_Hover)} onClick={undo}>
                <Tooltip text={'Undo'} position="right">
                    <Image className="p-2 w-11 h-11 " src='svgs/drill-action-svgs/undo.svg' alt='undo' height={40} width={40} />
                </Tooltip>
            </div>
            <div key='redo' className={cn("cursor-pointer text-black  border-none outline-none m-0 text-3xl w-11 h-11 flex items-center justify-center relative hover:bg-gray-300", styles.open_On_Hover)} onClick={redo}>
                <Tooltip text={'Redo'} position="right">
                    <Image className="p-2 w-11 h-11 " src='svgs/drill-action-svgs/redo.svg' alt='redo' height={40} width={40} />
                </Tooltip>
            </div>
            <div key='delete' className={cn("cursor-pointer text-black  border-none outline-none m-0 text-3xl w-11 h-11 flex items-center justify-center relative hover:bg-gray-300", styles.open_On_Hover, selectedTool.actionType === DrillActions.delete ? 'bg-gray-200' : '')} onClick={() => onToolChange(drillDelete)}>
                <Tooltip text={'Erase'} position="right">
                    <Image className="p-2 w-11 h-11" src='svgs/drill-action-svgs/delete.svg' alt='delete' height={40} width={40} />
                </Tooltip>
            </div>
        </section>
    );
};

export default ToolSelection;