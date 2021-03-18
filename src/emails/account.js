const sendGrid=require('@sendgrid/mail')

const apikey='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'

sendGrid.setApiKey(apikey)

// sendGrid.send({
//     to:'abhinav.singh2029@gmail.com',
//     from:'arommaas@gmail.com',
//     subject:'sendGrid test',
//     text:'this id a test from sendGrid'
    
// }).then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })


const sendWelcomeEmail=(email,name)=>{
    sendGrid.send({
        to:email,
        from:'abhinav.singh2029@gmail.com',
        subject:'Welcome to the App',
        text:'Thanks for downloading the app $(name)'
    }).then(() => {
            console.log('Email sent')
        })
          .catch((error) => {
             console.error()
           })
}
const sendCancellationEmail=(email,name)=>{
    sendGrid.send({
        to:email,
        from:'abhinav.singh2029@gmail.com',
        subject:'Sorry to see you go',
        text:'Goodbye ${name}, Hope to see you soon'
    }).then(() => {
        console.log('Email sent')
    })
      .catch((error) => {
         console.error()
       })
}
module.exports= {
    sendWelcomeEmail,
    sendCancellationEmail
}