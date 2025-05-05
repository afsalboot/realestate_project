const express = require('express');
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const cookieParser = require('cookie-parser');


const authRoute = require('./routes/auth.route');
const testRoute = require('./routes/test.route');
const userRoute = require('./routes/user.route');

app.use(cors({ origin:process.env.CLIENT_URL, credentials:true }))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err.message)
})


app.use('/api/auth',authRoute)
app.use('/api/test',testRoute)
app.use('/api/users',userRoute)

app.listen(4000,()=>{
    console.log("server is running!")
})