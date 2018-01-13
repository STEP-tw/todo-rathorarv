const mark = function(){
  let todoItem = document.getElementById('item').value;
  let desc = document.getElementById('desc').innerText;
  let description = desc.split(':')[1];
  let callBack = function(){
    let item = this.responseText;
    console.log(item);
    let para = document.createElement('p');
    para.innerText = item;
    let list = document.getElementById('items');
    list.appendChild(para);
    let lineBreak = document.createElement('br');
    list.appendChild(lineBreak);
  }
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load',callBack);
  xhr.open('POST','/addItems','true');
  xhr.send(`item=${todoItem}&description=${description}`);
}
