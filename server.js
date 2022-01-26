require('dotenv').config({ path: "./config.env" })
const express = require('express')
const mongoose = require('mongoose');
const cors=require("cors");

mongoose.connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.log('MongoDB Connection Failed!'))


const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}




const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/folder', require('./routes/folder'));

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`)
);

