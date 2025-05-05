import { useNavigate } from "react-router";

const navigate = useNavigate();

export function navigateTo(url: string){
    navigate(url)
}