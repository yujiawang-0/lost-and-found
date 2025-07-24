import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'
import express from 'express';
import { connectDB } from './config/db.js';
import foundItemRoute from "./routes/foundItemRoute.js";
import lostItemRoute from "./routes/lostItemRoute.js";
import rateLimiter from "./middleware/rateLimiter.js"


const app = express();
const PORT = process.env.PORT || 8081;


//middleware -- function that occurs in the middle between the request and the response
app.use(express.json()); // this middleware will parse the json bodies: requ.body

//CORS
app.use(cors({
    origin:"http://localhost:5173"
}));

// rate limiting
app.use(rateLimiter);

// our simple custom middleware: console log for api use
app.use((req, res, next) => {
    console.log(`Request method is ${req.method} & Request URL is ${req.url}`);
    next();
});

// authentication check middleware to be added here





app.use("/lost", lostItemRoute);
// take all the routes defined in lostItemRoute and mount them at the path /lost
app.use("/found", foundItemRoute);

app.get("/", (req, res) => {
    res.send("Server is ready");
})

// console.log(process.env.MONGO_URI); // don't need this to show

// connect to the database first then listen on the port
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server started at PORT:', PORT); //http://localhost:5000');
    });
});

