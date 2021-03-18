require('../src/db/mongoose')
const mongodb = require('mongodb')
const Task=require('../src/models/task')

//600853a34f8d9f2199b6adee

Task.create({
    description:'love coding?',
    _id:mongodb.ObjectID('600853a34f8d9f2199b6adee')
}).then((task)=>console.log('Created new task with id ',task._id)).catch ((e)=> {
    
    if(e.code == 11000)
    {
        console.log('Already there')
        
    }
})

// Task.findByIdAndDelete('600853a34f8d9f2199b6adee').then((task)=>{
//     console.log('The deleted task is ',task )

//     return Task.countDocuments({ completed:false })
//     }).then((count)=>{
//         console.log('Total number incomplete tasks are ', count)
//     }).catch((e)=>{
//         console.log(e)
// })

console.log('Good')


//await can only be used inside async functions 


const deleteAndCount = async (id,TorF)=>{
    await Task.findByIdAndDelete(id)//u can either store the await value or ignore it like done here //but if u dont write await and dont have (then ) then the statement will not be executed
    const count = await Task.countDocuments({completed:TorF})
    return count
}


deleteAndCount('600853a34f8d9f2199b6adee',TorF=false).then((count)=>{
    console.log('The task which have completed = '+ TorF+' are '+count)

}).catch((e)=>{
    console.log(e)
})


