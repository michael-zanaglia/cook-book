// interface IngredientsType {
//     quantite: number;
//     ingredient: string;
//     unit: string;
// }

interface YupMessageType {
        lastname?: string;
        firstname?: string;
        email?: string;
        birthdate?: string;
        password?: string;
        confirm_password?: string;
        customer_conditions?: string;
        min?: string;
        max?: string;
        email_pattern?: string;
        confirm_pattern?: string;
        title?: string;
        description?: string;
        article?: string;
        price?: string;
        ingredients?: string;
        tags?: string;
        media?: string;
        nombre_personne?: string;
        number?: string;
        comment?: string;
}
export const requiredMSG: YupMessageType = {
    lastname: 'Le nom est obligatoire.',
    firstname: 'Le prénom est obligatoire.',
    email: "L'adresse mail est obligatoire.",
    birthdate: 'La date de naissance est obligatoire.',
    password: 'Le mot de passe est obligatoire.',
    confirm_password: 'La confirmation du mot de passe est obligatoire.',
    customer_conditions: "Prenez le temps de lire les conditions d'utilisations avant de vous inscrire.",
    title: 'Un titre est obligatoire.',
    description: 'Une description est obligatoire.',
    article: 'Sans procédés personne ne comprendra votre recette !',
    price:'Le coût global est obligatoire.',
    ingredients: 'Ajouter un ingrédient est obligatoire.',
    tags: 'Pour un meilleur référencement ajouter un tag est obligatoire.',
    media: "Une photo d'illustration est obligatoire.",
    nombre_personne: 'Au moins une personne est requise.',
    comment: 'Vous ne pouvez pas poster de commentaire vide.'
}

export const lengthMSG: YupMessageType = {
    min: 'Trop court !',
    max: 'Trop long !'
}

export const email: YupMessageType = {
    email_pattern: 'Entrez un email valide.'
}

export const confirmPasswordMSG: YupMessageType = {
    confirm_pattern: 'Les deux mots de passe ne matchent pas.'
}

export const shouldBeNumberMSG: YupMessageType = {
    number: 'Uniquement les chiffres sont autorisées.'
}