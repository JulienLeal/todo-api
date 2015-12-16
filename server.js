var express = require('express');
var bodyParser = require('body-parser');
var _ = require("underscore");

app = express();
var PORT = process.env.PORT||3000;
var todos =[];
var todoNextId=1;

app.use(bodyParser.json());

app.get('/',function(req,res){
    res.send('TODO api Root');
});

// GET /todos?completed=true
app.get('/todos',function(req,res){
    var queryParams = req.query;
    var filteredTodos=todos;

    if(queryParams.hasOwnProperty('completed')&& queryParams.completed=='true')
    {
        filteredTodos= _.findWhere(filteredTodos,{completed:true})

    }else{
        if(queryParams.hasOwnProperty('completed') && queryParams.completed=='false')
        {
            filteredTodos= _.findWhere(filteredTodos,{completed:false})

        }
    }
    if(queryParams.hasOwnProperty('q')&&queryParams.q.length>0)
    {
        filteredTodos= _.filter(filteredTodos,function(todo){
            return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase())> -1;
        });
    }

    res.json(filteredTodos);
});

// GET /todos/:id
app.get('/todos/:id',function(req,res){
    var todoID=parseInt(req.params.id,10);
    var matchedTODO= _.findWhere(todos,{id:todoID});


    if(matchedTODO){
        res.json(matchedTODO);
    }else{
        res.status(404).send();
    }

   res.send('Asking for TODO with id of :' + req.params.id);
});

//POST /todos
app.post('/todos',function(req,res){
    var body = _.pick(req.body,'description','completed','id');

    if(!_.isBoolean(body.completed)|| !_.isString(body.description) || body.description.trim().length===0){
        return res.status(400).send();
    }

    body.description = body.description.trim();

    body.id=todoNextId;
    todoNextId++;

    todos.push(body);

    console.log('description: '+body.description);
    res.json(body);

});

app.delete('/todos/:id',function(req,res){
    var todoID=parseInt(req.params.id,10);
   var matchedTODO= _.findWhere(todos,{id:todoID});

    if(!matchedTODO){
        res.status(404).json({"error":"no todo found with that id"});
    }else{
        todos = _.without(todos, matchedTODO);
        res.json(matchedTODO);
    }

});

app.put('/todos/:id',function(req,res){
    var todoID=parseInt(req.params.id,10);
    var matchedTODO= _.findWhere(todos,{id:todoID});
    var body = _.pick(req.body,'description','completed');
    var validAttributes={};

    if(!matchedTODO){
        return res.status(404).send();
    }

    if(body.hasOwnProperty('completed')&& _.isBoolean(body.completed))
    {
        validAttributes.completed=body.completed;
    }else if(body.hasOwnProperty('completed')) {
        return res.status(400).send();
    }
    if(body.hasOwnProperty('description')&& _.isString(body.description) && body.description.trim().length>0)
    {
        validAttributes.description=body.description;
    }else if(body.hasOwnProperty('description')){
        return res.status(400).send();
    }

    _.extend(matchedTODO,validAttributes);
    res.json(matchedTODO);

});

app.listen(PORT,function(){
   console.log('Express listening port :'+PORT);
});