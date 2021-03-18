const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')
const multer=require('multer')
const sharp=require('sharp')
const {sendWelcomeEmail,sendCancellationEmail}=require('../emails/account')

const userRouter=new express.Router()

const upload=multer({
    
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please enter an image'))
        }
        cb(undefined,true)
    }
})

userRouter.post('/user/me/avatar',auth,upload.single('avatar'),async (req,res)=>{

    const buffer=await sharp(req.file.buffer).resize({width:250 , height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{//error handler for express
    res.status(400).send({error:error.message})
})
userRouter.delete('/user/me/avatar',auth,async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})
userRouter.get('/user/:id/avatar',async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/jpeg')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

userRouter.post('/user/login',async (req,res)=>{
    try{
        const user=await User.findUserByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.send({user,token} )
    }catch(e){
        res.status(400).send()
    }
})

userRouter.post('/user/logout',auth,async (req,res)=>{
    try{
        
        
        req.user.tokens=req.user.tokens.filter(({token})=>{
            return token !=req.token
        })
        
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})

userRouter.post('/user/logoutall',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        req.user.save()
        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})

userRouter.get('/user/me',auth,(req,res)=>{
    res.send(req.user)
})
userRouter.post('/user',async (req,res)=>{
    const NewUser=new User(req.body)
    // console.log(NewUser) -- moral even if something is required but is not passed then also it will make the object NewUser with the provided agruments 
    //so Newuser throws no error if required arguments are not provided

    //error is thrown when this is saved down bellow

    

    try{   
        const user = await NewUser.save()
        sendWelcomeEmail(user.email,user.name)

        const token=await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch(e){
        
        res.status(400).send()
    }
    
    // NewUser.save().then(()=>{
    //     res.status(201).send(NewUser)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})
userRouter.get('/users',async (req,res)=>{

    
    try{
        const users=await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send()
    }




    // User.find({}).then((users)=>{
    //     res.status(200).send(users)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})
userRouter.get('/user/:id',async (req,res)=>{


    const _id=req.params.id

    try{
        const user= await User.findById(_id)
        if(!user)
        {
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }

    
    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

userRouter.patch('/user',auth,async (req,res)=>{

    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password','age']

    const isValidUpdate=updates.every((key)=> allowedUpdates.includes(key)
    )
    if(!isValidUpdate){
        return res.status(400).send('Invalid Update!')
    }

    try{
        
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{ new:true , runValidators:true})//validates the to update value first
        await req.user.save()
        res.send(req.user)//so that we can hash password pre saving using middle ware
    
    }catch(e){
        res.status(400).send(e)
    }
})

userRouter.delete('/user/me',auth,async (req,res)=>{
    try{
        // const user=await User.findByIdAndDelete(req.user_id)
        // if(!user){
        //     return res.status(404).send({ error:'User not found'})
        // }
        //now no need to check if user valid as already checked it in auth
        await req.user.remove()//mongoose funtion - makes it easy to remove
        sendCancellationEmail(req.user.email,req.user.name)
        res.send()

    }catch(e){
        res.status(400).send(e)
    }
})


module.exports=userRouter