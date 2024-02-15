const jwt = require("jsonwebtoken")
let verifyToken = async (req, res, next) => {
  try {
    // console.log(req.headers.token)
    let token = req.headers.token
    if (!token) {return res.status(400).send({ success: false, message: "Token not found" });}
    var decoded = await jwt.verify(token,process.env.secretKey)
    if(!decoded) {return res.status(400).send({ success: false, message: "Login Please" })}
    req.userId  = decoded.user._id
    // console.log((decoded))
    next();
  } catch (error) {
    res.status(400).send({ success: false, message: "Crashed Token" })
  }
};
module.exports = verifyToken;

