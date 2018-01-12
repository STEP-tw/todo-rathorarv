let webapp = require('./webapp.js');
let app = webapp.create();
let lib = require('./serverLib.js');

app.use(lib.logRequest);
app.use(lib.loadUser);
app.postprocess(lib.serveFile);
app.get('/',(req,res)=>{
  res.redirect('/loginPage.html');
})

app.post('/login',lib.loginHandler);

app.get('/logout',lib.logoutHandler);

app.post('/todoHandler',(req,res)=>{
  let todo = req.body;
  console.log(todo);
  res.write(JSON.stringify(todo));
  res.end();
})

module.exports = app;
