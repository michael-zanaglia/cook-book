const Tag = require("../models/Tag");

async function get(){
    return await Tag.find({hidden : {$ne: 0}});
}

async function associate(body){
    const { price, time } = body;
    const hiddenTags = await get();

    const cheapTagId = hiddenTags.find(tag => tag.tag === 'cheap')?._id.toString()
    const fastTagId = hiddenTags.find(tag => tag.tag === 'fast')?._id.toString()

    body.tags = body.tags.filter(tag => tag !== cheapTagId && tag !== fastTagId )

    if(["€", "€€"].includes(price)){
        body.tags = [...(body.tags || []), cheapTagId]
    }
    if(time < 20){
        body.tags = [...(body.tags || []), fastTagId] 
    } 
    return body
}

module.exports = {
    get,
    associate,
}