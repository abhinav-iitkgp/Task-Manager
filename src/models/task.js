const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
        description:{
            type:String,
            required:true,
            trim:true
        },
        completed:{
            default:false,
            type:Boolean
        },
        owner:{
            type:mongoose.Schema.ObjectId,
            required:true,
            ref:'User'
        }
    },{
        timestamps:true
    })

const Task=mongoose.model('Task',taskSchema)

module.exports= Task