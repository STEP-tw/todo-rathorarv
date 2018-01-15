const deleteTitle = function(event){
  let titleName = event.target.id;
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
    location.reload();
  });
  xhr.open('POST','/deleteTitle','true');
  xhr.send(`title=${titleName}`);
}

const writeData = function(titleName){
  let title = document.createElement('a');
  let para = document.createElement('p');
  title.innerText = titleName;
  title.href = encodeURI(titleName);
  let button = document.createElement('button');
  console.log(titleName ,"==============");
  button.id = titleName;
  button.innerText = 'delete';
  button.onclick = deleteTitle;
  para.appendChild(title);
  para.appendChild(button);
  return para;
}

const createTodo = function(){
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let callBack = function(){
    let returndata = this.responseText;
    let todo = JSON.parse(returndata);
    let list = document.getElementById('allTodo');
    list.appendChild(writeData(todo.title));
  }
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load',callBack);
  xhr.open('POST','/todoHandler','true');
  xhr.send(`title=${title}&description=${description}`);
}
