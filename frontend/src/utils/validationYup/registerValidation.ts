import * as Yup from "yup";
import YupPassword from 'yup-password';
import { requiredMSG, lengthMSG, email, confirmPasswordMSG } from "./yupMessage"; 

YupPassword(Yup);

export const registerSchema = () => {
    const schema = Yup.object({
        lastname: Yup.string().min(2, lengthMSG.min).max(25, lengthMSG.max).required(requiredMSG.lastname),
        firstname: Yup.string().min(2, lengthMSG.min).max(25, lengthMSG.max).required(requiredMSG.firstname),
        email: Yup.string().email(email.email_pattern).required(requiredMSG.email),
        birthdate: Yup.date().required(requiredMSG.birthdate),
        password: Yup.string().password().required(requiredMSG.password),
        confirm_password: Yup.string().oneOf([Yup.ref('password')], confirmPasswordMSG.confirm_pattern).required(requiredMSG.confirm_password),
        customer_conditions: Yup.boolean().oneOf([true], requiredMSG.customer_conditions)
    })
    return schema;
}