var express = require("express");
app = express();
var PORT = process.env.PORT||3000;
var todos =[{
    id:1,
    description:'Meet mom for lunch.',
    completed:false
},{
    id:2 ,
    description: 'Go to supermarket',
    completed:false
}];

app.get('/',function(req,res){
    res.send('TODO api Root');
});

app.get('/todos',function(req,res){
   res.json(todos);
});


app.listen(PORT,function(){
   console.log('Express listening port :'+PORT);
});