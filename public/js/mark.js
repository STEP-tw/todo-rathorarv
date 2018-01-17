const writeTodoItem = function(){
  let items = JSON.parse(this.responseText);
  console.log(items);
}
const getAllTodo = function(){
  let id = location.pathname.replace('/','');
  sendRequest('POST','/getTodoItems',writeTodoItem,`id=${id}`);
}
