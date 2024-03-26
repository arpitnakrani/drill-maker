import cn from "classnames";

// Tooltip.js
const Tooltip = ({ children, text, position = 'bottom' }: {
    children: React.ReactElement,
    text: string;
    position?: 'bottom' | 'right';
}) => {
    return (
        <div className="group relative flex justify-center">
            {children}
            {/* <div className={cn("absolute  scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-50", position === 'right' ? 'left-14' : '-bottom-10')}> {text}</div> */}
        </div>
    );
}

export default Tooltip