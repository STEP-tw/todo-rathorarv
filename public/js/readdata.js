let userTodo = data['arvinds'];
let allTitle = userTodo.map((ele)=>ele.title);
let writeTitle = function(){
  let list = document.getElementById('allTodo');
  allTitle.forEach(function(ele){
    let todoName = writeData(ele);
    list.appendChild(todoName);
  })
}

// const getAllTitle = function(){
//   let xhr = new XMLHttpRequest();
//   xhr.addEventListener('load', callBack);
//   xhr.open('POST', '/addItems', 'true');
//   xhr.send(`item=${todoItem}&description=${description}`);
// }
window.onload = writeTitle;
