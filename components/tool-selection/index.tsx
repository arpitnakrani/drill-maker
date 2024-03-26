import { IDrillCurve } from "@/data/drill-curves";
import Image from "next/image";
import styles from './tool-selection.module.css';
import cn from "classnames";
import { toolsConfig } from "@/data/toolsConfig";
import { IDrillImage } from "@/data/drill-images";
import { useState } from "react";
import Tooltip from "../Tooltip";

interface ToolSelectionProps {
    onToolChange: (tool: IDrillCurve | IDrillImage) => void;
    selectedTool: IDrillCurve | IDrillImage;
}

const ToolSelection = ({ onToolChange, selectedTool }: ToolSelectionProps) => {
    const [availableTools, setAvailableTools] = useState(toolsConfig);

    return (
        <section className="flex gap-2 mt-4">
            {Object.entries(availableTools).map(([toolCategory, toolList]) => {
                const isSelected = toolList.some(tool => tool.imagePath === selectedTool.imagePath);
                const toolImageSrc = isSelected ? selectedTool.imagePath : (toolList.find(tool => tool.active)?.imagePath || '');

                return (
                    <div key={toolCategory} className={cn("cursor-pointer text-black p-2 border-none outline-none m-0 text-3xl w-11 h-11 flex items-center justify-center relative hover:bg-gray-300", styles.open_On_Hover, isSelected ? 'bg-gray-200' : '')}>
                        <Image src={toolImageSrc} alt={toolList[0].imagePath} height={50} width={50} />
                        <div className={cn("absolute bottom-full left-0 flex-col-reverse z-0 border-b border-gray-400 hidden ", styles.target_To_Open)}>
                            {toolList.map((tool, index) => (
                                <Tooltip key={tool.label} text={tool.label} position="right">
                                    <div className="cursor-pointer hover:bg-gray-300 bg-gray-200 text-black p-2 border-none outline-none m-0 text-3xl w-11 h-11 flex items-center justify-center" onClick={() => {
                                        onToolChange(tool);
                                        setAvailableTools(prevTools => ({
                                            ...prevTools,
                                            [toolCategory]: prevTools[toolCategory].map(t => ({ ...t, active: t.imagePath === tool.imagePath }))
                                        }));
                                    }}>
                                        <Image src={tool.imagePath} alt={tool.imagePath} height={50} width={50} />
                                    </div>
                                </Tooltip>
                            ))}
                        </div>
                    </div>
                );
            })}
            {/* actions */}
            <div key='undo' className={cn("cursor-pointer text-black p-2 border-none outline-none m-0 text-3xl w-11 h-11 flex items-center justify-center relative hover:bg-gray-300", styles.open_On_Hover)}>
                <Image src='svgs/drill-action-svgs/undo.svg' alt='undo' height={50} width={50} />
            </div>
            <div key='redo' className={cn("cursor-pointer text-black p-2 border-none outline-none m-0 text-3xl w-11 h-11 flex items-center justify-center relative hover:bg-gray-300", styles.open_On_Hover)}>
                <Image src='svgs/drill-action-svgs/redo.svg' alt='redo' height={50} width={50} />
            </div>
            <div key='delete' className={cn("cursor-pointer text-black p-2 border-none outline-none m-0 text-3xl w-11 h-11 flex items-center justify-center relative hover:bg-gray-300", styles.open_On_Hover)}>
                <Image src='svgs/drill-action-svgs/delete.svg' alt='delete' height={50} width={50} />
            </div>
        </section>
    );
};

export default ToolSelection;