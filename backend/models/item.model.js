import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String, 
        required: true,      
    },
    image: {
        type: String, 
        required: false,
    }, 
    category: {
        type: String,
        enum: [
            'Electronics', 
            'Wallet', 
            'Identification Documents', 
            'Keys', 
            'Bag', 
            'Stationery', 
            'Clothing', 
            'Jewellery', 
            'Accessories', 
            'Sports Equipment', 
            'Eyewear', 
            'Footwear', 
            'Toys', 
            'Pet Items',
            'Cash', 
            'Travel Documents', 
            'Household Items', 
            'Others'
        ],
        required: false,
    },
    status: {
        type: String, 
        enum: ['lost', 'found'],
        required: true,
        immutable: true
    },
    location: {
        type: {
            type: String, 
            enum: ['Point'], 
            required: false
        }, 
        coordinates: {
            type: [Number], 
            required: false
        }, 
        address: {
            type: String
        }
    }, 
    dateLost: {
        type: Date, 
        required: false,
    }, 
    dateFound: {
        type: Date, 
        required: false,
    }
    }, {
        timestamps: true 
    });

    const Item = mongoose.model('Items', itemSchema);

    export default Item;