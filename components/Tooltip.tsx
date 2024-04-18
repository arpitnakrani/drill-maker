// Tooltip.js
import cn from "classnames";

const Tooltip = ({ children, text, position = 'bottom' }: {
    children: React.ReactElement,
    text: string;
    position?: 'bottom' | 'right';
}) => {
    const tooltipBubbleClasses = cn(
        "absolute invisible bg-black bg-opacity-90 text-white text-center text-sm leading-6 p-2 rounded",
        "transition-opacity duration-300 opacity-0 group-hover:visible group-hover:opacity-100",
        {
            'left-1/2 transform -translate-x-1/2 -mb-2 -bottom-full': position === 'bottom',
            'left-full ml-2': position === 'right',
        }
    );

    const tooltipArrowClasses = cn({
        'absolute w-0 h-0 border-x-transparent border-x-5 border-t-[#000] border-t-opacity-90': position === 'bottom',
    });

    return (
        <div className="group relative flex justify-center">
            {children}
            <div className={tooltipBubbleClasses}>
                {text}
                <div className={tooltipArrowClasses} style={{ bottom: '-5px', left: '50%', transform: 'translateX(-50%)' }}></div>
            </div>
        </div>
    );
}

export default Tooltip;