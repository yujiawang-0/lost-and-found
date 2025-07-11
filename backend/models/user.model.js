import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        immutable: true,
        required: true,
        unique: true
    }, 
    password : {
        type: String, 
        required: true
    },
    contact : {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: false,
    }
});

const User = mongoose.model('User', userSchema);

export default User;