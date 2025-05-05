import {
    ButtonGroup,
    IconButton,
    Pagination,
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

interface CustomPaginationProps {
    count: number;
    pageSize: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ count, pageSize, page, setPage }) => (
    <Pagination.Root count={count} pageSize={pageSize} alignSelf={"flex-end"} page={page} onPageChange={(e) => setPage(e.page)}>
            <ButtonGroup variant="ghost" size={"sm"}>
                <Pagination.PrevTrigger asChild>
                    <IconButton>
                        <LuChevronLeft />
                    </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                    render={(page) => (
                        <IconButton variant={{ base: "ghost", _selected: "solid" }}>
                            {page.value}
                        </IconButton>
                    )}    
                />

                <Pagination.NextTrigger asChild>
                    <IconButton>
                        <LuChevronRight />
                    </IconButton>
                </Pagination.NextTrigger>
            </ButtonGroup>
    </Pagination.Root>
)

export default CustomPagination;