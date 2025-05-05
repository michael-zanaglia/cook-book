import * as Yup from "yup";
import { requiredMSG, lengthMSG } from "./yupMessage"; 

export const commentValidation = () => {
    const schema = Yup.object({
        content: Yup.string().trim().min(2, lengthMSG.min).max(1000, lengthMSG.max).required(requiredMSG.comment),
    })
    return schema;
}