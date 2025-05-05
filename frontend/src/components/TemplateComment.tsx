import { useIsAuthStore } from "@/utils/store/useIsAuthStore"
import { Editable, HStack, IconButton, Separator, Stack, Text } from "@chakra-ui/react"
import { Avatar } from "./ui/avatar"
import { capitalize } from "@/utils/helpingFunc/capitalize"
import { PiChefHatFill } from "react-icons/pi"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"
import comment from "@/api/comment"
import { AxiosErrorType, CommentData2 } from "@/utils/types/types"
import { toaster } from "./ui/toaster"
import { ValueChangeDetails } from "@zag-js/editable"
import { convertDate } from "@/utils/helpingFunc/convertDate"
import { useState } from "react"
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { Tooltip } from "./ui/tooltip"
import CommentTextField from "./CommentTextField"




interface TemplateCommentProps {
    com: CommentData2;
    authorId: string;
    isValidate: boolean;
    setCommentValue: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
    isReply?: boolean;
}
const TemplateComment: React.FC<TemplateCommentProps> = ({ com, authorId, isValidate, setCommentValue, isReply=false }) => {

    const [isEdited, setIsEdited] = useState<{[key: string]: boolean}>({})
    const [isAnswer, setIsAnswer] = useState(false)


    const handleComment = (e: ValueChangeDetails, commentId: string) =>{
            comment.patch(`/comment/update`, { content: e.value, commentId: commentId }, { withCredentials: true })
                .then((response) => {
                    let isUpdated: boolean = response.data.success
                    if(isUpdated){
                        setIsEdited(prev=>({...prev, [commentId] : true}))
                    }
    
                })
                .catch((err: AxiosErrorType) => {
                    toaster.create({
                        title: "Erreur dans la mise à jour du commentaire",
                        description: err.response?.data?.message,
                        type: "error",
                    })
                })
        }
    
    const {isAuth} = useIsAuthStore()

    if(!com?.user?.profile_image_path?.path){
        return(
            <div>waiting</div>
        )
    }
    return(
    <>
        <Separator orientation={'vertical'}  borderColor={isReply ? 'gray.500' : "transparent"} size={'md'} pl={isReply ? 8 : 0}>
            <HStack>
                <Avatar src={`http://localhost:3000/${com.user.profile_image_path.path}`} shape='rounded'/>
                <Text>{capitalize(com.user.firstname)}</Text> 
                {com.user_id === authorId ? <PiChefHatFill />   :  null }
            </HStack>
            {
                isAuth?.id === com.user_id ? 
                (
                    <Stack>
                        <Editable.Root 
                            defaultValue={com.content} 
                            activationMode="dblclick" 
                            fontSize={'md'} 
                            lineHeight={1.5} 
                            m={0} 
                            p={0} 
                            submitMode={'none'}
                            onValueChange={(e)=>{setCommentValue( prev=>({ ...prev, [com._id]: e.value }))}}
                            onValueCommit={async(e)=>{ handleComment(e, com._id) }}
                        >
                            <Editable.Preview />
                            <Editable.Textarea h={'150px'}/>
                            <Editable.Control>
                                <Editable.EditTrigger asChild>
                                <IconButton variant="ghost" size="xs">
                                    <LuPencilLine />
                                </IconButton>
                                </Editable.EditTrigger>
                                <Editable.CancelTrigger asChild>
                                    <IconButton variant="outline" size="xs">
                                        <LuX />
                                    </IconButton>
                                </Editable.CancelTrigger>
                                <Editable.SubmitTrigger asChild type="submit" disabled={isValidate}>
                                    <IconButton variant="outline" size="xs">
                                        <LuCheck />
                                    </IconButton>
                                </Editable.SubmitTrigger>
                            </Editable.Control>
                        </Editable.Root>
                        {isValidate && <Text fontSize={'xs'} color={'red'}>Vous devez avoir moins de 1000 caractères</Text>}
                    </Stack>
                ) : (
                    <Text>{com.content}</Text> 
                )
            }
            <HStack>
                <Text fontSize={'xs'} fontStyle={'oblique'} color={'gray.400'} > ー Il y a {convertDate(com.created_at)}</Text>
                {(com.edit || isEdited[com._id]) && <Text fontSize={'xs'} fontStyle={'oblique'} color={'purple.400'} > ~ edited</Text>}
                {!com.reply_to && (
                    <Tooltip 
                        content="Répondre" 
                        openDelay={200} 
                        closeDelay={100}
                    >
                        <IconButton 
                            fontSize={'xs'} 
                            variant={'ghost'} 
                            size={"sm"}
                            onClick={()=>setIsAnswer(prev => !prev)}
                        >
                            <MdOutlineQuestionAnswer />
                        </IconButton>
                    </Tooltip>) } 
            </HStack>
            {isAnswer && (
                <CommentTextField
                    clientId={isAuth?.id}
                    articleId={com.article_id}
                    answer={isAnswer}
                    replyTo={com._id}
                />
            )}
        </Separator>
    </>                       
)}

export default TemplateComment