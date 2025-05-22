const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const app = express()

const authRoute = require('./routes/auth.route');
const testRoute = require('./routes/test.route');
const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');

app.use(cors({ origin:process.env.CLIENT_URL }))
app.use(express.json())


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err.message)
})


app.use('/api/auth',authRoute)
app.use('/api/test',testRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)

app.listen(4000,()=>{
    console.log("server is running!")
})