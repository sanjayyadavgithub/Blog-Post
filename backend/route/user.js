const express = require('express');
const route = express.Router();
const {registerUser, loginUser, commentedUser} = require('../controller/userController')

route.post('/register',registerUser)
route.post('/login',loginUser)
route.post('/comment',commentedUser)

module.exports = route;