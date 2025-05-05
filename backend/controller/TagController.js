const Tag = require("../models/Tag");



async function getCommon(req, res){
    try {
        const getMyTag = await Tag.find({hidden : {$ne : 1}});
        return res.status(201).json(getMyTag)  
    } catch(err) {
        return res.status(401).json({message: err.message})
    }
}

module.exports = {
    getCommon
};