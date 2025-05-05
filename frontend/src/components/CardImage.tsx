import { tags } from "@/utils/tags/tag";
import { tagMapping } from "@/utils/tags/tagMapping";
import { Badge, Button, Card, HStack, Image, Stack } from "@chakra-ui/react"
import { LuFileClock } from "react-icons/lu";
import { RiTimerLine } from "react-icons/ri";
import { useNavigate } from "react-router";



interface CardImageProps {
    id?: string;
    src?: string;
    alt?: string;
    description?: string;
    title?: string;
    time?: number;
    tagsList?: string[];
    createdAt: Date;
    sx?: React.CSSProperties;
}

const CardImage: React.FC<CardImageProps> = ({id, src, alt, description, title, time, tagsList, createdAt, sx}) => {
    const create = new Date(createdAt).toLocaleDateString("FR-fr") 
    const navigate = useNavigate()
  return (
    <Card.Root minW={"300px"} overflow="hidden" backgroundColor={'#F5F5F5'} style={sx}>
        <Image
            src={src}
            alt={alt}
            h={'200px'}
            objectFit={"cover"}
        />
        <Card.Body gap="2" >
            <Stack direction='row' wrap={"wrap"}>
                {
                    tagsList?.map((tag, index)=>(
                        <Badge key={index}>{tags(tag)}{tagMapping(tag)}</Badge>   
                    ))
                }
            </Stack>
            
            <Card.Title color={'#292929'}>{title}</Card.Title>
            <Card.Description >
                {description}
            </Card.Description>
        </Card.Body>
        <Card.Footer gap="2">
            <Button variant="solid" bg={{base:'orange', _hover:'orange.700'}} onClick={()=>{navigate(`/article/${id}`)}}>Voir plus</Button>
        </Card.Footer>
        <Card.Description display={"flex"} justifyContent={'space-between'} p={2} fontSize={'12px'} as={'div'}>
            <HStack alignItems='center' gap={0.5}>
                <RiTimerLine />
                <span>{time} min</span> 
            </HStack>
            <HStack alignItems='center' gap={0.5}>
                <LuFileClock />
                <span>{create}</span> 
            </HStack>
        </Card.Description>
    </Card.Root>
  )
}

export default CardImage;
