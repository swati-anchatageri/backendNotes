const express=require("express")
const {UserModel}=require("../model/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const{userName,email,pass}=req.body
    try {
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.send({"error":err})
            }else{
                const user = new UserModel({userName,email,pass:hash})
                await user.save()
                res.send({"msg":"New user has been added"})
            }
        })
    } catch (error) {
        res.send({"error":error})
    }
})

userRouter.post("/login",async(req,res)=>{
    const{email,pass}=req.body
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user._id,user:user.userName},"masai")
                    res.send({"msg":"loginsuccessfull","token":token})
                }else{
                    res.send({"error":err})
                }
            })
        }else{
            res.send({"msg":"user doesnot exist"})
        }
    }catch(err){
        res.send({"error":err})
    }
})

module.exports={
    userRouter
}