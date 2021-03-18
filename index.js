const express=require('express')
const userRouter=require('./src/routers/user')
const taskrouter=require('./src/routers/task')
require('./src/db/mongoose')//startinfg server





const port=process.env.PORT || 3000
const app=express()


// app.use((req,res,next)=>{//express middleware
    
//     res.status(503).send('The site is under maintainence')
// })
// app.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send('Get service disabled')
//     }
//     next()
// })
app.use(express.json())//app.use is run before every get/post/update/delete///.... request ----the function express.json() converted the req and parses it in json adding body element
app.use(userRouter)
app.use(taskrouter)

app.listen(port,()=>{
    console.log('Server Running at port 3000')
})






