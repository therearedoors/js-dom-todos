const todoList = document.querySelector("#todo-list")
const addForm = document.querySelector("#add-form")
addForm.addEventListener("submit",function(event){
    event.preventDefault()
    addTodo(event.target)
    addForm.reset()
})

function addTodo(form){
    const title = document.getElementById("title").value
    const todo = {
        title: title,
        completed: false
        }
    const options = {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
          },
        body: JSON.stringify(todo)
    }
    fetch('http://localhost:3000/todos', options)
    .then(renderFromClient)
}

function renderFromClient() {
    fetch('./db/todos.json')
    .then(res => res.json())
    .then(list => renderList(list.todos))
}

function renderList(todos){
    todoList.innerHTML = ""
    todos.forEach(todo => processTodo(todo))
}

function processTodo(todo){
    const p = document.createElement('p')
    p.innerText = todo.title
    if (todo.completed) p.classList.add("completed")
    todoList.append(p)
}

renderFromClient()