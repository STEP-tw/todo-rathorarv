const refresh = function(){
  location.reload();
}
const sendRequest = function(reqType,url,callBack,data){
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load',callBack);
  xhr.open(reqType,url,'true');
  xhr.send(data);
}

const changeStatus = function(){
  let todoId = location.pathname.replace('/','');
  let itemId = event.target.id;
  sendRequest('POST','/changeStatus',refresh,`todoId=${todoId}&itemId=${itemId}`);
}

const deleteTodoItem = function(){
  let todoId = location.pathname.replace('/','');
  let itemId = event.target.id;
  sendRequest('POST','/deleteTodoItem',refresh,`todoId=${todoId}&itemId=${itemId}`);
}
const writeItem = function(item){
  let para = document.createElement('p');
  para.id = item.id;
  let button = document.createElement('button');
  let deleteButton = document.createElement('button');
  let heading = document.createElement('h3');
  heading.innerText = item._item;
  button.innerText = item._status;
  button.onclick = changeStatus;
  button.id = item.id;
  deleteButton.innerText = 'delete';
  deleteButton.id = item.id;
  deleteButton.onclick = deleteTodoItem;
  para.appendChild(heading);
  para.appendChild(button);
  para.appendChild(deleteButton);
  return para;
}

const writeTodoItems = function(){
  let block = document.getElementById('items');
  let items = JSON.parse(this.responseText);
  items = Object.values(items[0]);
  items.forEach((item)=>{
    let para = writeItem(item);
    block.appendChild(para);
  });
}
const getAllTodo = function(){
  let id = location.pathname.replace('/','');
  sendRequest('POST','/getTodoItems',writeTodoItems,`id=${id}`);
}

const addItem  = function(){
  let item = document.getElementById('item').value;
  let id = location.pathname.replace('/','');
  sendRequest('POST','/addTodoItem',refresh,`id=${id}&item=${item}`);
}

window.onload = getAllTodo;
