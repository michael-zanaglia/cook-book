import { Center, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { InView } from "react-intersection-observer";
import CardImage from "./CardImage";
import { Article } from "@/utils/types/types";

interface ReceipeCardsProps {
    articles?: Article[] | null ;
}

const RecipeCards: React.FC<ReceipeCardsProps> = ({ articles }) => {

    const columns = useBreakpointValue({ base: 1, md: 4, lg: 4, xlg: 3, sxxl: 4 });
    const translateEven = useBreakpointValue({ base: "translateY(0)", md: "translateY(1em)" });
    const translateOdd = useBreakpointValue({ base: "translateY(0)", md: "translateY(-1.5em)" });

    return (
        <Grid
            templateColumns={{ 
                base: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)',
                sxxl:'repeat(4, 1fr)',
                xlg: 'repeat(3,1fr)',
            }}
            marginBottom={"15px"}
        >
            { articles && articles.map((article, index)=>{
                return( 

                <InView triggerOnce key={`${index}-card-${article._id}`} >    
                    {({ inView, ref }) => (
                        <Center ref={ref} >
                            <GridItem p={2} >
                                <CardImage 
                                    id={article._id}
                                    src={`http://localhost:3000/${article?.media?.path}`} 
                                    alt={"image-post"} 
                                    description={article.description} 
                                    title={article.title}
                                    time={article.time}
                                    createdAt={article.created_at}
                                    tagsList={article.TagsName}
                                    sx={{  
                                        transform: inView && columns ? index % columns % 2 === 0 ? translateEven : translateOdd  : index % 2 === 0 ? "translateY(0em)" : "translateY(1em)",
                                        opacity: inView ? 1 : 0,
                                        filter: inView ? "blur(0)" : "blur(3px)",
                                        transitionProperty: "transform, opacity, filter",
                                        transitionDuration: "0.5s",
                                        transitionTimingFunction: "ease-out",
                                        transitionDelay: index % 2 !== 0 && inView ? "100ms" : "0s",
                                    }}
                                />  
                            </GridItem>
                        </Center>
                    )}
                </InView>
               ) 
            })}
        </Grid>   
    )
}

export default RecipeCards;