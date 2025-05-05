const mongoose = require("mongoose");


const articleSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        minLength: 3,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                // Verifier que le texte possède max 50 mots
                if(v.trim().length < 1 || !v) return false;
                return v.trim().split(/\s+/).length <= 50;
            },
            message: () => `La description doit avoir aux maximum 50 mots.`
        },
        required: true
    },
    ingredients: [{
        quantite: {
            type: Number,
            required: true,
        },
        ingredient: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        unit: {
            type: String,
            required: true,
        }
    }],
    article: {
        type: String,
        required: true,
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
    }],
    time: {
        type: Number,
        required: true,
    },
    media: {
        fieldname: {type: String, required: true},
        path: {type: String, required: true},
        originalname: {type: String, required: true},
        filename: {type: String, required: true},
        mimetype: {type: String, required: true},
        size: {type: Number, required: true}
    },
    price: {
        type: String,
        required: true,
    },
    nombre_personne: {
        type: Number,
        required: true
    },
    meta: {
        visited: {
            type: [{
                ip: {
                    type: String,
                    required: true
                },
                id: {
                    type: Number,
                    default: null
                },
                timestamps: {
                    visitedAt: Date,
                },
            }], 
            default: []
        },
        comment: {
            type: Number,
            default: 0
        },
        shared: {
            type: Number,
            default: 0
        },
        voted: {
            type: [{
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                rate: {
                    type: Number,
                    default: 0
                },
                timestamps: {
                    visitedAt: Date,
                },
            }], 
            default: []
        },
    }
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

articleSchema.pre("save", function(next){
    const article = this;
    if(article.isModified()){
        article.updatedAt = new Date();
    }
    next();
})

articleSchema.pre("updateOne", function(next){
    const article = this;
    article.set({ updatedAt: new Date() });
 
    next();
})

module.exports = mongoose.model("Article", articleSchema)