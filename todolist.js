const todoList = document.querySelector("#todolist");
const todosForm = document.querySelector("#add-todo-list");

const li = document.getElementsByClassName("listElement");
const liArray = [...li];

const span = document.getElementsByTagName("span");
const deleteSpans = [...span];

const inputTag = document.getElementsByTagName("input");
const input = [...inputTag];

const toggleTodo = element => {
  element.addEventListener("click", () => {
    element.classList.toggle("todos");
  });
};
liArray.forEach(toggleTodo);

const createTodoElement = (id, value) => {
  const li = document.createElement("li");
  const deleteButton = document.createElement("span");
  li.setAttribute("data-id", id);
  const newTodo = value;
  deleteButton.innerHTML = "X ";
  li.appendChild(deleteButton);
  li.appendChild(document.createTextNode(newTodo));
  toggleTodo(li);
  deleteTodo(deleteButton);
  todoList.appendChild(li);
};

const deleteTodo = element => {
  element.addEventListener("click", event => {
    event.stopPropagation();
    let id = event.target.parentElement.getAttribute("data-id");
    db.collection("todos")
      .doc(id)
      .delete();
    element.parentNode.remove();
  });
};
deleteSpans.forEach(deleteTodo);

todosForm.addEventListener("keypress", e => {
  if (e.which === 13) {
    e.preventDefault();
    db.collection("todos")
      .add({
        newTodo: todosForm.todo.value
      })
      .then(document => {
        createTodoElement(document.id, todosForm.todo.value);
        todosForm.todo.value = "";
      });
  }
});

//Firebase
const getTodos = () => {
  return db
    .collection("todos")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        createTodoElement(doc.id, doc.data().newTodo);
      });
    });
};
getTodos();
