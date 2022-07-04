// Selectors
const input = document.querySelector('#todoInput')
const todo_btn = document.querySelector('#addTodo')
const todoList = document.querySelector('.todoList')
const filterOption = document.querySelector('#filter-todo')
const clear_btn = document.getElementById('clearBtn')
const message = document.querySelector('.message')
const ok_btn = document.getElementById('ok_btn')

// Event Listeners
todo_btn.addEventListener('click', addTodo)
todoList.addEventListener('click', delete_check_todos)
filterOption.addEventListener('click', filterTodos)
document.addEventListener('DOMContentLoaded', updateDOM)
clear_btn.addEventListener('click', clearTodos)

ok_btn.addEventListener('click', () => {
    ok_btn.style.display = 'none'
    message.style.display = 'none'
})

//  ********* Functions **********

// Function to add todos
function addTodo() {
    // Create div todo
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    // Create li in todo div
    const todoItem = document.createElement('li')
    todoItem.innerHTML = input.value
    todoDiv.appendChild(todoItem)
    // Add todo to the local storage 
    saveTodosToLocalStorage(input.value)
    // Create a button to check
    const buttonCheck = document.createElement('button')
    buttonCheck.innerHTML = '<i class="fa-solid fa-check"></i>'
    buttonCheck.classList.add('checkBtn')
    todoDiv.appendChild(buttonCheck)
    // Create a button for delete 
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    deleteButton.classList.add('deleteBtn')
    todoDiv.appendChild(deleteButton)
    // Append todoDiv to our todo list div
    todoList.appendChild(todoDiv)

    clear_btn.style.display = 'block'

    if (input.value === '') {
        todoList.removeChild(todoDiv)
        clear_btn.style.display = 'none'
    }

    // Reset the input value
    input.value = ''
}

// Function for check todos
function delete_check_todos(e) {
    const item = e.target
    // Check the todo
    if (item.classList[0] === 'checkBtn') {
        const todo = item.parentNode
        todo.classList.toggle('check')
    }
    // Delete the todo
    if (item.classList[0] === 'deleteBtn') {
        const todo = item.parentNode
        todo.classList.add('removeTodo')
        deleteTodosToLocalStorage(todo)

        todo.addEventListener('transitionend', () => {
            todo.remove()
        })
    }
}

// Function to filter todos
function filterTodos(e) {
    const items = todoList.childNodes

    items.forEach(item => {
        switch (e.target.value) {
            case 'all':
                item.style.display = 'flex'
                break
            case 'completed':
                if (item.classList.contains('check')) {
                    item.style.display = 'flex'
                } else {
                    item.style.display = 'none'
                }
                break
            case 'incompleted':
                if (!item.classList.contains('check')) {
                    item.style.display = 'flex'
                } else {
                    item.style.display = 'none'
                }
                break
        }
    })
}

// Function for saving todos to local storage
function saveTodosToLocalStorage(todo) {
    let todos
    if (localStorage.getItem('todosItem') == null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todosItem'))
    }
    todos.push(todo)
    localStorage.setItem('todosItem', JSON.stringify(todos))

    // Checks if the input value is empty 
    if (input.value === '') {
        todos.splice(todo, 1)
        localStorage.setItem('todosItem', JSON.stringify(todos))
        message.style.display = 'block'
        ok_btn.style.display = 'block'
        clear_btn.style.display = 'none'
    }
}

// Function to update todos from local storage in DOM
function updateDOM() {
    let todos
    if (localStorage.getItem('todosItem') == null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todosItem'))
    }
    todos.forEach((todo) => {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        const todoItem = document.createElement('li')
        todoItem.innerHTML = todo
        todoDiv.appendChild(todoItem)

        const buttonCheck = document.createElement('button')
        buttonCheck.innerHTML = '<i class="fa-solid fa-check"></i>'
        buttonCheck.classList.add('checkBtn')
        todoDiv.appendChild(buttonCheck)

        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
        deleteButton.classList.add('deleteBtn')
        todoDiv.appendChild(deleteButton)
        todoList.appendChild(todoDiv)

        clear_btn.style.display = 'block'
    })
}

// Function for deleting todos from local storage
function deleteTodosToLocalStorage(todo) {
    let todos
    if (localStorage.getItem('todosItem') == null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todosItem'))
    }
    const todoIndex = todo.children[0].innerHTML
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todosItem', JSON.stringify(todos))
}

// Function to clear todos
function clearTodos() {
    todoList.innerHTML = ''
    // Clear todos from local storage
    localStorage.clear()

    // Checks if the todo list is empty and does not display the clear button 
    if (todoList.innerHTML === '') {
        clear_btn.style.display = 'none'
    } else {
        clear_btn.style.display = 'block'
    }
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
        addTodo()
    }
})
