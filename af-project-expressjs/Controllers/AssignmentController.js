const Express = require('express');

const Assignment = require('../Schema/assignmentSchema');

const assignmentRouter = Express.Router();

assignmentRouter.post('/',function(req,res){

    const assignment = new Assignment({
        name:req.body.name,
        publishDate:req.body.pDate,
        DueDate:req.body.dDate,
        allocatedMarks:req.body.marks,
        course:req.body.course,
        file:req.body.file,
        allocatedMarks:req.body.marks
    })

    assignment.save().then(data=>{
        res.status(200).send({message:"added successfully",data:data})
    }).catch(err=>{
        res.status(500).send({message:err})
    })
})

assignmentRouter.get('/:id',function(req,res){
    Assignment.findById(req.params.id).then(data=>{
        res.status(200).send({data:data})
    }).catch(err=>{
        res.status(500).send({message:err})
    })
})
assignmentRouter.put('/:id',function(req,res){
    Assignment.findById(req.params.id,function(err,assignment){
        if(err){
            res.status(500).send({message:err})
        }else{
            if(!assignment){
                res.status(404).send({message:"No data"})
            }else{
                console.log(req.body.filename)
                assignment.markSheet = req.body.filename

                assignment.save().then(data=>{

                            // var output=`<b>Assignment Results are out</b> 
                            // <p>Dear student , We kindly request you to check the website and download your assignment results.</p>`;

                            // let transporter = nodemailer.createTransport({
                            //         service: 'gmail',
                            //         secure: false,
                            //         port:25,
                            
                            //     auth: {
                            //             user: 'abccampus@gmail.com',
                            //             pass: 'acbcampus'
                            //     },
                            //     tls:{
                            //             rejectUnauthorized:false
                            //     }
                            // });
                            // let mailOptions = {
                            //             from: '"ABC Campus" <abccampus.org@gmail.com>',
                            //             to: 'email',
                            //             subject: 'Assignment Results',
                            //             text: 'Hello',
                            //             html: output
                            // };
                            // transporter.sendMail(mailOptions, (error, info) => {
                            //         if (error) {
                            //             return console.log(error);
                            //         }
                            //             console.log('Email sent: %s', info.messageId);
                            //             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                            // });





                    res.status(200).send({message:"added",data:data})
                }).catch(err=>{
                    res.status(500).send({message:err})
                })
            }
        }
    })
    
})


module.exports = assignmentRouter;