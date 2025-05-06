const jwt = require('jsonwebtoken')
const UserModel =require("../models/User.Model");
const generateRefreshToken = async(userId)=>{

    const token = await jwt.sign({id:userId},process.env.SECRET_KEY,{expiresIn:"7d"})
    const updateToken = await UserModel.updateOne({id:userId},{refresh_token:token})
    return token

}

module.exports = generateRefreshToken