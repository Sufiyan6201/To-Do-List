const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

let todoList = [];

app.get('/', (req, res) => {
     res.render('index', { todoList });
});

app.post('/add-task', (req, res) => {
     const task = req.body.task;
     todoList.push({ task, completed: false });
     return res.redirect('/');
});

app.get('/delete-task', (req, res) => {
     const taskId = req.query.Id;
     var list = todoList.filter((task, i) => {
          return taskId != i;
     });
     todoList = list
     return res.redirect('/');

});
app.get('/edite-task', (req, res) => {
     const Id = req.query.Id
     let { task } = req.body
     let item = todoList.filter((task, i) => {
          return Id == i
     })
     return res.render('edite', {
          item: item[0], Id

     })
})

app.post('/edite-task', (req, res) => {
     let taskId = req.query.Id;
     let ts = req.body
     let  task  = todoList.filter((task, i) => {
          if (taskId == i) {
               task.task = ts.task
          }
          return task
     });
     
     todoList=task
     return res.redirect('/');
});

app.listen(port, () => {
     console.log("Server started on port http://localhost:" + port);
});