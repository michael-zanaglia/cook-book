import { ReactElement } from "react";
import { Tooltip } from "./ui/tooltip"

interface TooltipProps {
    content: string|number|undefined;
    children: ReactElement;
    position?: any;
}

const ToolTip: React.FC<TooltipProps> = ({content, children, position=undefined}) => (
    <Tooltip showArrow positioning={{ placement : position}} content={content} contentProps={{ css: { padding: "3"} }}  openDelay={300} closeDelay={100}>
        {children}
    </Tooltip>         
)
//"--tooltip-bg": "#101010", "color": "white", 
export default ToolTip