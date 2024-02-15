const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Supervisor', 'Worker'], default: 'Admin' },
    adminProvidedPassword: { type: Boolean, default: false }
});
const userModel = mongoose.model("user",userSchema)
module.exports = {userModel}

// module.exports = mongoose.model('User', userSchema);


// const userSchema = new mongoose.Schema({
//     username:{type:String, required:true, },
//     passward:{type:String, required:true},
//     role: { type: String, enum: ['Admin', 'Supervisor', 'Worker'], default: 'Admin' },
//     isAdmin: { type: Boolean, default: false }
// })