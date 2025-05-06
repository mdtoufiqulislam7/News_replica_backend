const crimeNews = require('../models/crime.News')
const uploadImageCloudnary = require('../utlitis/uploadImage')

exports.crimeController = async(req,res)=>{
    try {
        const {title,description,tegs,category} = req.body
        if(!title?.trim() || !description?.trim() || tegs?.trim() || category?.trim() ){
            return res.status(401).json({
                message:"provied all fields please",
                error:true,
                success:false
            })
        }
        let image_url = ''
        if(req.file){
            const uploadImage = await uploadImageCloudnary(req.file)
            image_url = uploadImage.secure_url;
        }
        const newCrimeNews = new crimeNews({
            title,
            description,
            tegs,
            category,
            image:image_url
        })
        const saveCrimenewsData = await newCrimeNews.save()
        return res.status(200).json({
            message:"Save Successfully Done",
            data:saveCrimenewsData,
            error:false,
            success:true
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}