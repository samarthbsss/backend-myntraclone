const jwt= require('jsonwebtoken');
require('dotenv').config();


const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.send("please login")
    }
    jwt.verify(token, process.env.secretKEY, function(err, decoded) {
        const {userID} = decoded
        req.userID = userID
        if(decoded){
            next()
        }
        
        else{
            res.send("Please login")
        }
      });   
}

const authorise = (permittedRoleArray) => {
    return  async (req, res, next) => {
    const user = await Usermodel.findOne({_id : req.userID})
    const userrole = user.role
    if(permittedRoleArray.includes(userrole)){
        next()
    }
    else{
        res.send("you are not authorised")
    }
}}


module.exports ={
    authenticate,
    authorise
}