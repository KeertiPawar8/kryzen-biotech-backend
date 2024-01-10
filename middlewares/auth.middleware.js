const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {

  let token  = req.headers.authorization.split(" ")[1]
  console.log(token);

  if (!token) {
    return res.send({ message: "please login first" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userID = decoded.userID;
 console.log(decoded.userID);
 console.log(req.body.userID);
      next();
    } catch (err) {
      res.send({ message:err });
    }
  }
};

module.exports = {
  authenticate,
};
