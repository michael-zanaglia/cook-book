import { Article, Ingredients, User } from "@/utils/types/types";

interface IframeArticleProps {
    content?: Article | any;
    isAuth?: User | null
}
const IframeArticle: React.FC<IframeArticleProps> = ({content, isAuth}) => (
    <iframe 
        width={'100%'} 
        height={"100%"} 
        style={{borderRadius: '5px'}} 
        srcDoc={
                ` <html>
                <head>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
                    <style>
                        body {
                            background-color: #292929;
                            color: #f5f5f5;
                            border: 1px solid #f5f5f5;
                            border-radius: 5px;
                            padding: 3%;
                        }
                        h1, h2, h3 {
                            font-weight: 400;
                        }
                        h4, h5 {
                            font-weight: 300;
                            font-style: italic;
                        }
                        *{
                        font-family: 'Poppins', sans-serif;
                        border-box: none;
                        }
                        .header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }
                        .flex-column-start {
                            display: flex;
                            flex-direction: column;
                            justify-content: start;  
                            align-items: start; 
                        }
                        .flex-column-center {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;   
                        }
                        .ql-align-center{
                            text-align: center;
                        }
                        .ql-align-right {
                            text-align: right;
                        }
                        strong {
                            font-weight: 550;
                        }
                        .italic {
                            font-style: oblique;
                        }
                        .no-margin {
                            margin: 0;
                        }
                        .full, p img {
                            max-width: 100% !important; 
                        }
                        .banniere, p img {
                            height: 350px;
                            width: 100%;
                            object-fit: cover;
                        }
                    </style>
                </head>
                <body>
                        <main>
                        <div class='header full'>
                                <div>
                                    <h1 class='no-margin'>${content?.title}</h1>
                                    <span class='italic'> Temps de préparation ${content?.time} min</span>
                                </div>
                                <div >
                                    <span>Recette pour ${content?.nombre_personne} personne(s)</span>
                                    <p class='no-margin ql-align-right'>${content?.price}</p>
                                </div>
                        </div>
    
                            <h4>${content?.description}</h4>
                            <div class='full'>
                                <img class='banniere full' src=${content?.media instanceof File ? URL.createObjectURL(content?.media) : `http://localhost:3000/${content?.media.path}`} />
                            </div>
                            <div class='flex-column-start'>
                                <h3>Ingrédients</h3>
                                <div class='list'>
                                ${content?.ingredients.map((item: Ingredients) => `
                                    <div>
                                        •
                                        <span>${item.quantite} ${item.unit} -</span>
                                        <span>${item.ingredient}</span>
                                    </div>
                                `).join('')}
                                </div>
                            </div>
                        
                            <div class='flex-column'>${content?.article}</div>
                        
                            <h5>ー Publié par ${isAuth?.firstname} ${isAuth?.lastname} le ${new Date().toLocaleString("fr-FR")}</h5>
                        </main>
                </body>
                </html>`
        } 
    />
)

export default IframeArticle