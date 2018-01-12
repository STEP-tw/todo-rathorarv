const writeData = function(data){
  let title = document.createElement('a');
  title.innerText = data.title;
  title.href = "/" + data.title;
  return title;
}

const createTodo = function(){
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let callBack = function(){
    let returndata = this.responseText;
    let todo = JSON.parse(returndata);
    let list = document.getElementById('allTodo');
    list.appendChild(writeData(todo));
    let lineBreak = document.createElement('br');
    list.appendChild(lineBreak);
  }
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load',callBack);
  xhr.open('POST','/todoHandler','true');
  xhr.send(`title=${title}&description=${description}`);
}
