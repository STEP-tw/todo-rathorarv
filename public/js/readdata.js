let userTodo = data['arvinds'];
let allTitle = userTodo.map((ele)=>ele.title);
let writeTitle = function(){
  let list = document.getElementById('allTodo');
  allTitle.forEach(function(ele){
    let data = {title:ele}
    let title = writeData(data);
    list.appendChild(title);
    let lineBreak = document.createElement('br');
    list.appendChild(lineBreak);
  })
}

window.onload = writeTitle;
