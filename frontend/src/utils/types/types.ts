export interface AxiosErrorType{
    response?: {
        data?: {
            message?: string | undefined;
        }
    }
}

export interface AxiosResponseType {
    message?: string
}

export interface isAuthStore {
    isAuth: User | null,
    setIsAuth: (data: User) => void
    checkAuth: () => Promise<void>
}
export interface CommentsStore {
    comments: CommentData[] | null;
    setComments: (data: CommentData[] | ((prev: CommentData[] | null) => CommentData[])) => void; //pour modifier un etat avec zustand grace a une fonction
}

export interface Form {
    email: string;
    password: string;
    remember: boolean;
}

interface Image {
    fieldname: string;
    path: string;
    originalname: string;
    filename: string;
    mimetype: string;
    size: number;
}

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    profile_image_path: Image;
    role: string;  
    birthdate: Date | null;
}

export interface Tag {
    _id: string;
    tag: string;
}

export interface Tags {
    label: Tag['tag'];
    value: Tag['_id'];
}

export interface Ingredients{
    quantite: number;
    ingredient: string;
    unit: "g"|"kg"|"cl"|"L"|"pièce(s)"
}

export interface Media {
    fieldname?: "media" | string;
    path: string;
    originalname: string;
    filename: string;
    mimetype: string;
    size: number;
}
interface Voted {
    user_id: string;
    rate: number;
}
interface Visited {
    id: string;
    ip: string;
}

export interface Meta {
    visited?: Visited[];
    rating?: number;
    voted?: Voted[];
    comment?: number;
    shared?: number;
}

export interface Article {
    _id: string;
    user_id: string;
    title: string;
    description: string;
    ingredients: Ingredients[]
    article: string;
    tags: string[];
    TagsName: string[];
    time: number;
    media?: Media;
    price: string;
    nombre_personne: number;
    meta: Meta;
    created_at: Date;
    updated_at: Date;
    userId?: User[];
    averageRate?: number | null
}

interface CommentDocument {
    user: User;
    _id: string;
    edit: Boolean;
    article_id: string;
    user_id: string;
    content: string;
    reply_to: string;
    created_at: Date;
    updated_at: Date;
    replied_comments?: CommentDocument[];
}

export interface CommentData {
    document :  CommentDocument;
}

export interface CommentData2 {
    user: User;
    _id: string;
    edit: Boolean;
    article_id: string;
    user_id: string;
    content: string;
    reply_to: string;
    created_at: Date;
    updated_at: Date;
    replied_comments?: CommentDocument[];
}