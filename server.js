var express = require('express');
var bodyParser = require('body-parser');

app = express();
var PORT = process.env.PORT||3000;
var todos =[];
var todoNextId=1;

app.use(bodyParser.json());
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

//POST
app.post('/todos',function(req,res){
    var body = req.body;

    body.id=todoNextId;
    todoNextId++;
    todos.push(body);

    console.log('description: '+body.description);
    res.json(todos);

});

app.listen(PORT,function(){
   console.log('Express listening port :'+PORT);
});