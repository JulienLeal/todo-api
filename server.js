var express = require("express");
app = express();
var PORT = process.env.PORT||3000;
app.get('/',function(req,res){
    res.send('TODO api Root');
});

app.listen(PORT,function(){
   console.log('Express listening port :'+PORT);
});