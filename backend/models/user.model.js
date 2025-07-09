import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }, 
    faculty: {
        type: String,
        enum: [
            'Faculty of Arts and Social Sciences',
            'Faculty of Science',
            'College of Design and Engineering',
            'School of Computing',
            'NUS Business School',
            'Faculty of Law',
            'Yong Loo Lin School of Medicine',
            'Faculty of Dentistry',
            'Yong Siew Toh Conservatory of Music',
            'Lee Kuan Yew School of Public Policy',
            'Duke-NUS Medical School',
        ],
        required: false,
    }, 
    accommodation: {
        type: String, 
        enum: [
            'Tembusu', 'RC4', 'CAPT', 'RVRC','Yale-Nus', 'PGPR', 'UTR', 
            'Eusoff Hall', 'Kent Ridge Sheares Hall', 'KE VII Hall', 'Raffles Hall', 
            'Sheares Hall', 'Temasek Hall'
        ],
        required: false,
    }

});

const User = mongoose.model('User', userSchema);

export default User;