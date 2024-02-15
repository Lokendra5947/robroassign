const { userModel } = require("../model/userModel")
const { hashPassword, matchPassward } = require("../helper/hashPassword")
const jwt = require("jsonwebtoken")
// admin creation
const createAdmin = async () => {
    try {
      const adminExists = await userModel.findOne({ role: 'Admin' });
      if (!adminExists) {
        const username = 'admin';
        const password = 'admin123';
        let hashhedPassword= await hashPassword(req.body.password)
        await User.create({ username, password: hashhedPassword, role: 'Admin' });
      }
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  };

 const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(404).send('User not found');
      }
      const validPassword = await matchPassward(password, user.password);
      if (!validPassword) {
        return res.status(401).send('Invalid password');
      }
      const token = jwt.sign(user, process.env.secretKey);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error logging in');
    }
  }

//   create user (Admin Only)
const createUser  = async (req, res) => {
    try {
      const { username, password, role } = req.body;
      let hashhedPassword= await hashPassword(password)

      const user = new userModel({ username, password: hashhedPassword, role, adminProvidedPassword: true });
      await user.save();
      res.status(201).send('User created successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating user');
    }
  }

//  Update user (Admin Only) 
const updateUser  = async (req, res) => {
    try {
      const { username, password, role } = req.body;
      let hashhedPassword= await hashPassword(password)
      await User.findByIdAndUpdate(req.params.id, { username, password: hashhedPassword, role });
      res.status(200).send('User updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating user');
    }
  }

  const deleteUser  = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send('User deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting user');
    }
  }
 module.exports = {Registration,login,createUser,updateUser,deleteUser,createAdmin}