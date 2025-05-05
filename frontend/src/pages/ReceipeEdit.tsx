import NavBar from "@/components/NavBar";
import { Box, Button, Grid, GridItem, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Formik, Form, Field as FormikField, FieldArray } from "formik";
import { SegmentedControl } from "@/components/ui/segmented-control";
import TextEditor from "@/components/TextEditor";
import Select from "@/components/Select";
import Quantite from "@/components/Quantite";
import { SliderMinFormik } from "@/components/SliderMin";
import UploadButton from "@/components/UplodadButton";
import { DrawerActionTrigger, DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import { useIsAuthStore } from "@/utils/store/useIsAuthStore";
import { FaEdit } from "react-icons/fa";
import { recipeValidation } from "@/utils/validationYup/recipeValidation";
import tag from "@/api/tag";
import { toaster } from "@/components/ui/toaster";
import { Article, AxiosErrorType, Tag, Tags } from "@/utils/types/types";
import article from "@/api/article";
import { sleep } from "@/utils/helpingFunc/sleep";
import { useNavigate, useParams } from "react-router"
import IframeArticle from "@/components/IframeArticle";

interface ReceipeEditProps {
    isEdit?: boolean;
    data?: Article | null;
}

const ReceipeEdit: React.FC<ReceipeEditProps> = ({ isEdit=false }) => {

    const [content, setContent] = useState<any>(null)
    const {isAuth} = useIsAuthStore()
    const [items, setItems]= useState<Tags[]>([]);
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [myArticle, setMyArticle] = useState<Article | null>(null)
    const navigate = useNavigate()
    const { id } = useParams();

    

    useEffect(()=>{
        async function getFileBlob(url: any, mime: any, originalname: string){
            let response = await fetch(url);
            let data = await response.blob();
            let metadata = {
              type: mime,
            };
            return new File([data], originalname, metadata);
            
        }
        
        if(isEdit){
            article.get(`/article/${id}`)
            .then(response=> {
                const data = response.data as Article;

                if(data?.media?.path){
                    getFileBlob(`http://localhost:3000/${data.media.path}`, data.media.mimetype, data.media.originalname)
                   .then(objectPhoto => {
                        setMyArticle({...data, media: objectPhoto })
                    })
                    
                } else {
                    setMyArticle(data)
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

        tag.get('/tags/common')
        .then(response=> {
            const tags = response.data
            
            const readableTag = tags.map((tag: Tag)=>(
                {label: tag.tag, value: tag._id}
            ))
            setItems(readableTag)
        })
        .catch((err: AxiosErrorType)=> {
            toaster.create({
                title: "Une erreur est survenue.",
                description: err.response?.data?.message,
                type: "error",
            })
        })

        
    }, [])


    useEffect(()=>{
        if(isEdit && myArticle){
            console.log(myArticle.tags, 'debut')
            const filteredTags = myArticle.tags.filter(tag => items.some((item: Tags) => item.value === tag));
            console.log(filteredTags, 'tag')
            setMyArticle({...myArticle, tags: filteredTags})
        }
    },[items])

    //a
    const handleForm = async(val:any) =>{
        try {
            setIsSaving(true)
            console.log("Initial Value:",val)
            await sleep(2000)
            let formulaire = {
                ...val,
                user_id: isAuth?.id
            }
            let successful = '';
            if (isEdit) {
                formulaire = { ...formulaire, id: id}
                const response = await article.patch(`/article/edit/update`, formulaire, { headers: {"Content-Type": "multipart/form-data"}, withCredentials: true })
                if(!response) throw new Error("L'article n'a malheureusement pas pu etre posté")
                successful = response.data?.message
            } else {
                const response = await article.post('/article', formulaire, { headers: {"Content-Type": "multipart/form-data"}, withCredentials: true })
                if(!response) throw new Error("L'article n'a malheureusement pas pu etre posté")
                successful = response.data?.message
            }

            toaster.create({
                    title: "Opération réussie",
                    description: successful,
                    type: "success",
            })  
            
            
            await sleep(3000)
            toaster.dismiss()
            setIsSaving(false)
            navigate('/dashboard')
        }catch(err: AxiosErrorType | any){
            toaster.create({
                title: "Une erreur est survenue.",
                description: err.response?.data?.message || err.message,
                type: "error",
            })
            setIsSaving(false)
        }
    }
    return (
        <Box 
            backgroundColor="#292929" 
            minH={'100vh'} 
            w={'100vw'} 
            paddingLeft={{
                base: '0',
                md: '10%',
            }} 
            paddingRight={{
                base: '0',
                md: '10%',
            }} 
            paddingTop={{
                base: '0',
                md: '2%',
                xxl: '1%',
            }} 
        >
            <Grid
                templateColumns={{
                    base: '1fr',
                    xl: '1fr 5fr',
                    xxl: '0.5fr 2fr'
                }}
                templateRows={{
                    base: '90px 1fr',
                    lg: '1fr'
                }}
                h={'100%'}
                gap={"20px"}
            >
                <GridItem colSpan={1} >
                    <Stack direction={'column'} pos={'sticky'} top={'5vh'} gap={'1em'}>
                        <NavBar/>
                    </Stack>
                </GridItem>
                <GridItem colSpan={1} >
                    <Box
                        minH={'90vh'}
                        w={'100%'}  
                        padding={5}    
                        border={'1px solid #d5d5d5'}          
                        borderRadius={'10px'}    
                    >
                        <Heading fontFamily={'Poppins, sans-serif'}>Créér une nouvelle recette</Heading>
                        <Formik
                            initialValues={{
                                title: isEdit && myArticle?.title ? myArticle.title : "",
                                description: isEdit && myArticle?.description ? myArticle.description : "",
                                ingredients: isEdit && myArticle?.ingredients ? myArticle.ingredients : [],
                                article: isEdit && myArticle?.article ? myArticle.article : "",
                                tags: isEdit && myArticle?.tags ? myArticle.tags : [],
                                time: isEdit && myArticle?.time ? myArticle.time : "20",
                                media: isEdit && myArticle?.media ? myArticle.media : "",
                                price: isEdit && myArticle?.price ? myArticle.price : "€",
                                nombre_personne: isEdit && myArticle?.nombre_personne ? String(myArticle.nombre_personne) : "",
                            }}  
                            enableReinitialize={true}
                            validationSchema={recipeValidation}
                            validateOnBlur // validation du champs immédiatement 
                            onSubmit={(val)=> {
                                handleForm(val)
                            }}
                        >
                            {({ handleChange, handleSubmit, handleBlur, values, errors, touched, isValid, dirty }) => (
                                <Form onSubmit={(e)=>{
                                    e.preventDefault()
                                    handleSubmit()
                                }}>   
                                    <Stack gap={'0.5em'}>
                                        <Field label="Selectionner un ou plusieurs tags afin de mieux référencer votre recette" required>
                                            <FormikField name='tags' component={Select} tagsBDD={items}/>
                                        </Field>
                                        <Field label="Indiquer le coût global de votre recette" required>
                                            <SegmentedControl 
                                                name="price"
                                                cursor={"pointer"}
                                                value={values.price}
                                                items={["€", "€€", "€€€", "€€€€", "€€€€€"]} 
                                                onChange={handleChange}
                                                onBlur={handleBlur} 
                                            />
                                            {errors?.price && touched?.price && <Text color={'#FF0000'} fontSize={'12px'}>{errors.price}</Text>}
                                        </Field>
                                        <Field label="Veuillez indiquer le temps de préparation" required> 
                                            <FormikField name='time' component={SliderMinFormik}/>
                                        </Field>
                                        <Field label="Donner un nom à votre recette" required>
                                            <Input 
                                                name="title"
                                                type="texte"
                                                border={'1px solid #d5d5d5'} 
                                                placeholder="Mon plus beau titre" 
                                                value={values.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur} 
                                            />
                                            {errors?.title && touched?.title && <Text color={'#FF0000'} fontSize={'12px'}>{errors.title}</Text>}
                                        </Field>
                                        <Field label="Décrire en moins de 50 mots votre recette" required>
                                            <Input 
                                                name="description"
                                                type="texte"
                                                border={'1px solid #d5d5d5'} 
                                                placeholder="L'art d'aimer manger" 
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur} 
                                                
                                            />
                                            {errors?.description && touched?.description && <Text color={'#FF0000'} fontSize={'12px'}>{errors.description}</Text>}
                                        </Field>
                                        <Field label="Ajouter une photo pour illustrer votre magnifique recette !" required> 
                                            <FormikField name='media' component={UploadButton} isEdit={isEdit}/>
                                        </Field>
                                        <Field label="La recette est destiné à combien de personne ?" required>
                                            <Input 
                                                name="nombre_personne"
                                                type="number"
                                                border={'1px solid #d5d5d5'} 
                                                value={values.nombre_personne}
                                                onChange={handleChange}
                                                onBlur={handleBlur} 
                                            />
                                            {errors?.nombre_personne && touched?.nombre_personne && <Text color={'#FF0000'} fontSize={'12px'}>{errors.nombre_personne}</Text>}
                                        </Field>
                                        {/* Ici, je me crée un champs dynamique afin d'ajouter ou supprimer des sous-champs*/}
                                        <FieldArray name="ingredients">
                                            {({ remove, push }) => (
                                                <Field label="Ingrédients" bgColor={'#404040'} p={2} borderRadius={5} required>
                                                   { 
                                                        // Je n'affiche que si j'ai des elements dans ingredients !
                                                        values.ingredients && values.ingredients.length > 0 &&
                                                        values.ingredients.map((_, index)=>(
                                                            <Quantite key={index} index={index} remove={remove} /> 
                                                              
                                                        ))
                                                    }
                                                    <Button 
                                                        onClick={() => push({ quantite: 1, ingredient: "", unit: "g" })} 
                                                        disabled={values.ingredients && values.ingredients.length === 20}
                                                    >
                                                        Ajouter
                                                    </Button>
                                                </Field>
                                            )}
                                            
                                        </FieldArray>
                                    
                                        <Field label="Ecrivez votre recette (soyez le + précis possible)" required>
                                            <FormikField name='article' component={TextEditor} />
                                        </Field>
                                        <DrawerRoot size={"xl"} closeOnEscape={!isSaving} closeOnInteractOutside={!isSaving}>
                                            <DrawerBackdrop />
                                            <DrawerTrigger asChild>
                                                <Button onClick={()=>setContent({...values, user_id: isAuth?.id})} bg={{base:'orange', _hover:'orange.700'}} disabled={isEdit ? !(isValid) : !(isValid && dirty)} /*disabled={!(isValid && dirty) || isLoading}*/>
                                                    Prévisualiser
                                                </Button> 
                                            </DrawerTrigger>
                                            <DrawerContent>
                                            <DrawerHeader>
                                                <DrawerTitle>Prévisualisation de ton article</DrawerTitle>
                                            </DrawerHeader>
                                            <DrawerBody>
                                                {content &&
                                                    <IframeArticle content={content} isAuth={isAuth}/>
                                                }
                                               
                                            </DrawerBody>
                                            <DrawerFooter>
                                                <DrawerActionTrigger asChild>
                                                    <Button disabled={isSaving} variant="outline" bg={{base:'orange', _hover:'orange.700'}} color={"#292929"} ><FaEdit /> Retourner dans l'éditeur</Button>
                                                </DrawerActionTrigger>
                                                <Button onClick={()=>handleForm(values)} loading={isSaving} loadingText="Veuillez patienter">Sauvegarder</Button>
                                            </DrawerFooter>
                                            <DrawerCloseTrigger />
                                            </DrawerContent>
                                        </DrawerRoot>
                                        
                                    </Stack>
                                </Form>
                            )}
                           
                        </Formik>

                    </Box>
                    
                </GridItem>
            </Grid>
        </Box>
    )
}

export default ReceipeEdit;