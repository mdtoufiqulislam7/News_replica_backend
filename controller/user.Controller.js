const UserModel = require("../models/User.Model")


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