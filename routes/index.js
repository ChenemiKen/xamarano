var express = require('express');
var router = express.Router();
const url = require('url');
const db = require('../config/database');
const Contact = require('../models/Models');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Xamaranoict || Home',page_name:'home'});
});

router.get('/courses', function(req,res,next){
  res.render('courses',{title:'Xamaranoict ||Courses', page_name:'courses'});
});

var refererUrl='/';
// new message
router.post('/contact', (req, res)=>{
  var url_parts = url.parse(req.headers.referer);
  refererUrl = url_parts.pathname;
  switch(refererUrl){
    case '/':
      refererPage = 'index';
      break;
    case '/courses':
      refererPage = 'courses';
      break;
  }

  // let{name,email,subject,message}=req.body;
  contact_data =req.body;
  console.log(contact_data);
  console.log(contact_data.name)
  let errors = [];
  // validate fields
  if(!contact_data.name){
    errors.push({text: 'Please enter your name.'});
  }
  if(!contact_data.email){
    errors.push({text: 'Please enter your Email Address.'});
  }
  if(!contact_data.subject){
    errors.push({text: 'Please enter a subject for your message.'});
  }
  if(!contact_data.message){
    errors.push({text: 'you have not entered any message.'});
  }
  // check for errors
  if(errors.length>0){
    res.render(refererPage,{
      title:'Xamaranoict ||Contact', 
      page_name:'contact',
      errors,
      contact_data,
    });
  }else{
    let{name,email,subject,message}=contact_data;
    // Insert into table
    Contact.create({
      name,
      email,
      subject,
      message,
    })
    .then(gig =>{
      contact_data=undefined
      res.redirect('/contact-success')
    })
    .catch(err => console.log(err));
  }
}) 

router.get('/contact-success',(req, res)=>{
  res.render('contact_success',{refererUrl:refererUrl, title: 'Xamaranoict || Contact-success',page_name:'contact-success'});
})

router.get('/about',(req, res)=>{
  res.render('about',{title: 'Xamaranoict || about',page_name:'about'});
})

module.exports = router;