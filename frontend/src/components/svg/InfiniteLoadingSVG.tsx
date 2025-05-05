import { Image } from '@chakra-ui/react';
import infiniteSVG from '@/assets/infinite-spinner.svg';

interface LoadingSVGProps {
  sx?: React.CSSProperties;
  h: string;
}

const InfiniteLoadingSVG: React.FC<LoadingSVGProps> = ({ sx, h }) => {
    
  return <Image src={infiniteSVG} alt="SVG" height={h} fit={'contain'} style={sx}/>
}

export default InfiniteLoadingSVG;