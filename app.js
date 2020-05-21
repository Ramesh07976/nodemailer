const express =require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer =require('nodemailer');
const { getMaxListeners } = require('process');

const app =express ();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))


app.get('/',(req,res)=>{
    res.render('index',{top_heading:'this class is node with jade'});

})

app.get('/about',(req,res)=>{
    res.render('about',)
})

app.get('/contact',(req ,res)=>{
    res.render('contact')
})

app.post('/contact/send',(req,res)=>{
    var transporter =nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'excellencecoding@gmail.com',
            pass:'*kumar123456*'
        }
    });

	var maillist = ['ramesharisen@gmail.com', 'coolmoon.soft@gmail.com', 'rameshkumar07976@gmail.com'];
	var subject = 'Ecoding: 0001 '+req.body.subject;
    	var mailOptions = {

    		from: 'ramesh kumar <excellencecoding@gmail.com>',
			to: maillist,
			subject: subject,
    		text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
			html: '<p>You have a submission with the following details...</p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
			
    
				
					
		// attachments: [
		// 	{   // utf-8 string as an attachment
		// 		filename: 'text.txt',
		// 		content: 'Attachments'
		// 	},
		// 	{
		// 		filename: 'logo',
		// 		path: 'newlogo.png'
		// 	}
		// ]
};


  	transporter.sendMail(mailOptions, function(error, info){
  		if(error){
  			console.log(error);
  			res.redirect('/');
  		} else {
  			console.log('Message Sent: '+info.response);
  			res.redirect('/');
  		}
  	});
});



app.listen(8000,()=>{
    console.log(`server is runing is 8000`);

})
