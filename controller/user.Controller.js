const UserModel = require("../models/User.Model")
const generateRefreshToken = require("../utlitis/generateRefreshToken")
const generateAccessToken = require("../utlitis/generateRefreshToken")


exports.userRegistation = async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name?.trim() || !email?.trim() || password?.trim()){
            return res.status(400).json({
                message:"provied name email and password"
            })
        }
        const findexsiting = await UserModel.findOne({email})
        if(findexsiting){
            return res.status(402).json({
                message:"Email Already Exsting"
            })
        }
        const hashpassword = await bcrypt.hash(password,10)
        const newUser = new UserModel({
            name,
            email,
            password:hashpassword
        })
        const saveUserInfo = await newUser.save()
        return res.status(200).json({
            message:"user registaiton successfully done ",
            error:false,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message|| error,
            error:true,
            success:false
        })
    }
}


exports.loginController = async(req ,res)=>{
    try {
        const {email,password} = req.body
        if(!email?.trim() || !password?.trim()){
            return res.status(400).json({
                message:"provied email and password"
            })
        }

        const findUser = await UserModel.findOne({email})
        if(!findUser){
            return res.status(401).json({
                message:"user can not find "
            })
        }
        const checkPassword = await bcrypt.compare(password,findUser.password)
        if(!checkPassword){
            return res.status(403).json({
                message:"password not match "
            })
        }


        const accessToken = await generateAccessToken(findUser._id)
        const refreshToken = await generateRefreshToken(findUser._id)

        const cookieOption = {
            httpOnly :true,
            secure : true,
            sameSite: 'None'
        }
        res.cookie("accessToken",accessToken,cookieOption);
        res.cookie("refreshToken",refreshToken,cookieOption);
        const saveRefreshCookie = await UserModel.findByIdAndUpdate(findUser._id,{refresh_token:refreshToken})

        return res.status(200).json({
            message: "Login successfully ",
            error:false,
            success:true,
            data:{
                findUser,
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}