import article from "@/api/article"
import NavBar from "@/components/NavBar"
import { toaster } from "@/components/ui/toaster"
import { Article, AxiosErrorType, Ingredients } from "@/utils/types/types"
import { Box, Grid, GridItem, Heading, HStack, Stack, VStack, Text, Image, Button, RatingGroup, Dialog, CloseButton, Skeleton, SkeletonCircle, SkeletonText, IconButton, } from "@chakra-ui/react"
import { ChangeEvent, useEffect, useState } from "react"
import { useParams } from "react-router"
import parser from "html-react-parser"
import CommentTextField from "@/components/CommentTextField"
import { capitalize } from "@/utils/helpingFunc/capitalize"
import { MdAddComment } from "react-icons/md";
import { useIsAuthStore } from "@/utils/store/useIsAuthStore"
import { FaRegStarHalfStroke } from "react-icons/fa6";
import ShowComment from "@/components/ShowComment"

const ArticleView = () => {
    const { id } = useParams()
    const [showArticle, setShowArticle] = useState<Article | null>(null)
    const [showCommentAction, setShowCommentAction] = useState<boolean>(false)
    const { isAuth } = useIsAuthStore()

    useEffect(()=>{
        article.get(`/article/meta/${id}`)
            .then(response=> {
                const data = response.data as Article;    
                setShowArticle(data)
            })
            .catch((err: AxiosErrorType)=> {
                toaster.create({
                    title: "Une erreur est survenue.",
                    description: err.response?.data?.message,
                    type: "error",
                })
            })
    }, [])

    function handleRating(value: string){
        article.patch(`/article/rate/`, {userId: isAuth?.id, id: id, rate: value}, {
            withCredentials: true
        })
        .then(response=> {
            const data = response.data 
            if(data) {
                toaster.create({
                    title: "Opération réussi.",
                    description: "Votre vote a été pris en compte",
                    type: "success",
                }) 
            }
        })
        .catch((err: AxiosErrorType)=> {
            toaster.create({
                title: "Une erreur est survenue.",
                description: err.response?.data?.message,
                type: "error",
            })
        })
    }
    
    return (
        <Box 
            backgroundColor="#292929" 
            minH={'100vh'} 
            w={'100vw'} 
            padding={{
                base: '2%',
                xxl: '7%'
            }} 
        >
            <Grid
                minH={'100vh'}
                templateColumns={{
                    base: '1fr',
                    xl: '1fr 0.5fr 5fr',
                    xxl: '0.5fr 0.5fr 2fr'
                }}
                templateRows={{
                    base: '90px auto',
                    lg: 'auto',
                }}
            >
                <GridItem colSpan={1} minW={"200px"}>
                    <Stack pos={'sticky'} top={'0vh'}>
                        <NavBar/>
                        <HStack align={'start'}>
                            <RatingGroup.Root   allowHalf readOnly count={5} value={showArticle?.averageRate ? (showArticle.averageRate / 2)  : 0} colorPalette={'orange'} size="md">
                                <RatingGroup.HiddenInput />
                                <RatingGroup.Control />
                            </RatingGroup.Root>  
                            {`(${showArticle?.meta.voted?.length})`}
                        </HStack>
                        {isAuth?.id &&
                            <>
                                <Dialog.Root>
                                    <Dialog.Trigger asChild>
                                        <Button
                                            variant={'ghost'}
                                            border={'2px solid orange'}
                                            size={'sm'}
                                        >
                                            <FaRegStarHalfStroke />
                                            {showArticle?.averageRate ? "Modifier votre note": "Noter la recette"}
                                        </Button>
                                    </Dialog.Trigger>
                                    <Dialog.Backdrop />
                                    <Dialog.Positioner>
                                        <Dialog.Content bg={'#404040'}>
                                        <Dialog.CloseTrigger asChild>
                                            <CloseButton size={'sm'}/>
                                        </Dialog.CloseTrigger>
                                        <Dialog.Header>
                                            <Dialog.Title>Votre avis compte !</Dialog.Title>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            <RatingGroup.Root allowHalf count={5} defaultValue={showArticle?.averageRate ?  (showArticle.averageRate / 2) : 2.5} size="md" colorPalette={'orange'} onChange={(e: ChangeEvent<HTMLInputElement>)=>{handleRating(e.target.value)}}>
                                                <RatingGroup.HiddenInput/>
                                                <RatingGroup.Control />
                                            </RatingGroup.Root> 
                                        </Dialog.Body>
                                        </Dialog.Content>
                                    </Dialog.Positioner>
                                    </Dialog.Root>
                            </>
                            
                        }
                    </Stack>  
                </GridItem>

                <GridItem colSpan={1}></GridItem>
                
                <GridItem colSpan={1} minH={'100%'} minW={'90%'} maxW={'90%'} display={'flex'} flexDirection={'column'} gap={'1em'}>
                    {!id || !showArticle ? 
                        (
                            <Stack minW={'full'}>
                                <Skeleton 
                                    h={'xl'} variant={'shine'}
                                    css={{
                                        "--start-color": "colors.gray.500",
                                        "--end-color": "colors.gray.600",
                                    }}
                                />
                                <HStack width="full" mt={5}>
                                    <SkeletonCircle 
                                        size="10" 
                                        variant={'shine'}  
                                        css={{
                                            "--start-color": "colors.gray.500",
                                            "--end-color": "colors.gray.600",
                                        }}
                                    />
                                    <SkeletonText 
                                        noOfLines={3} 
                                        variant={'shine'} 
                                        css={{
                                            "--start-color": "colors.gray.500",
                                            "--end-color": "colors.gray.600",
                                        }} 
                                    />
                                </HStack>
                            </Stack>
                        ) : 
                        (
                            <>
                            <VStack w={'100%'} border={'1px solid white'} borderRadius={5} p={7}>
                                <HStack justify={'space-between'} w={'100%'}>
                                    <Stack>
                                        <Heading size={'4xl'} fontWeight={400}>
                                            {showArticle?.title}
                                        </Heading> 
                                        <Text fontStyle={'oblique'}>Temps de préparation {showArticle?.time} min</Text>
                                    </Stack>
                                    <Stack>
                                        <Text> Recette pour {showArticle?.nombre_personne} {`personne(s)`}</Text>
                                        <Text textAlign={'right'}>{showArticle?.price}</Text>
                                    </Stack>
                                </HStack>
                                <Stack w={'100%'} mt={4}>
                                    <Heading 
                                        size={'lg'} 
                                        fontStyle={'oblique'} 
                                        fontWeight={350} 
                                        textAlign={'left'}
                                    >
                                        {showArticle?.description}
                                    </Heading>
                                    <Image
                                        src={`http://localhost:3000/${showArticle?.media?.path}`}
                                        objectFit={'cover'}
                                        height={'450px'}
                                    />
                                    <Heading size={'xl'} fontWeight={500} textAlign={'left'}>Ingrédients</Heading>
                                    {showArticle?.ingredients.map((item: Ingredients, index: number) => (
                                        <Text key={`${index}-${item?.ingredient}`}>
                                            • {item.quantite} {item.unit} - {item?.ingredient}     
                                        </Text>
                                    ))}
                                    <Text 
                                        fontSize={'lg'} 
                                        fontWeight={500} 
                                        textAlign={'left'}
                                    >
                                        {showArticle?.article && parser(showArticle.article)}
                                    </Text>
                                    <Text 
                                        fontSize={'xs'} 
                                        fontWeight={300} 
                                        fontStyle={'oblique'} 
                                        textAlign={'left'}
                                    >
                                        ー Publié par {showArticle?.userId?.[0]?.firstname ? capitalize(showArticle?.userId[0].firstname) : showArticle?.userId?.[0]?.firstname} le {showArticle?.created_at ? new Date(showArticle?.created_at).toLocaleString() : 'unknow'} | 
                                        Dernière mis à jour le {showArticle?.updated_at ? new Date(showArticle.updated_at).toLocaleString() : 'unknow'}  
                                    </Text>
                                </Stack>    
                            </VStack>
                            {isAuth?.id &&
                                (
                                    <>
                                        <IconButton
                                            variant={'ghost'}
                                            border={'2px solid orange'}
                                            alignSelf={'end'}
                                            onClick={()=>setShowCommentAction((prev:boolean)=> !prev)}
                                            p={2}
                                        >
                                            <MdAddComment />
                                            Ajouter un commentaire
                                        </IconButton>
                                        { 
                                            showCommentAction && 
                                            <CommentTextField user={showArticle?.userId?.[0]?.firstname ? capitalize(showArticle?.userId[0].firstname) : showArticle?.userId?.[0]?.firstname} clientId={isAuth?.id} articleId={showArticle?._id}/>  
                                        }
                                    </>
    
                                )
                            }
                            
                            <ShowComment articleId={id} authorId={showArticle.user_id}/>
                            
                            </>
                        )
                    }
                </GridItem>
            </Grid>
        </Box>
    )
}
export default ArticleView;