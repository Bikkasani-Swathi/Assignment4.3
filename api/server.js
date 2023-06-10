let express=require('express')
let app=express();
let bodyParser=require('body-parser');
let mongoose=require('mongoose');
var cors = require('cors')

app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json());

app.use(cors())
const dbUrl='mongodb://0.0.0.0:27017/sports';
const options= {useNewUrlParser:true,
useUnifiedTopology:true}

const mongo= mongoose.connect(dbUrl,options);

mongo.then(()=>{
  console.log('connected to database');
}).catch((error)=>{
  console.log(error);
})

const model=new mongoose.model("sportshows",new mongoose.Schema({
  name:{type:String},
  tournament:{type:String},
  watchtime:{type:Number}
}));


app.post('/add',async (req,res)=>{
  try{
        const doc=new model({
          name:req.body.name,
          tournament:req.body.tournament,
          watchtime:req.body.watchtime
        });
        var val=await doc.save();
        res.send(JSON.stringify("Inserted"));
      }
      catch(error){
        res.send(error);
      }
})

app.patch("/update/:name",async (req,res)=>{
  try{
    const game=await model.findOne({name:req.params.name});
    if(req.body.tournament)
      game.tournament=req.body.tournament;
    await game.save();
    res.send(JSON.stringify("updated"));
  }
  catch(error){
    res.send(error);
  }
})


app.delete("/delete/:tournament",async (req,res)=>{
  try{
    await model.deleteOne({tournament:req.params.tournament});
    res.status(204).send();
  }
  catch(error){
    res.send(error);
  }
})

app.get("/highest",async (req,res)=>{
  try{
    const val=await model.find({}).sort({watchtime:-1});
    res.send(val);
  }
  catch(error){
    res.send(error);
  }
})

app.get("/total/:name",async (req,res)=>{
  try{
    const val=await model.count({name:req.params.name});
      res.send(JSON.stringify(val));
  }
  catch(error){
    res.send(error);
  }
})

app.listen(4000,function(){
    console.log("App listening on port 4000");
})