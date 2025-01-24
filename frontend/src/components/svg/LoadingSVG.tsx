import { Image } from '@chakra-ui/react';
import svgLoading from '../../../public/bouncing-circles.svg';

interface LoadingSVGProps {
  sx: React.CSSProperties;
}

const LoadingSVG: React.FC<LoadingSVGProps> = ({ sx }) => {
    
  return <Image src={svgLoading} alt="SVG" height={"50px"} fit={'contain'} style={sx}/>
}

export default LoadingSVG;