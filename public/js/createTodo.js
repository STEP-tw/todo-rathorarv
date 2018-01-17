const refresh = function(){
  location.reload();
}
const sendRequest = function(reqType,url,callBack,data){
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load',callBack);
  xhr.open(reqType,url,'true');
  xhr.send(data);
}
const deleteTodo = function() {
  let id = event.target.id;
  sendRequest('POST','/deleteTodo',refresh,`id=${id}`);
}

const editTodo = function(){
  let id = event.target.id;
  sendRequest('POST','/editTodo',refresh,`id=${id}&title=${title}`);
}

createInputBox = function(){
  let id = event.target.id;
  let input = document.createElement('input');
  input.id = 'input';
  let button = document.createElement('button');
  button.onclick = editTodo;
  let block = document.getElementById(id);
  block.appendChild(input);
  block.appendChild(button);
}
const writeData = function(data){
  let para = document.createElement('p');
  let title = document.createElement('a');
  title.innerText = data.title;
  title.href = data.id;
  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'delete';
  deleteButton.onclick = deleteTodo;
  deleteButton.id = data.id;
  let editButton = document.createElement('button');
  editButton.innerText = 'edit';
  editButton.onclick = createInputBox;
  editButton.id = data.id;
  para.appendChild(title);
  para.appendChild(deleteButton);
  para.appendChild(editButton);
  return para;
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
    // list.appendChild(linebreak);
  });
}

const getAllTodo = function(){
  sendRequest('POST','/getAllTitle',writeTodo);
}


window.onload = getAllTodo;
