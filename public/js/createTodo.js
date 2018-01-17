const sendRequest = function(reqType,url,callBack,data){
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load',callBack);
  xhr.open(reqType,url,'true');
  xhr.send(data);
}
const writeData = function(data){
  let title = document.createElement('a');
  title.innerText = data.title;
  title.href = data.id;
  return title;
}

const refresh = function(){
  location.reload();
}

const createTodo = function(){
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  document.getElementById('description').value = '';
  document.getElementById('title').value = '';
  sendRequest('POST','/addTodo',refresh,`title=${title}&description=${description}`);
}

let writeTodo = function(){
  let returndata = this.responseText;
  let todo = JSON.parse(returndata);
  let list = document.getElementById('allTodo');
  todo.forEach((title)=>{
    list.appendChild(writeData(title));
    let linebreak = document.createElement('br');
    list.appendChild(linebreak);
  });
}

const getAllTodo = function(){
  sendRequest('POST','/getAllTitle',writeTodo);
}

window.onload = getAllTodo;
