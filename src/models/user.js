const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Task=require('../models/task')

const userSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true

    },
    email:{
        required:true,
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email Invalid')
            }
        }

    },
    password:{
        required:true,
        type:String,
        trim:true,
        minlength:7
    },
    age:{
        type:Number,
        default:20,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON= function(){//******* this function is always called when user object is stringified for eg----when send(user)---
    //user is first stringified (conveted to json) then sent---hence when ever we stringify/send we dont want to send passwprd and other tokens
    const user= this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken=async function() {
    const user=this
    const token=await jwt.sign({ _id:user._id.toString() },'secret')
    user.tokens.push({token})
    
    user.save()
    return token
}

userSchema.statics.findUserByCredentials=async (email,password)=>
{
    email=email.trim()
    password=password.trim()
    const user=await User.findOne({email})
    if(!user){
        throw new Errro('Unable to login')
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login2')
    }
    return user
}

userSchema.pre('save',async function(next){
    const user=this
    // console.log(user.password)
    if(user.isModified('password'))
    user.password=await bcrypt.hash(user.password,8)

    

    next()
})

userSchema.pre('remove',async function(next){
    const user=this
    await Task.deleteMany({owner:this._id})
    next()
})


const User=mongoose.model('User',userSchema)

module.exports=User