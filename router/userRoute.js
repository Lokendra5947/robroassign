const express = require('express')
const { Registration, login, createUser, updateUser, deleteUser } = require('../Controller/userController')
const verifyToken = require('../middleware/jwtVerify')
const userRoutes = express.Router()
userRoutes.delete("/delete/:id",verifyToken,deleteUser)
// user Register
userRoutes.post('/userRegister',Registration)
// Admin login
userRoutes.post('/login',login)
// route for creating new user by admin 
userRoutes.post('/create',verifyToken,createUser)
// route for update user by admin 
userRoutes.put("/update/:id",verifyToken,updateUser)
// route for delete  user by admin 
userRoutes.delete("/delete/:id",verifyToken,deleteUser)



module.exports = {userRoutes}