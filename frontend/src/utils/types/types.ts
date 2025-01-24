export interface AxiosError{
    response?: {
        data?: {
            message?: string | undefined;
        }
    }
}
export interface Form {
    email: string;
    password: string;
}

interface Image {
    path: string;
    filename: string;
    type: string;
}

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    profile_image_path: Image;
    role: string;  
}