const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const User = require('../models/User');

async function store(req, res){
    const body = req.body;
    try {
        const response = await Comment.create(body)
        const user = await User.findById(req.body.user_id)
        if(!response || !user) throw new Error("Il y a eu une erreur lors de la publication du commentaire")
        return res.status(201).json({...response.toObject(), user: user })
    } catch(err){
        return res.status(401).json({message: err.message})
    }
}


async function show(req, res){
    const { id } = req.params;
    const page = req.query.page || 1;
    const commentsPerPage = 25;
    const order = -1;
    const pipeline = [];

    try {
        pipeline.push({
            $match: {
                article_id: new mongoose.Types.ObjectId(id),
                reply_to: null
            }
        })
        pipeline.push({
            $lookup: {
                from: "users",
                localField: "user_id", 
                foreignField: "_id",
                as: "user"
            }
        })
        pipeline.push({
            $lookup: {
                from: "comments",
                let: {id: "$_id"}, 
                pipeline: [
                    {
                        $match: {
                            $expr: {$eq: ["$reply_to", "$$id"]}
                        }
                    }, {
                        $lookup: {
                            from: "users",
                            localField: "user_id", 
                            foreignField: "_id",
                            as: "user"
                        }
                    },{
                        $unwind: {
                            path: "$user",
                            preserveNullAndEmptyArrays: true // Garde les documents même si aucun utilisateur trouvé
                        }
                    }
                ],
                as: "replied_comments"
            }
        })
        pipeline.push({
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true // Garde les documents même si aucun utilisateur trouvé
            }
        });        
        pipeline.push({
            $sort: {
                created_at: order
            }
        })
        pipeline.push({
            $skip: (page-1) * commentsPerPage
        })
        pipeline.push({
            $limit: commentsPerPage
        })
        pipeline.push({
            $project: {
                document: "$$ROOT"
                
            }
        })

        const comments = await Comment.aggregate(pipeline);
        if(!comments) throw new Error("Commentaires introuvable")
        return res.status(201).json(comments)  
    } catch(err) {
        return res.status(401).json({message: err.message})  
    }
    
}

async function update(req, res){
    const { content, commentId } = req.body
    try{
        const comment = await Comment.findById(commentId)
        if(!comment) throw new Error("Commentaires introuvable")
        comment.content = content;
        await comment.save();
        return res.status(201).json({success: true});
    }catch(err){
        return res.status(401).json({success: false, message: err.message});
    }
    
}

module.exports = {
    store,
    show,
    update
}