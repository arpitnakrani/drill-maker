import cn from "classnames";
interface TooltipProps {
    children: React.ReactElement;
    text: string;
    position?: 'bottom' | 'right';
}
const Tooltip: React.FC<TooltipProps> = ({ children, text, position = 'bottom' }) => {
    const tooltipBubbleClasses = cn(
        "absolute invisible bg-neutral-700 bg-opacity-100 text-white text-center text-sm px-3 p-1 rounded w-max transform -translate-y-1/2 top-2/4 z-10 ",
        "transition-opacity duration-300 opacity-0 group-hover:visible group-hover:opacity-100",
        {
            'top-full mt-6': position === 'bottom',
            'left-full ml-2': position === 'right',
        }
    );

    const tooltipArrowClasses = cn({
        'absolute w-0 h-0 border-transparent border-8 border-x-5  border-b-neutral-700 transform translate-x-1/2 -translate-y-0 -top-4': position === 'bottom',
        'absolute block w-0 -left-3.5 top-2/4 border-solid border-8 border-r-neutral-700 border-transparent  transform translate-x-0 -translate-y-1/2': position === 'right',
    });

    const arrowStyle = position === 'bottom' ?
        { bottom: '-5px', left: '50%', transform: 'translateX(-50%)' } :
        { top: '50%', right: '-5px', transform: 'translateY(-50%)' };

    return (
        <div className="group relative flex justify-center">
            {children}
            <div className={tooltipBubbleClasses} >
                {text}
                <div className={tooltipArrowClasses} style={arrowStyle}></div>
            </div>
        </div>
    );
}

export default Tooltip;