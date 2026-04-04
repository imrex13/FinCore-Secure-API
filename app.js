require('dotenv').config();
const express = require('express');
const helmet = require('helmet');


const connectDB = require('./config/db');

const app = express();

const authRouter = require("./routes/auth_router")
const adminRouter = require("./routes/admin_router");
const router = require("./routes/router");
connectDB();

app.use(express.json());
app.use(helmet());


// Using Routers
app.use(authRouter)
app.use(authRouter);
app.use(adminRouter);
app.use(router);



// Routes come here later
app.get('/', (req, res) => {
    
    try {
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json(error);
    }
})


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});