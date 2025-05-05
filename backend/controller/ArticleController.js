const ArticleActions = require("../actions/ArticleActions");
const HiddenActions = require("../actions/HiddenTagsActions");
const mongoose = require("mongoose")
const Tag = require("../models/Tag");
const Article = mongoose.model('Article')

async function store(req, res){
    try{
        
        const body = req.body;
        const file = req.file;
        const updateBody = await HiddenActions.associate(body)
        const form = {
            ...updateBody,
            media : file
        }

        const response = await ArticleActions.create(form)
        if(!response) throw new Error("Une erreur lors de la publication de l'article est survenue")
        
        return res.status(201).json({message: "L'article a été posté !"})
    } catch(err) {
        console.log("Erreur lors de la publication")
        return res.status(401).json({message: err.message})
    }
    
}

async function index(req, res){
    //Pour Atlas $search: {
    //     text: {
    //         query: search,
    //         path: ["title", "description", "ingredients", "article"]
    //     }
    // }
    const page = req.query.page || 1;
    const articlesPerPage = parseInt(process.env.PER_PAGE) || 12;
    const order =  parseInt(req.query.order) || -1;
    const terms = req.query.search?.trim() || null;
    const time =  parseInt(req.query.time) || null;
    const pipeline = [];
    try{
        
        if (terms) {
            pipeline.push({
                $match: {
                    $text: {$search: terms}     
                }
                
            });
        }

        pipeline.push(
            {
                $lookup: {
                    from: "tags",
                    localField: "tags", 
                    foreignField: "_id",
                    as: "TagsName"
                }
            });

        if (time) {
            pipeline.push({
                $match: { time: { $lte: time } }
            });
        }

        pipeline.push(
           {
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
                        }
                    }
            },{
                $sort: {
                    created_at: order
                }
            },{
                $skip: (page-1) * articlesPerPage
            },{
                $limit: articlesPerPage
            }
        )
        const articles = await Article.aggregate(pipeline);
                
        if(articles?.length < 0) throw new Error("Une erreur lors de la publication de l'article est survenue.");
        
        return res.status(201).json(articles)
    } catch(err) {
        console.log("Erreur lors de la publication")
        return res.status(401).json({message: err.message})
    }
    
}

async function edit(req, res){
    const { id } = req.params;
    const pipeline = [];
    try {
        // Matcher avec l'id de l'article
        const objectId = new mongoose.Types.ObjectId(id);
        pipeline.push({
            $match: {
                _id: objectId
            }
        });

        // Récupérer les infos des tags puisqu'ils sont typés comme ca string[]
        pipeline.push({
            $lookup: {
                from: "tags",
                localField: "tags",
                foreignField: "_id",
                as: "tags"
            }
        });
        // Transformation des tags : ne conserver que les tags non cachés
        // Filtre les tags avec 'hidden: 0' puis extrait uniquement leurs identifiants
        // Résultat : un tableau simplifié contenant uniquement les _id des tags visibles
        pipeline.push(
            {
                $addFields: {
                    tags: {
                        $map: {
                            input: {
                                $filter: {
                                    input: "$tags",
                                    as: "tag",
                                    cond: { $eq: ["$$tag.hidden", 0] }
                                }
                            },
                            as: 'tag',
                            in: "$$tag._id"
                        }
                        
                    }
                }
            },
        )
        pipeline.push({
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "userId"
            }
        });
        // Je recupere tous les champs du modèle
        pipeline.push({
            $project: {
                document : "$$ROOT",
            }
        })

        //Puisque j'ai uniquement 1 seul articl, je n'ouvlie pas de l'extraire de mon array
        const [article] = await Article.aggregate(pipeline);
        if(!article) throw new Error(`L'article n'existe pas.`) 
        
        return res.status(201).json(article.document)
    } catch(err) {
        return res.status(401).json({message: err.message})
    }
    
}

async function show(req, res){
    const { id } = req.params;
    const visitorIp = req.ip;
    console.log(req.user, "hey")
    const pipeline = [];
    try {
        const foundArticle = await Article.findById(id);
        const isVisited = foundArticle.meta.visited.some((visit)=> visit.ip===visitorIp)

        if(!isVisited){
            const newVisitor = {
                ip: visitorIp,
                id: null,
                visitedAt: new Date()
            } 
            foundArticle.meta.visited.push(newVisitor)
            await foundArticle.save();
        }
        
        
        // Matcher avec l'id de l'article
        const objectId = new mongoose.Types.ObjectId(id);
        pipeline.push({
            $match: {
                _id: objectId
            }
        });

        // Récupérer les infos des tags puisqu'ils sont typés comme ca string[]
        pipeline.push({
            $lookup: {
                from: "tags",
                localField: "tags",
                foreignField: "_id",
                as: "tags"
            }
        });
        // Transformation des tags : ne conserver que les tags non cachés
        // Filtre les tags avec 'hidden: 0' puis extrait uniquement leurs identifiants
        // Résultat : un tableau simplifié contenant uniquement les _id des tags visibles
        pipeline.push(
            {
                $addFields: {
                    tags: {
                        $map: {
                            input: {
                                $filter: {
                                    input: "$tags",
                                    as: "tag",
                                    cond: { $eq: ["$$tag.hidden", 0] }
                                }
                            },
                            as: 'tag',
                            in: "$$tag._id"
                        }
                        
                    }
                }
            },
        )
        pipeline.push({
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "userId"
            }
        });
        // Je recupere tous les champs du modèle
        pipeline.push({
            $project: {
                document : {
                    $mergeObjects: [
                        "$$ROOT", 
                        {"averageRate": {$avg: "$meta.voted.rate"} },
                    ] 
                }
            }
        })

        //Puisque j'ai uniquement 1 seul articl, je n'ouvlie pas de l'extraire de mon array
        const [article] = await Article.aggregate(pipeline);
        if(!article) throw new Error(`L'article n'existe pas.`) 
        
        return res.status(201).json(article.document)
    } catch(err) {
        return res.status(401).json({message: err.message})
    }
    
}

async function update(req, res){
    try{
        const body = req.body;
        const file = req.file;
        const updateBody = await HiddenActions.associate(body)
        const form = {
            ...updateBody,
            media : file
        }

        const response = await ArticleActions.modify(form)
        if(!response) throw new Error("Une erreur lors de la publication de l'article est survenue")
        
        return res.status(201).json({message: "L'article a bien été modifié !"})
    } catch(err) {
        console.log("Erreur lors de la publication")
        return res.status(401).json({message: err.message})
    }
}

async function remove(req, res){
    const { id } = req.params;
    try{
        const article = await Article.findByIdAndDelete(id);
        if(!article) throw new Error(`L'article n'existe pas.`) 
        
        return res.status(201).json({message: "L'article a bien été supprimé !"})
    } catch(err) {
        return res.status(401).json({message: err.message})
    }
}

async function rate(req, res) {
    const {userId, id, rate} = req.body;
    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: "Article non trouvé" });
        }

        const existedVote = article.meta.voted.find((voted) => voted.user_id.toString() === userId)
        
        if(existedVote){
            existedVote.rate = parseFloat(rate)*2;
        } else {
            article.meta.voted.push({
                user_id: userId,
                rate: parseFloat(rate)*2
            })
        }

        await article.save(); 
        return res.status(201).json({message: true})
    }catch(err){
        return res.status(401).json({message: err.message})
    }
}

module.exports = {
    store,
    index,
    show,
    update,
    remove,
    edit,
    rate
}