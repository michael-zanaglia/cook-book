import { Image } from '@chakra-ui/react';
import svgLoading from '@/assets/bouncing-circles.svg';

interface LoadingSVGProps {
  sx?: React.CSSProperties;
  h: string;
}

const LoadingSVG: React.FC<LoadingSVGProps> = ({ sx, h }) => {
    
  return <Image src={svgLoading} alt="SVG" height={h} fit={'contain'} style={sx}/>
}

export default LoadingSVG;