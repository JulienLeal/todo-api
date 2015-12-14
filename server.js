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
},{
    id:3 ,
    description: 'Feed the cat',
    completed:true
}];

app.get('/',function(req,res){
    res.send('TODO api Root');
});

app.get('/todos',function(req,res){
   res.json(todos);
});

app.get('/todos/:id',function(req,res){
    var todoID=parseInt(req.params.id,10);
    var matchedTODO;

    //iterate of todos array. find the match
    todos.forEach(function(todo){
        if(todoID===todo.id){
            matchedTODO=todo;
        }
    });

    if(matchedTODO){
        res.json(matchedTODO);
    }else{
        res.status(404).send();
    }

   res.send('Asking for TODO with id of :' + req.params.id);
});

app.listen(PORT,function(){
   console.log('Express listening port :'+PORT);
});