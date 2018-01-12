const writeData = function(data){
  let title = document.createElement('h3');
  let description = document.createElement('p');
  title.innerText = data.title;
  description.innerText = data.description;
  let todo = document.createElement('div');
  todo.className = todo;
  todo.appendChild(title);
  todo.appendChild(description);
  return todo;
}

const createTodo = function(){
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let callBack = function(){
    let returndata = this.responseText;
    let todo = JSON.parse(returndata);
    let list = document.getElementById('allTodo');
    list.appendChild(writeData(todo));
  }
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load',callBack);
  xhr.open('POST','/todoHandler','true');
  xhr.send(`title=${title}&description=${description}`);
}
