const express=require('express')
const Task=require('../models/task')
const auth=require('../middleware/auth')

const router=new express.Router()

router.post('/task',auth,async (req,res)=>{
    
    // const newTask=new Task(req.body)
    const newTask=new Task({
        ...req.body,//this means all properties inside object req.body
        owner:req.user._id
    })

    try{
        await newTask.save()
        res.status(201).send(newTask)
    }catch(e){
        res.status(400).send(e)
    }
    // newTask.save().then(()=> res.status(201).send(newTask)).catch((e)=> res.status(400).send(e))
})

//GET tak?completed=true
//GET task?limit=2&skip=2
//GET task?sortBy=createdAt:asc
router.get('/tasks',auth,async (req,res)=>{

    const match={}
    
    if(req.query.completed){
        match.completed=req.query.completed === 'true'
    }
    const sort ={}
    if(req.query.sortBy){
        const sortBy=req.query.sortBy.split(':')
        sort[sortBy[0]]=sortBy[1]==='asc'? 1:-1
    }


    try{
        // await req.user.populate('tasks').execPopulate()
        //Now a user can have unlimited tasks//so it will not be afficient to send all even iff he needs only completed or not completed so we use query string
        await req.user.populate({
            path: 'tasks',
            match,//short hand,--------------------------------------//Filtering
            options:{//----------------------------------------------//Pagination
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                // skip:parseInt(req.query.skip)
                // sort:{//---------------------------------------------//Sorting
                //     [req.query.completed] : -1 //1 for assending -1 for decending

                // }
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }

    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})
router.get('/task/:id',auth,async (req,res)=>{


    const _id=req.params.id

    try{
        const task=await Task.findOne({_id, owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send()
    }



    // const _id=req.params.id
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

router.patch('/task/:id',auth,async (req,res)=>{

    //doing this if paased anything that is not a key that is not allowed to update

    const update=Object.keys(req.body)
    const allowedUpdate=['description','completed']

    const isValidUpdate=update.every((key)=>{ //this returns true if all callbacks return true else false
        return allowedUpdate.includes(key)
    })
    if(!isValidUpdate){
        return res.status(400).send('Invalid Update')
    }

    try{

        const task=await Task.findOne({_id:req.params.id , owner:req.user._id})
        if(!task){
            return res.status(404).send('Not found')
        }

        update.forEach((update)=>{
            task[update]=req.body[update]
        })

        await task.save()


        // const task= await Task.findByIdAndUpdate(req.params.id,req.body,{ new:true , runValidators:true  })//new true returns the new task after update
        
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})
router.delete('/task/:id',auth,async (req,res)=>{
    try{
        const task=await Task.findOneAndRemove({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send({error:'Task not found'})
        }
        res.send(task)

    }catch(e){
        res.status(500).send(e)
    }
})


module.exports=router