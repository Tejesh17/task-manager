const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express();

const port = process.env.PORT || 3000
app.use(express.json())

const userRoute = require('./routers/userRoute')
app.use(userRoute)

const taskRoute = require('./routers/taskRoute')
app.use(taskRoute)


app.listen(port, ()=>{
    console.log("server is up on port "+ port)
})