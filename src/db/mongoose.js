const mongoose=require('mongoose')
// const validator=require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{//simple   mongogb://ip/db_name
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})

//lets make a new model

// const User =mongoose.model('User',{//mongoose makes the 'User' to lower case and pluralises it
//     name:{
//         type: String,
//         trim:true,
//         required:true,
        
//     },
//     password:{
//         type:String,
//         trim:true,
//         required:true,
//         validate(value){
//             if(value.length<=6||value.toLowerCase().search('password')!=-1)
//             {
//                 throw new Error('Choose another password')
//             }
//         }
//     },
//     email:{
//         type:String,
//         lowercase:true,
//         required:true,
//         trim:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Not a valid email')
//             }
//         }
//     },
//     age:{
//         type: Number,
//         default:20,
//         validate(value){
//             if(value<0)
//             {
//                 throw new Error('Age can not be negative')
//             }
//         }
//     }
// })

// const user1=new User({
//     name:' SHivam   ', 
//     email:' shivam@user.com  ',
//     password:'bvk    g   '

// })

// user1.save().then(()=>{
//     console.log(user1)
// }).catch((er)=>{
//     console.log(er)
// })

// const Task =mongoose.model('taSk',{//mongoose makes the 'taSk' to lower case and pluralises it so that the final collection name becomes 'tasks'
//     description:{
//         type:String
//     },
//     completed:{
//         type:Boolean
//     }
// })


// const task1=new Task({ description:'open phone',completed:true})

// task1.save().then(()=>{
//     console.log('Saved::',task1)
// })

// const Task=mongoose.model('task',{
//     description:{
//         type:String,
//         required:true,
//         trim:true
        
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })

// const task1=new Task({
//     description:'Completed full course then watch Bigg Boss'

// })

// task1.save().then((task)=>{
//     console.log(task)
// }).catch((e)=>{
//     console.log('ERROR',e)
// })