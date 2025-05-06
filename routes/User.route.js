const express = require('express')
const { userRegistation } = require('../controller/user.Controller')
const router = express.Router()



router.post('/registation',userRegistation)

module.exports = router