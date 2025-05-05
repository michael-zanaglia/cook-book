import { Box, Button, Grid, GridItem, Input, Stack, EmptyState, RadioGroupValueChangeDetails } from "@chakra-ui/react";
import {
    MenuContent,
    MenuRadioItem,
    MenuRadioItemGroup,
    MenuRoot,
    MenuTrigger,
  } from "@/components/ui/menu"
import RecipeCards from "@/components/RecipeCards";
import { HiSortAscending, HiSortDescending } from "react-icons/hi"
import { ChangeEvent, useEffect, useState, useCallback } from "react";
import NavBar from "@/components/NavBar";
import SliderMin from "@/components/SliderMin";
import { Article, AxiosErrorType } from "@/utils/types/types";
import article from "@/api/article";
import InfiniteLoadingSVG from "@/components/svg/InfiniteLoadingSVG";
import { debounce } from "@/utils/helpingFunc/debounce";
import LoadingSVG from "@/components/svg/LoadingSVG";
import { sleep } from "@/utils/helpingFunc/sleep";




const Home = () =>{

    const [order, setOrder] = useState<string | null>("")
    const [search, setSearch] = useState('')
    const [time, setTime] = useState('')

    const [articles, setArticles] = useState<Article[]>([])
    const [page, setPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(0)
    const [nothing, setNothing] = useState(false)

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isCharging, setIsCharging] = useState<boolean>(false)

    // useEffect(()=>{                         // --- First Rendering
    //     getArticlesByFilter();
    // }, [])

    useEffect(()=>{                         // --- iNFINITE SCROLL DETECTED
        if(!isCharging) return;
        
        setPage((prevPage) => prevPage + 1)
        
    }, [isCharging])

    useEffect(()=>{                       
        if(page === currentPage || page===1){ // --- iNFINITE SCROLL 
            return;
        }

        async function scrolling(){
           await getArticlesByScroll(); 
        }
        
        scrolling()

    }, [page])

    useEffect(()=>{                         // -- FILTER EFFECT
        //if(!order && !time) return;
        
        console.log("get filter")
        getArticlesByFilter();
            
    },[order, search, time])

    function getArticlesByFilter(){
        console.log(page)
        article.get(`/article?page=${page}&search=${search}&time=${time}&order=${order}`)
        .then((response)=>{
            console.log(response.data, "articles")
            setArticles([...response.data])
            
        }) 
        .catch((err: AxiosErrorType)=>{
            console.log(err.response?.data?.message)
        })
        .finally(()=>{
            setIsLoading(false)
            setIsCharging(false)
        }) 
    }
    
    async function getArticlesByScroll(){
        console.log(page)
        await sleep(1000)
        setNothing(false)
        try {
            const response = await article.get(`/article?page=${page}&search=${search}&time=${time}&order=${order}`)
            if(Array.isArray(response.data) && response.data.length === 0){ 
                console.log("J'effectue -1")
                setPage((prevPage) => prevPage - 1)
                setNothing(true)
            } else {
                setCurrentPage(page)
            }
            setArticles((prevData)=>[...prevData, ...response.data])
        }catch(err: AxiosErrorType | any){
            console.log(err.response?.data?.message)
        }finally{
            setIsLoading(false)
            setIsCharging(false)
        }
        
    }

     const handleScroll = async() => {
        if (
            window.scrollY + window.innerHeight 
            > document.body.scrollHeight - 50
        ) {
            setIsCharging(true)
        }
     };

     function changeValueSearch(e: ChangeEvent<HTMLInputElement>){
        console.log(e.target.value, "val")
        setPage(1)
        setCurrentPage(0)
        setSearch(e.target.value ? e.target.value : "")
     }
     function changeValueOrder(e:  RadioGroupValueChangeDetails){
        setPage(1)
        setCurrentPage(0)
        setOrder(e.value)
     }

    const debounceHandleSearch = useCallback(debounce(changeValueSearch, 800), [])
   
    window.addEventListener("scroll", debounce(handleScroll, 500));

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
                templateColumns={{
                    base: '1fr',
                    xl: '1fr 5fr',
                    xxl: '0.5fr 2fr'
                }}
                templateRows={{
                    base: '90px auto',
                    lg: 'auto',
                }}
            >
                <GridItem colSpan={1} minW={"200px"}>
                    <Stack direction={'column'} pos={'sticky'} top={'5vh'} gap={'1em'} >
                        <NavBar/>
                        <Input 
                           focusRingColor={"orange"} 
                           borderColor={'#353535'}
                           placeholder="Rechercher..."
                           maxW={'400px'}
                           onChange={debounceHandleSearch}
                           type="text"
                        />
                        <SliderMin setTime={setTime} setPage={setPage} setCurrentPage={setCurrentPage}/>
    
                        <MenuRoot>
                            <MenuTrigger asChild>
                                <Button variant="solid" size="sm" maxW={"5rem"}>
                                    {
                                        order === "1" ?
                                        <HiSortAscending />:
                                        <HiSortDescending />
                                    } 
                                    Trier
                                </Button>
                            </MenuTrigger>
                            <MenuContent maxW="5rem">
                                <MenuRadioItemGroup
                                    value={order || "-1"}
                                    onValueChange={
                                        changeValueOrder
                                    }
                                >
                                    <MenuRadioItem value={"1"}>Croissant</MenuRadioItem>
                                    <MenuRadioItem value={"-1"}>Décroissant</MenuRadioItem>
                                </MenuRadioItemGroup>
                            </MenuContent>
                        </MenuRoot>
                    </Stack>
                    
                </GridItem>
                <GridItem  colSpan={1}>
                    {
                        isLoading ? (
                            <EmptyState.Root>
                                <EmptyState.Content>
                                    <EmptyState.Indicator>
                                        <InfiniteLoadingSVG h="120px"/> 
                                    </EmptyState.Indicator>
                                </EmptyState.Content>
                            </EmptyState.Root>
                        ):(
                            <RecipeCards articles={articles}/>
                        )

                    }
                    {
                        isCharging && ( 
                            <EmptyState.Root minH={"64px"}>
                                <EmptyState.Content>
                                    <EmptyState.Indicator>
                                      <LoadingSVG h="64px" sx={{ alignSelf: "center" }}/>
                                    </EmptyState.Indicator>
                                </EmptyState.Content>
                            </EmptyState.Root>  
                        )
                    }
                    {
                        nothing &&  ( 
                            <EmptyState.Root minH={"64px"}>
                                <EmptyState.Content> 
                                    <EmptyState.Title>
                                        Aucun résultat 
                                    </EmptyState.Title> 
                                </EmptyState.Content>
                            </EmptyState.Root>  
                        )
                    }
                </GridItem>
            </Grid>
            
        </Box>
    )
}

export default Home;
