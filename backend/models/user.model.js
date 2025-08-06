import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        immutable: true,
        required: true,
    }, 
    email: {
        type: String, 
        required: true
    },
    avatar: {
        type: String, 
        required: false,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;