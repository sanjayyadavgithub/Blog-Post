const Blog = require('../model/blogModel');

const createBlog = async(req,res) =>{
    try {
        const {title,description,image} = req.body;
        if(!title || !description || !image){
            res.status(400).send({ status: false, msg: "Please fill all th field...." })
        }
        const blog = new Blog({
            title,
            description,
            image
        })
        console.log("gj",blog)
        await blog.save();
        res.status(201).send({status:true,msg:'Blog Created Successfully....'})
        
    } catch (error) {
        res.status(500).send({ status: false, msg: "Something Went Wrong please try again..." })
    }
}


const getAllBlog = async(req,res) =>{
    try {
        const blogList = await Blog.find();
        if(!blogList){
            res.status(400).send({ status: false, msg: "Here have No Blog...." }) 
        }
        res.status(200).send({status:true, data:blogList,msg:'Get All the Blog Successfully'})
    } catch (error) {
        res.status(500).send({ status: false, msg: "Something Went Wrong please try again..." })
    }
}


const getBlogById = async(req,res) =>{
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id);
        if(!blog){
            res.status(400).send({ status: false, msg: "Here have No Blog for Id...." }) 
        }
        res.status(200).send({status:true, data:blog,msg:'Get the Blog Successfully'})
    } catch (error) {
        res.status(500).send({ status: false, msg: "Something Went Wrong please try again..." }) 
    }
}

const updateBlogById = async(req,res) =>{
    try {
        const {id} = req.params;
        const {title,description,image} = req.body;
        const updateBlog = await Blog.findByIdAndUpdate({_id:id},{title,description,image});
        res.status(200).send({status:true,msg:'Update blog Successfully'})
        
    } catch (error) {
        res.status(500).send({ status: false, msg: "Something Went Wrong please try again..." })
    }
}

const deleteBlogById = async (req,res) =>{
    try {
        const {id} = req.params;
        const deleteBlog = await Blog.findByIdAndDelete({_id:id})
        if(!deleteBlog){
            res.status(400).send({ status: false, msg: "Have Some Issues In delete Blog...." }) 
        }
        res.status(200).send({status:true,msg:'Delete blog Successfully'})
    } catch (error) {
        res.status(500).send({ status: false, msg: "Something Went Wrong please try again..." })
    }
}


module.exports = {
    createBlog,
    getAllBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById
}
