const writeData = function(data){
  let title = document.createElement('a');
  title.innerText = data.title;
  title.href = encodeURI(data.title);
  console.log(title);
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

let count = 1;
const giveTextbox = function(){
  let textArea = document.createElement('textarea');
  textArea.id = count++;
  let box = document.getElementById('items');
  box.appendChild(textArea);
  let lineBreak = document.createElement('br');
  box.appendChild(lineBreak);
}
