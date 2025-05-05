//import user from '@/api/user';
import { useEffect, useState, useRef } from "react"
import article from "@/api/article";

import NavBar from "@/components/NavBar";
import { Avatar } from "@/components/ui/avatar";
import { Box, Card, HStack, VStack, Text, Heading, Badge, Button, Table, Link, Stack } from "@chakra-ui/react";
import { useIsAuthStore } from "@/utils/store/useIsAuthStore";
import { Article, AxiosErrorType } from "@/utils/types/types";
import { tags } from "@/utils/tags/tag";
import { tagMapping } from "@/utils/tags/tagMapping";
import ToolTip from "@/components/ToolTip";
import { MdPreview } from "react-icons/md";
import { RiSearchEyeLine } from "react-icons/ri";
import { BiSolidCommentDetail } from "react-icons/bi";
import { TbTrashXFilled } from "react-icons/tb";
import { BsFillShareFill } from "react-icons/bs";
import { MdHowToVote } from "react-icons/md";
import { FaFeatherPointed } from "react-icons/fa6";
import { DrawerActionTrigger, DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import IframeArticle from "@/components/IframeArticle";
import { FaEdit } from "react-icons/fa";
import InfiniteLoadingSVG from "@/components/svg/InfiniteLoadingSVG";
import { useNavigate } from "react-router";
import CustomPagination from "@/components/CustomPagination";
import { toaster } from "@/components/ui/toaster";
import { sleep } from "@/utils/helpingFunc/sleep";
import { capitalize } from "@/utils/helpingFunc/capitalize";


const Dashboard = () =>{
    const navigate = useNavigate()
    const { isAuth } = useIsAuthStore()
    const [articles, setArticles] = useState<Article[]|null>(null)
    const [totalArticles, setTotalArticles] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [mutate, setMutate] = useState<boolean>(false)
    const DialogCloseRef = useRef<HTMLButtonElement | null>(null)
    const pageSize = Number(import.meta.env.ARTICLES_PER_PAGE) || 25

    useEffect(()=>{
        article.get(`/dashboard/${isAuth?.id}/?page=${page}`,{
            withCredentials: true
        })
        .then(response => {
            setArticles(response.data.paginatedResults)
            setTotalArticles(response.data.total[0].count)
        })
        .catch((err: AxiosErrorType | any) =>{
            console.log(err)
            toaster.create({
                title: "Une erreur est survenue.",
                description: err?.response?.data?.message || err.message,
                type: "error",
                duration: 3000
            })
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[page, mutate])

    async function handleDeleteArticle(id: string){
        setIsDeleting(true)
        await sleep(2000)
        try {
            const response = await article.delete(`/article/edit/${id}`, {
                withCredentials: true
            })
            console.log(response)
            if(!response) throw new Error("La suppression de cette article a échoué.")  
            setMutate(prev=> !prev)
            toaster.create({
                title: "Opération réussie !",
                description: response.data?.message,
                type: "success",
                duration: 3000
            })
        } catch(err: AxiosErrorType | any ){
            toaster.create({
                title: "Une erreur est survenue.",
                description: err?.response?.data?.message || err.message,
                type: "error",
                duration: 3000
            })
        } finally {
            setIsDeleting(false)  
            if(DialogCloseRef.current) DialogCloseRef.current.click()
        }
    }

    return (
        <Box 
            backgroundColor="#292929" 
            minH={'100vh'} 
            w={'100vw'} 
            padding={{
                base: '3%',
                xxl: '7%'
            }}
        >
            <HStack alignItems={"start"}>
                <Stack pos={'sticky'} top={'0vh'} w={'20%'}>
                  <NavBar/>  
                </Stack>
                
                { articles && !isLoading && articles.length > 0 ? (
                    <VStack width={"100%"}>
                        <Table.ScrollArea border={"1px solid white"} borderRadius={5} maxH={"550px"}>
                            <Table.Root striped interactive stickyHeader w={"75vw"}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeader display={"flex"}>
                                            <Text>Vos Articles -</Text>   
                                            <Text color={"orange.300"}>{totalArticles}</Text>
                                        </Table.ColumnHeader>

                                        <Table.ColumnHeader></Table.ColumnHeader>

                                        <Table.ColumnHeader textAlign={"end"} >
                                            <Link href="/dashboard/new" bg={{ _hover:'orange'}} color={{_hover: "#292929"}} >
                                                    Créer un nouvel article 
                                                    <FaFeatherPointed size={"12px"}/> 
                                            </Link>
                                        </Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {articles && articles.map((art, index: number)=>(
                                    <Table.Row w={"100%"} h={"100px"} key={`${art?._id}-${index}`}>
                                            <Table.Cell w={'50px'}>
                                                <Avatar src={`http://localhost:3000/${art?.media?.path}`} shape={"rounded"} size={"2xl"}/>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Box w={'100%'} maxW={"350px"} whiteSpace={"nowrap"}>
                                                    {Array.from([
                                                            {content: art.title, children :<Heading overflow={"hidden"} textOverflow={"ellipsis"}>{art.title}</Heading>}, 
                                                            {content: art.description, children :<Text overflow={"hidden"} textOverflow={"ellipsis"}>{art.description}</Text>},

                                                        ]).map((elem, index)=>(
                                                            <ToolTip position={"bottom-start"} content={elem.content} children={elem.children} key={`${index}-tooltip-text`}/>
                                                        ))}
                                                        {art.TagsName.map((tag, index)=>(
                                                            <Badge key={`${tag}-${index}`} bg={"orange"} color={"#292929"} mr={1}>{tags(tag)}{tagMapping(tag)}</Badge>
                                                        ))}
                                                </Box> 
                                            </Table.Cell>
                                            <Table.Cell position={"relative"}>
                                                <HStack justifyContent={"end"} w={'100%'} gap={3}>
                                                    {Array.from([
                                                        {content: art.meta.visited?.length, children :<MdPreview size={"20px"} cursor={"pointer"} />}, 
                                                        {content: art.meta.comment, children :<BiSolidCommentDetail size={"20px"} cursor={"pointer"} />},
                                                        {content: art.meta.shared, children :<BsFillShareFill size={"20px"} cursor={"pointer"} />},
                                                        {content: art.meta.voted?.length, children :<MdHowToVote size={"20px"} cursor={"pointer"} />},
                                                        {
                                                            content: "Prévisualiser", 
                                                            children : (
                                                                <DrawerRoot size={"xl"}>
                                                                    <DrawerBackdrop />
                                                                    <DrawerTrigger asChild>
                                                                        <Button  variant={index%2 !== 0 ? "surface": "subtle"}> 
                                                                            <RiSearchEyeLine size={"20px"}  /> 
                                                                        </Button>
                                                                    </DrawerTrigger>
                                                                    <DrawerContent>
                                                                    <DrawerHeader>
                                                                        <DrawerTitle>Prévisualisation de ton article</DrawerTitle>
                                                                    </DrawerHeader>
                                                                    <DrawerBody>
                                                                        { art &&
                                                                            <IframeArticle content={art} isAuth={isAuth}/>
                                                                        }
                                                                    
                                                                    </DrawerBody>
                                                                    <DrawerFooter>
                                                                        <DrawerActionTrigger asChild>
                                                                            <Button> Retour </Button>
                                                                        </DrawerActionTrigger>
                                                                        <Button variant="outline" bg={{base:'orange', _hover:'orange.700'}} color={"#292929"} onClick={()=>navigate(`/dashboard/edit/${art?._id}`)}> <FaEdit /> Editer</Button>
                                                                    </DrawerFooter>
                                                                    <DrawerCloseTrigger />
                                                                    </DrawerContent>
                                                                </DrawerRoot>
                                                                        
                                                            )
                                                        },
                                                        {
                                                            content: "Supprimer", children :(
                                                                <DialogRoot size={"xs"} closeOnInteractOutside={!isDeleting}>
                                                                    <DialogTrigger asChild>
                                                                        <Button variant={index%2 !== 0 ? "surface": "subtle"}> <TbTrashXFilled size={"20px"} color="red" /> </Button>
                                                                    </DialogTrigger>
                                                                    <DialogContent>
                                                                        <DialogHeader>
                                                                            <DialogTitle>{isAuth?.firstname && capitalize(isAuth.firstname)}, etes-vous sure de votre choix ?</DialogTitle>
                                                                        </DialogHeader>
                                                                        <DialogBody>
                                                                            <p>
                                                                                En supprimant cette article vous ne pourrez plus retourner en arrière.
                                                                            </p>
                                                                        </DialogBody>
                                                                        <DialogFooter>
                                                                            <DialogActionTrigger asChild>
                                                                                <Button disabled={isDeleting} variant="outline" bg={{base: "orange", _hover: "orange.600"}} color={"#292929"} >Annuler</Button>
                                                                            </DialogActionTrigger>
                                                                            <Button  loading={isDeleting} loadingText="Suppression en cours..." bg={{base: "red.500", _hover: "red.700"}} color={"#F7F7F7"} onClick={()=>handleDeleteArticle(art._id)}>Je confirme</Button>
                                                                        </DialogFooter>
                                                                        <DialogCloseTrigger disabled={!isDeleting} ref={DialogCloseRef}/>
                                                                    </DialogContent>
                                                                </DialogRoot>
                                                            )
                                                    }]).map((elem, index)=>(
                                                        <ToolTip content={elem.content} children={elem.children} key={`${index}-tooltip`}/>
                                                    ))}
                                                </HStack>
                                                <Text fontStyle={"oblique"} fontSize={'1em'} bottom={1} right={3} position={"absolute"} fontWeight={"300"} color={"#808080"}>{ new Date(art.created_at).toLocaleString() }</Text>
                                            </Table.Cell>
                                                
                                    </Table.Row>            
                                    ))}
                                </Table.Body>
                            </Table.Root> 
                        </Table.ScrollArea>

                        <CustomPagination count={totalArticles} pageSize={pageSize} page={page} setPage={setPage}/>

                        <HStack gap={"3%"} w={"100%"}>
                            <Box overflow={"hidden"} borderRadius={"4px"}>
                                <Card.Root 
                                    border={'3px solid transparent'} 
                                    borderImage={"linear-gradient(to bottom right, orange 0%, #000000 60%, orange 85%, #FFFF00 100%)"} 
                                    borderImageSlice={1}  
                                >
                                    <Card.Header>
                                        Votre poste le plus pouplaire
                                    </Card.Header>
                                    <Card.Body>
                                        <Avatar size={"2xl"} />
                                    </Card.Body>
                                </Card.Root> 
                            </Box>
                            <Box overflow={"hidden"} borderRadius={"4px"}>
                                <Card.Root 
                                    border={'3px solid transparent'} 
                                    borderImage={"linear-gradient(to bottom right, orange 0%, #000000 60%, orange 85%, #FFFF00 100%)"} 
                                    borderImageSlice={1}  
                                >
                                    <Card.Header>
                                        Votre poste le plus pouplaire
                                    </Card.Header>
                                    <Card.Body>
                                        <Avatar size={"2xl"} />
                                    </Card.Body>
                                </Card.Root> 
                            </Box>
                            <Box overflow={"hidden"} borderRadius={"4px"}>
                                <Card.Root 
                                    border={'3px solid transparent'} 
                                    borderImage={"linear-gradient(to bottom right, orange 0%, #000000 60%, orange 85%, #FFFF00 100%)"} 
                                    borderImageSlice={1}  
                                >
                                    <Card.Header>
                                        Votre poste le plus pouplaire
                                    </Card.Header>
                                    <Card.Body>
                                        <Avatar size={"2xl"} />
                                    </Card.Body>
                                </Card.Root> 
                            </Box>       
                        </HStack>
                    </VStack>
                ):(
                    <VStack alignItems={'center'} justify={"center"} h={'50dvh'} w={'100%'}>
                        {
                            isLoading ? (
                                <InfiniteLoadingSVG h="128px"/>
                            ):(
                                <>
                                    <Avatar src="http://localhost:3000/uploads/default.jpg" size={"2xl"}/>
                                    <Text fontStyle={"italic"}>Vous n'avez pas encore crée de recette. Vous pouvez le faire <Link href="/dashboard/new" color={"orange"}>ici</Link></Text>
                                </>
                                
                            )
                        }  
                    </VStack>
                    
                )
                }
            </HStack>
        </Box>
    )
}

export default Dashboard;