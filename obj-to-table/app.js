var express = require('express');
var app = express();
var path = require('path');

const PORT  = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use('/',(req,res)=>{
  res.sendFile(__dirname+"/views/index.html")
})

app.listen(PORT, () => {
    console.log("App listening at: http://localhost:"+PORT);
  });



module.exports = app;
