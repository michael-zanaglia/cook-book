const User = require('../models/User');

async function create(data){
    try {
        const user = new User(data)
        user.confirm_password = data.confirm_password;
        await user.save()
    } catch (err) {
        console.error(err.message)
    }
    
}

module.exports =  {
    create
};