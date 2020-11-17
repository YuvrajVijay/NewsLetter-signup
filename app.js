// jshint esversion:8
const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



mailchimp.setConfig({
  apiKey: "51d693b5605a5fa6447828092db0f3f8-us7",
  server: "us7",
});


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


app.post("/failed",function(req,res){
  res.redirect("/");
});

app.post("/",function(req,res){

  const firstName=req.body.firstName;
  const lastName=req.body.lastName;
  const email=req.body.inputEmail;
  console.log(req.body);
  const listId="84976ca0bb";

  const subscribingUser = {
 firstName: firstName,
 lastName: lastName,
 email: email
};
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html");
}
run().catch(e => res.sendFile(__dirname + "/failure.html"));
});


app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});
