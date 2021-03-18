// CRUD create read update delete

// const mongodb=require('mongodb')
// const MongoClient=mongodb.MongoClient
// const ObjectID=mongodb.ObjectID

const {MongoClient , ObjectID}=require('mongodb')


// const id= new ObjectID()//new is optional

// this id is actually ObjectId('//Id in hexa decimal') which gives a binary buffer of 12 bytes
//this is done to reduce size ---as hexadecimal string size is 24 bytes but its same binarys size is 'HALF' ie 12 bytes
//so this id is actually= ObjectId('6006d273e2a84010d45528c7')


// console.log(id)//first 4-seconds from unix time(1 jan 1970) next 5 random next a 3-byte incrementing counter, initialized to a random value
// console.log(id.id.length)
// console.log(id.getTimestamp())
// console.log(id.toHexString().length)


const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'//nead not be same as project name..just a name to DB

//-----Create-----

// MongoClient.connect( connectionUrl,{ useNewUrlParser:true ,useUnifiedTopology: true},(error,client)=>{
//     if(error){ 
//         return console.log('Could not connect to servers')
//     }

//     // console.log('Success: Connected to server')ß

//     const db=client.db(databaseName)//making DB

//     // db.collection('user').insertOne({ //creating a collection named user and inserting one 
//     //     name:'Suman',
//     //     age:20,
//     //     _id:id
//     // })


//     // db.collection('users').insertMany([
//     //     {
//     //         name:'Shivam',
//     //         age:21,
//     //         // _id:2133//you can manually give id but error will come if same id inserted again!
//     //     },
//     //     {
//     //         name:'Rakshit',
//     //         age:20
//     //     }
//     // ],(error,result)=>{
//     //     if(error){
//     //     return console.log('Unable to insert documents!')
//     //     }

//     //     console.log(result.ops)
//     // })


//     // db.collection('tasks').insertMany([
//     //     {
//     //         discription:'1st task',
//     //         completed:true
//     //     },{
//     //         discript:'2nd task',
//     //         completed:false
//     //     },{
//     //         discription:'3rd task',
//     //         completed:false
//     //     }
//     // ],(error,result)=>{
//     //     if(error){
//     //         return console.log('Unable to insert!')
//     //     }

//     //     console.log(result.ops)
//     // })

// } )

//----Read-----
// MongoClient.connect(connectionUrl,{ useNewUrlParser:true , useUnifiedTopology:true },(error,client)=>{

//     if(error){
//         return console.log('Couldnot connect to server!')
//     }

//     const db=client.db(databaseName)

    // db.collection('users').findOne({ name:'Rakshita' },(error,user)=>{
    //     if(error){
    //         return console.log('Unable to fetch')//mind it that is user is not found then error will NOT be runed  but ---- user = null 
    //     }
    //     //user not fornd is not an errror

    //     console.log(user)

    // })

    // db.collection('users').findOne({_id:new ObjectID('6006ba38df90f10fbf64e137') },(error,user)=>{
    //     console.log(user)
    // })

    // db.collection('users').findOne({_id:'2133'},(error,user)=>{
    //     console.log(user)
    // })

    // db.collection('users').find({name:'Shivam'}).toArray((error,users)=>{ //here find users 'curser'
    //     console.log(users)
    // })

    // db.collection('users').find({age:20}).count((error,count)=>{
    //     console.log(count)
    // })

    

    // db.collection('tasks').findOne({},(er,task)=>{//simple first document
    //     console.log(task)
    // })

    // db.collection('tasks').find({},{limit:1}).toArray((error,tasks)=>{ //first element in the collection 'task'
    //     console.log(tasks)
    // })
    
    // db.collection('tasks').find({}).sort({_id:-1}).limit(1).toArray((err,task)=>{
    //     console.log(task)
    // })//last element 

    // db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
    //     console.log(tasks)
    // }) //printing all not completed
    



// })

//---------update----------


// MongoClient.connect(connectionUrl,{useNewUrlParser:true,useUnifiedTopology:true},(error,client)=>{
//     if(error){
//         return console.log('Unable to connect!')
//     }

//     const db=client.db(databaseName)

    // db.collection('user').updateOne({
    //     _id:ObjectID('6005f36240169c0e87eb8467')
    // },{
        
    //     $set:{
    //         name:'Raks',
    //         age:23
    //     }
        

    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    
// })


//---------Delete--------

//     MongoClient.connect(connectionUrl,{useNewUrlParser:true,useUnifiedTopology:true},(error,client)=>{
        
//     if(error){
//         return console.log('Unable to connect to servers!')
//     }

//     const db=client.db(databaseName)
//     // db.collection('users').deleteMany({
//     //     age:21
//     // }).then((result)=>{
//     //     console.log(result)
//     // }).catch((error)=>{
//     //     console.log(error)
//     // })

//     db.collection('tasks').deleteOne({
//         discription:'Water the plants'
//     }).then((result)=>{
//         console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     })

// })


