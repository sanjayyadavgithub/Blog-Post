const express = require('express');
const route = express.Router();
const { createBlog, getAllBlog, getBlogById, updateBlogById, deleteBlogById } = require('../controller/blogController')

route.post('/create',createBlog)
route.get('/getAll',getAllBlog)
route.get('/blog/:id',getBlogById)
route.put('/blog/:id',updateBlogById)
route.delete('/blog/:id',deleteBlogById)

module.exports = route;