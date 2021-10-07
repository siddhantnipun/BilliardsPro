const express= require("express");
const path= require("path");
const app=express();
const bodyparser= require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/compPro');
}
const port=80;

//Define mongoose schema
const compSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  const comp = mongoose.model('Comp', compSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))//for serving html files
app.use(express.urlencoded())//helps to get from form to express

//PUG SPECIFIC STUFF
app.set('view engine','pug')//set template engine as pug
app.set('views',path.join(__dirname,'views'));//set the viws directory

//ENDPOINTS
app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params);
});

app.get('/compt',(req,res)=>{
    const params={ }
    res.status(200).render('compt.pug',params);
});
app.post('/compt',(req,res)=>{
    var myData= new comp(req.body);
    myData.save().then(()=>{
        res.send("Success: The Form has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Error: The Form has not been saved")
    });
    // res.status(200).render('compt.pug');
});
//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
})
