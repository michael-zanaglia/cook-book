const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    edit: {
        type: Boolean,
        default: false,
    },
    reply_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    article_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    }
    },{
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

commentSchema.pre("save", function(next){
    const comment = this;
    if(comment.isModified() && comment.content !== "" && !comment.isNew){
        comment.edit = true;
    }
    next();
})

module.exports = mongoose.model("Comment", commentSchema);