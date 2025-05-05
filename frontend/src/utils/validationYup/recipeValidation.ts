import * as Yup from 'yup';
import { lengthMSG, requiredMSG} from './yupMessage';

export const recipeValidation = () => {
    interface File {
        name?: string;
        size?: number;
        type?: string;
    }
    const FILE_TYPE = [
        "image/png",
        "image/jpeg",
        "image/jpg"
    ];

    const CAPUTRE_HTML_REGEX = /<(.|\n)*?>/g

    const schema = Yup.object({
        title: Yup.string().trim().min(3, lengthMSG.min).required(requiredMSG.title),

        description: Yup
                    .string().trim()
                    .test(
                         "max-words", "La description ne doit pas dépasser plus de 50 mots.", 
                         (val)=>{
                                 if(!val)return false 
                                 return val?.trim()?.split(/\s+/).length < 51 
                    })
                    .required(requiredMSG.description),

        ingredients: Yup
                        .array().of(
                            Yup.object().shape({
                                 quantite: Yup.number().positive("doit etre un nombre positif").required("Quantite Requis."),
                                 ingredient: Yup.string().trim().min(2, "Trop court").required("Ingredient Requis."),
                                 //  unit: Yup.string().required()
                            })
                        )
                        .min(1, lengthMSG.min).required(),

        article: Yup.string().trim().test(
            'article-exist', 'Il faut un article',
            (val)=>{
                return typeof val === 'string' && val.replace(CAPUTRE_HTML_REGEX, '').trim().length >= 1
            }

        ).required(requiredMSG.article),

        tags: Yup.array()
                .of(
                    Yup.string()
                )
                .min(1, requiredMSG.tags).max(4, "4 tags max autorisé"),

        media:  Yup.mixed()
                .required(requiredMSG.media)
                .test(
                    'file-type', "Ce type de fichier n'est pas autorisé.",
                    (val?: File)=>{
                        if(!val || !val.type) return false
                        return FILE_TYPE.includes(val.type)
                    }
                ),
        //price: Yup.string().required(requiredMSG.price),
        nombre_personne: Yup.number().min(1, requiredMSG.nombre_personne).required("Il doit s'agir d'un chiffre ou d'un nombre."),
    })
    return schema;
}