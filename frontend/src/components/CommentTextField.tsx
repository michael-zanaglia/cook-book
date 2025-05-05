import { commentValidation } from "@/utils/validationYup/commentValidation";
import { Button, Textarea, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik";
import { Field } from "./ui/field";
import {  useState } from "react";
import comment from "@/api/comment";
import { AxiosErrorType } from "@/utils/types/types";
import { toaster } from "./ui/toaster";
import { useCommentsStore } from "@/utils/store/useCommentsStore";

interface CommentTextFieldProps {
    user?: string; // firstname de l'author
    articleId?: string;
    clientId?: string;
    answer?: boolean;
    replyTo?: string;
}
const CommentTextField: React.FC<CommentTextFieldProps> = ({user, articleId, clientId, answer=false, replyTo}) => {
    const [commentLen, setCommentLen] = useState(1000);
    const [isSent, setIsSent] = useState(false)
    const { setComments } = useCommentsStore()
    return (
        <Formik
            initialValues={{
                content: ''
            }} 
            enableReinitialize={true}
            validationSchema={commentValidation}
            validateOnBlur
            onSubmit={(val, { resetForm })=>{
                setIsSent(true)
                const form = !answer ? {
                    content: val.content,
                    user_id: clientId,
                    article_id: articleId
                } : {
                    content: val.content,
                    user_id: clientId,
                    article_id: articleId, 
                    reply_to: replyTo 
                }
                comment.post('/comment/store', form, {withCredentials: true})
                .then(response =>{
                    if(!answer){
                      setComments((prev)=> [{document: response.data}, ...(prev || [])])  
                    } else {
                        setComments((prev)=>{
                            if (!prev) return [{document: response.data}];

                            const replyId = response.data.reply_to;

                            // Clone profond des commentaires pour éviter de muter l'état
                            const updatedComments = prev.map((comment) => {
                                if (comment.document._id === replyId) {
                                    // On ajoute la réponse dans replied_comments
                                    return {
                                        document: {
                                            ...comment.document,
                                            replied_comments: [...(comment?.document?.replied_comments || []), response.data],
                                        },
                                    };
                                }
                                return comment;
                            });

                            return updatedComments;
                        })
                    }
                })
                .catch((err: AxiosErrorType | any)=>toaster.create({
                                        title: "Erreur dans la mise à jour du commentaire",
                                        description: err.response?.data?.message ||err.message,
                                        type: "error",
                                    }))
                                   
                .finally(()=>{
                    setIsSent(false)
                    resetForm()
                })                    
            }}
        >
            {({handleChange, handleSubmit, values, errors, isValid, dirty })=>
            <Form
                onSubmit={(e)=>{
                    e.preventDefault()
                    handleSubmit()
                }}
            >
                <Field label={!answer && `Votre avis doit intérésser ${user}`} helperText={`Il vous reste ${commentLen} caractères.`} w={'100%'}>
                    <Textarea 
                        name='content' 
                        size={'xl'} 
                        onChange={(e)=>{
                            setCommentLen(1000-Number(e.target?.value?.length))
                            handleChange(e)
                        }} 
                        borderColor={'orange'} 
                        fontSize={'sm'} 
                        value={values.content}
                    /> 
                    {errors?.content && <Text color={'#FF0000'} fontSize={'12px'}>{errors.content}</Text>}
                </Field>
                <Button type="submit" disabled={!(isValid && dirty)} loading={isSent}>
                    {!answer ? 'Envoyer' : 'Répondre'}
                </Button> 
            </Form>
            }
        </Formik>
        
    )
}

export default CommentTextField;