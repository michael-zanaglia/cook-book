const mongoose = require('mongoose')
const SALT = parseInt(process.env.SALT);
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(SALT)
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minLength: [3, 'Prénom trop court !'],
        required: true,
        lowercase: true
    },
    lastname: {
        type: String,
        minLength: [3, 'Nom trop court !'],
        required: true,
        lowercase: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
        unique: [true, 'Un utilisateur utilise deja cet email.'],
        lowercase: true
    },
    password: {
        type: String,
        minLength: [8, 'Le mot de passe doit avoir minimum 8 caractères.'],
        validate: {
            validator: function (v) {
                // Exemple : vérifier que le mot de passe contient au moins une lettre majuscule, un chiffre et un caractère spécial
                return /[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v) && /[!@#$%^&*(),.?":{}|<>-]/.test(v);
            },
            message: () => `Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial.`
        }
    },
    remember_token: {
        type: String,
        default: null
    },
    profile_image_path: {
        fieldname: {type: String, required: true, default: 'media'},
        path: {type: String, required: true, default: 'uploads/default.jpg'},
        originalname: {type: String, required: true, default: 'default.jpg'},
        filename: {type: String, required: true, default: 'default.jpg'},
        mimetype: {type: String, required: true, default: 'image/jpg'},
        size: {type: Number, default: 1000}
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


userSchema.virtual("confirm_password") // Vérifier les mdp du formulaire d'inscription
    .set(function(value){
        this._confirm_password = value
    })
    .get(function(){
        return this._confirm_password
    })

userSchema.pre('save', function(next){
    this.updatedAt = new Date();
    const user = this;  
    if(user.isModified('password')){ //Effectue la suite du script si je touche au password, la premiere fois il l'executera puisaue le champs est vide
        if(user.password !== user._confirm_password){
            return next(Error("Les mots de passe ne correspondent pas !"))
        }
        user.password = bcrypt.hashSync(user.password, salt);
    }
    next();
})


module.exports =  mongoose.model("User", userSchema);