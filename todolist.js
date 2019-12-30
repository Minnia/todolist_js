const apiUrl = "http://localhost:5000/todolist-js-6c1cc/us-central1/app";

const axiosClient = axios.create({
  baseURL: apiUrl
});
const todoList = document.querySelector("#todolist");
const todosForm = document.querySelector("#add-todo-list");

const li = document.getElementsByClassName("listElement");
const liArray = [...li];

const span = document.getElementsByTagName("span");
const deleteSpans = [...span];

const inputTag = document.getElementsByTagName("input");

const toggleTodo = element => {
  element.addEventListener("click", () => {
    element.classList.toggle("todos");
  });
};
liArray.forEach(toggleTodo);

//Function for creating new todo
const createTodoElement = (id, value) => {
  const li = document.createElement("li");
  const deleteButton = document.createElement("span");
  const newTodo = value;
  li.setAttribute("data-id", id);
  deleteButton.innerText = "X ";
  li.appendChild(deleteButton);
  li.appendChild(document.createTextNode(newTodo));
  toggleTodo(li);
  deleteTodo(deleteButton);
  todoList.appendChild(li);
};

//Function for deleting todo
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

//POST
todosForm.addEventListener("keypress", async e => {
  if (e.which === 13) {
    e.preventDefault();
    const { data: document } = await axiosClient.post("/api/todos", {
      newTodo: todosForm.todo.value
    });
    createTodoElement(document.id, todosForm.todo.value);
    todosForm.todo.value = "";
  }
});

//GET
const getTodos = async () => {
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
