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

const deleteTodo = element => {
  element.addEventListener("click", event => {
    event.stopPropagation();
    element.parentNode.remove();
  });
};
deleteSpans.forEach(deleteTodo);

input.forEach(input => {
  input.addEventListener("keypress", function(event) {
    if (event.which === 13) {
      const newTodo = this.value;
      this.value = "";
      const ul = document.getElementById("todolist");
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.innerHTML = "X ";
      li.appendChild(span);
      li.appendChild(document.createTextNode(newTodo));
      toggleTodo(li);
      deleteTodo(span);
      ul.appendChild(li);
    }
  });
});
