require('../src/db/mongoose')//linking server
const User=require('../src/models/user')

//60096de2e7613c25079ff87a

// User.findByIdAndUpdate('60096df9390251250d70cbd4',{ age:21}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({ age:20 })
// }).then((count)=>{
//     console.log(count) 
// }).catch((e)=>{
//     console.log(e)
// })

//now using async and await


//await can only be used inside async functions 

const updateAndCount=async (id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age}) //using es6 short hand age:age = age
    const count = await User.countDocuments({age:20})
    return count 
}

updateAndCount('60096e51df12a9251f175b53',28).then((count)=>{
    console.log('No of users with age 20 ',count)
}).catch((e)=>{
    console.log(e)
})