let webapp = require('./webapp.js');
let app = webapp.create();
let lib = require('./serverLib.js');

app.use(lib.logRequest);
app.postprocess(lib.serveFile);
app.get('/',(req,res)=>{
  res.redirect('/loginPage.html');
})

module.exports = app;
