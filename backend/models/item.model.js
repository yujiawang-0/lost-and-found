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
            'Electronics', 'Wallet', 'Matriculation Card', 'Bag', 'Stationery', 'Clothing'
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
        type: String,
        enum: [
            'COM1', 'COM2', 'COM3', 'SoC', 'LT19',
            'Science', 'S16', 'S17', 'LT27', 'LT28',
            'Engineering', 'E1', 'E2', 'E3',
            'Business School', 'BIZ1', 'BIZ2',
            'FASS', 'AS1', 'AS2', 'AS3', 'AS4',
            'Law (BTC)', 'Medicine', 'Duke-NUS',
            'SDE1', 'SDE2', 'SDE4', 'Music Conservatory',
            'UTown', 'Cinnamon', 'Tembusu', 'RC4', 'CAPT', 'Yale-NUS',
            'PGP', 'Ridge View', 'Eusoff', 'Temasek', 'Sheares', 'KR Hall', 'KE Hall', 'Raffles Hall',
            'The Deck', 'Frontier', 'Techno Edge', 'Fine Food', 'Food Clique', 'PGP Canteen', 'YIH Food Court', 'Flavours@UTown',
            'Central Library', 'YIH', 'NUS Co-op', 'UCC', 'NUH', 'Sports Centre', 'UTown Green', 'Cannot Remember'
        ],
        required: true,
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