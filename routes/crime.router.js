const express = require('express')
const { crimeController } = require('../controller/crime.Controller')
const upload = require('../middleware/multer')
const router = express.Router()

router.post('/createcrimedata',upload.single("image"),crimeController)


module.exports = router