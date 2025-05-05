const Article = require("../models/Article");
const mongoose = require("mongoose");

async function index(req, res){ 
    const { id } = req.params
    console.log(req.params);
    const page = req.query.page || 1;
    const articlesPerPage = parseInt(process.env.ARTICLES_PER_PAGE) || 25;
    // Aggrège les modeles liés à l'article matché à l'id du user. Lookup permet le matching et on projet la structure que l'on souhaite 
    try {
        const [articles] = await Article.aggregate([

        {  
            $match: { user_id: new mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: "tags",
                localField: "tags", 
                foreignField: "_id",
                as: "TagsName"
            }
            
        },{
            $project:{
                _id: 1,
                user_id: 1,
                title: 1,
                description: 1,
                ingredients: 1,
                article: 1,
                tags: 1,
                time: 1,
                media: 1,
                price: 1,
                nombre_personne: 1,
                meta: 1,
                created_at: 1,
                updated_at: 1,
                TagsName: {
                    $map: {
                        input: "$TagsName",
                        as: "tag",
                        in: "$$tag.tag"
                    }
                },
            }
        },
        {
            $sort: {
                created_at: -1
            }
        },{
            $facet: {
                total: [{ $count: "count" }],  // Compter tous les articles
                paginatedResults: [
                    { $skip:  (page - 1) * articlesPerPage }, // Évite les erreurs avec un page négatif
                    { $limit: articlesPerPage }
                ],
            }
        }   
    ]);

    res.status(201).json(articles);
    }catch(err){
        res.status(401).json({message: "Il y a eu un problème lors de la récupération de vos articles. Rééssayez plus tard."})
    }  
}


module.exports = {
    index,
}