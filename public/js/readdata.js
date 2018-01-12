let userTodo = data['arvinds']['titles'];
let allTitle = Object.keys(userTodo);
let writeTitle = function(){
  let list = document.getElementById('allTodo');
  allTitle.forEach(function(ele){
    let data = {title:ele}
    let title = writeData(data);
    console.log(title);
    list.appendChild(title);
    let lineBreak = document.createElement('br');
    list.appendChild(lineBreak);
  })
}

window.onload = writeTitle;
