const Article = require("../models/Article");

async function findArticle(id){
    console.log("my ID", id)
    const article = await Article.findById(id);
    if (!article) {
        throw new Error("Article not found");
    }
    return article;
}

async function create(form){
    try {
        const article = new Article(form);
        await article.save();  
        return true;
    } catch(err){
        console.log(err.message)
        throw new Error("Une erreur est survenue lors de la création de l'article.")
    }
    
}

async function modify(form){
    try {
        console.log(form.id, form, "FORM")
        const article = await findArticle(form.id)
        await article.updateOne({$set: form})
        return true;
    } catch(err){
        console.log(err.message)
        throw new Error("Une erreur est survenue lors de la modification de l'article.")
    }
}

module.exports = {
    create,
    modify,
};