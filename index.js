const express = require('express');
const app = express();

const PORT = 5000;

app.use(express.json());


const usersDatabase = [
  {id:1,name:"John",age:"30"},
  {id:2,name:"Robert",age:"22"},
  {id:3,name:"Dorothy",age:"37"}
];

var dbIndex = usersDatabase.length;


app.get('/', (req,res) => {
  res.send('REST API with Node.js');
});


app.get('/api/users', (req,res) => {
  res.send(JSON.stringify(usersDatabase));
});

app.get('/api/user/:id', (req,res) => {
  const user = usersDatabase.find((item)=>{return item.id == req.params.id;});
  res.send(JSON.stringify(user));
});

app.put('/api/user/:id', (req,res) => {
  const index = usersDatabase.findIndex((item)=>{return item.id == req.params.id});
  if(index != -1) {
    if(req.body.name)
      usersDatabase[index].name = req.body.name;
    if(req.body.age)
      usersDatabase[index].age = req.body.age;
    res.send(JSON.stringify(usersDatabase[index]));
  }
});

app.post('/api/users', (req,res) => {
  if(req.body.name && req.body.age) {
    dbIndex += 1;
    usersDatabase.push({id:dbIndex, name:req.body.name, age:req.body.age});
  }
  res.send(JSON.stringify([]));
});

app.delete('/api/user/:id', (req,res) => {
  const index = usersDatabase.findIndex((item)=>{return item.id == req.params.id});
  if(index != -1) {
    usersDatabase.splice(index,1);
  }
  res.send(JSON.stringify([]));
});



app.listen(PORT, () => {console.log("Listening on PORT: " + PORT);});