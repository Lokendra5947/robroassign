const express  = require("express")
const { userRoutes } = require("./router/userRoute")
let app = express() 
PORT = process.env.PORT
require("./helper/dbConnection")
app.use(express.json())
app.use("/user",userRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT} `)
})