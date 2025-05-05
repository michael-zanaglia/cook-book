import comment from "@/api/comment"
import { useEffect, useState } from "react"
import { toaster } from "./ui/toaster"
import { AxiosErrorType, CommentData, CommentData2 } from "@/utils/types/types"
import { Stack, Text, VStack, Separator, Heading, Button, Accordion } from "@chakra-ui/react"
import TemplateComment from "./TemplateComment"
import { useCommentsStore } from "@/utils/store/useCommentsStore"

interface ShowCommentProps {
    articleId: string;
    authorId: string;
}

const ShowComment: React.FC<ShowCommentProps> = ({ articleId, authorId }) => {
    const [page, setPage] = useState<number>(1)
    //const [comments, setComments] = useState<CommentData[] | null>(null)
    const [commentValue, setCommentValue] = useState<{[key: string]: string}>({})
    //const [showReply, setShowReply] = useState<{[key: string]: boolean}>({})
    const [noMore, setNoMore] = useState<boolean>(false)
    const {comments, setComments} = useCommentsStore()
    //const { isAuth } = useIsAuthStore()

    useEffect(()=>{
        if(articleId){
            comment.get(`/article/${articleId}/comments?page=${page}`)  
            .then((response =>{
                if (response.data.length === 0 || response.data.length < 25) {
                    setNoMore(true)
                }
                if (response.data.length > 0) {
                    setComments((prev)  => {
                        const prevComments = prev || [];
                        const setArrayCommentIds = new Set(prevComments.map((comment: CommentData )=> comment.document._id));
                        const newComments = response.data.filter((newComment : CommentData) => !setArrayCommentIds.has(newComment.document._id));
                        
                        return ([...prevComments, ...newComments])
                    })
                }
            }))
            .catch((err: AxiosErrorType)=>{
                    toaster.create({
                        title: "Aucun commentaire pour le moment",
                        description: err.response?.data?.message,
                        type: "info",
                    })
            })
        }
    }, [page])

    const handlePage = () => {
        setPage(page+1)
    }
    
    if(comments?.length === 0){
        return (
            <VStack
                h={'200px'}
                justify={'center'}
            >
                <Text 
                    fontSize={'sm'} 
                    fontWeight={300} 
                    fontStyle={'oblique'}
                >
                    Il n'y a aucun commentaire pour le moment. Soyez le premier à donner votre retour.
                </Text>

            </VStack>
            
        )
    }

    return (
        <Stack gap={5}>  
            <Heading mb={5}>Commentaire(s)</Heading>
            <Separator orientation={'vertical'} borderColor={'orange.500'} size={'md'}>
            {
                comments && comments?.length > 0 && comments?.map((comment: CommentData, index: number)=>{
                    const isValidate = commentValue[comment.document._id]?.trim()?.length>1000
                    return (
                    <Stack 
                        as={'div'}
                        key={`${comment.document._id}-${index}`} 
                        w={'100%'} 
                        minH={'75px'} 
                        justify={'center'}
                        divideX={'2px'}
                        gap={'0.09rem'}
                        pl={5}
                        pb={5}
                    >
                        <TemplateComment 
                            com={comment.document} 
                            authorId={authorId} 
                            isValidate={isValidate} 
                            setCommentValue={setCommentValue} 
                        />
                        {comment.document?.replied_comments && comment.document?.replied_comments?.length > 0 && (
                                <Accordion.Root collapsible >
                                    <Accordion.Item value="" >
                                        <Accordion.ItemTrigger asChild>
                                        {
                                            comment.document?.replied_comments?.length === 1 ?
                                            (<Button fontSize={'xs'} size='xs' variant={'ghost'} color={'orange.400'}>{`${comment.document?.replied_comments?.length} réponse`} <Accordion.ItemIndicator /></Button>)
                                            :(<Button fontSize={'xs'} size='xs' variant={'ghost'} color={'orange.400'}>{`${comment.document?.replied_comments?.length} réponses`} <Accordion.ItemIndicator /></Button>)
                                            
                                        }
                                        </Accordion.ItemTrigger>
                                        <Accordion.ItemContent>
                                        <Accordion.ItemBody>
                                        {
                                            comment.document?.replied_comments?.map((rep: CommentData2, index: number)=>(
                                              <TemplateComment key={index} isReply={true} com={rep} authorId={authorId} isValidate={isValidate} setCommentValue={setCommentValue}/>  
                                            ))
                                        }
                                        </Accordion.ItemBody>
                                        </Accordion.ItemContent>
                                    </Accordion.Item>
                               
                                </Accordion.Root>
                            )}
                    </Stack >
                )})
            }
            </Separator>
            {!noMore && <Button mt={5} alignSelf={'start'} onClick={handlePage}>Voir plus de commentaires</Button>}
        </Stack>
        
    )
}

export default ShowComment;