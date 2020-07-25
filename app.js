//Selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event listeners
document.addEventListener('DOMContentLoaded',getTodos);

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// Functions

    function addTodo(event){
        //prevent form from submitting
        event.preventDefault();
        // console.log('Hello');
        var value = todoInput.value;
            value = value.trim();
        if (value != "") {
            // to do Div
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
            //create <li>
            const newTodo = document.createElement('li');
            newTodo.innerHTML = todoInput.value;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);

            //Esto hicimos casi al final, agregamos los todos al localStorage
            //ADD TODO TO LOCALSTORAGE
            saveLocalTodos(todoInput.value);

            //check mark button
            const completedButton = document.createElement("button");
            //completedButton.innerText = "<i class='fa fa-check'></i>";
            completedButton.innerText = "Completar";
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);
            //check trash button
            const trashButton = document.createElement("button");
            // trashButton.innerText = "<i class='fas fa-trash'></i>";
            trashButton.innerText = "Eliminar";
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            // APPEND TO LIST
            todoList.appendChild(todoDiv);
            //Clear todo input value
            todoInput.value = "";
        } else {
            alert('Ingrese una tarea');
            todoInput.value = "";
        }
    }

    function deleteCheck(event){
        //prevent form from submitting
        //event.preventDefault();
        // console.log('Hello');
        // mostrar el evento por conosla
        //console.log(event.target);
        const item = event.target;
        // console.log('1: ',item.parentElement);
        //console.log('2:',item.parentElement.classList);
 
        //DELETE
        if(item.classList[0] === 'trash-btn'){
            const todo = item.parentElement;
            // Animation
            todo.classList.add('fall');
            
            // llamamos a la funcion que elimina los todos del localStorage
            removeLocalTodos(todo);

            todo.addEventListener('transitionend', function () {
                todo.remove();
            });
        }

        if(item.classList[0] === 'complete-btn'){
            const todo = item.parentElement;
            todo.classList.toggle('completed');
        }
    }

    function filterTodo(event){
        const todos = todoList.childNodes;
        // console.log(todos);
         console.log(event.target.value);
        todos.forEach(function(todo){
            switch(event.target.value){
                case 'all':
                    todo.style.display = "flex";
                    break;
                case 'completed':
                    if(todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }else{
                        todo.style.display = "none";
                    }
                    break;
                case 'uncompleted':
                    if(!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }else{
                        todo.style.display = "none";
                    }
                    break;
            }
        });
    }

    //Local storage
    function saveLocalTodos(todo){
        // CHECK --- Hey DO I already have thing in there?
        let todos;
        if (localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos',JSON.stringify(todos));
    }

    function getTodos(){
        let todos;
        if (localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.forEach(function(todo){
            //copiamos lo que hicimos al principio
            // to do Div
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
            //create <li>
            const newTodo = document.createElement('li');
            newTodo.innerHTML = todo;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo); 
            // Eliminamos lo de localStorage que hace arriba porque aca no lo necesitamos
            //check mark button
            const completedButton = document.createElement("button");
            //completedButton.innerText = "<i class='fa fa-check'></i>";
            completedButton.innerText = "Completar";
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);
            //check trash button
            const trashButton = document.createElement("button");
            // trashButton.innerText = "<i class='fas fa-trash'></i>";
            trashButton.innerText = "Eliminar";
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);
            // APPEND TO LIST
            todoList.appendChild(todoDiv);
        })
    }

    function removeLocalTodos(todo){
        let todos;
        if(localStorage.getItem("todos") === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        // const todoIndex;
        //mostrar lo children, seleccionamos la primera poscicion
        // console.log(todo.children);
        //ver el valor
        // console.log(todo.children[0].innerText);
        //ver el index de un valor
        // console.log(todos.indexOf("apple"));
        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex),1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }