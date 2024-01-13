const User = require("../model/userModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Comment = require("../model/commentModel")

const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).send({ status: false, msg: "Please fill all th field...." })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword =  bcrypt.hashSync(password, salt);
        const user = new User({
            name,
            email,
            password:hashedPassword
        })

        await user.save();
        res.status(201).send({ status: true, msg: 'User Created successfully....' })
    } catch (error) {
        res.status(500).send({ status: false, msg: "Something Went Wrong please try again..." })
    }
}


const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send({ status: false, msg: "Please fill all th filled...." })
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(400).send({ status: false, msg: "User does Not Exist..." })
        }
        const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).send({ status: false, msg: "User Email or Password Does Not Match please try again..." })
        }
        const token = jwt.sign({ ...user }, "sEcKrEt", {
            expiresIn: "9999 years"
          });

        res.status(200).send({ status: true, token: token, msg: "User Login Successfully...." })

    } catch (error) {
        res.status(500).send({ status: false, msg: "Something Went Wrong please try again..." })
    }


}

const commentedUser = async(req, res) => {
    try {
        const { text } = req.body;
        const token = req.header("Authorization").split(" ")[1];
        if (!token) {
            return res.status(401).send({ status: false, msg: 'Unauthorized - Missing token' });
        }
        const com = new Comment(req.body);
        const saveCom = await com.save();
        const decoded = jwt.verify(token, 'sEcKrEt');
        const user = decoded._doc;
        const newUser = await User.findById(user._id)
        newUser.comment.push(saveCom._id);
        await newUser.save();
        res.status(200).send({status:true,msg:"Comment save successfully"})
    } catch (error) {
        res.status(500).send({ status: false, msg: "Something Went Wrong please try again...",error })
    }
}

module.exports = {
    registerUser,
    loginUser,
    commentedUser
}