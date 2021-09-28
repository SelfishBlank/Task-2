let add = document.getElementById('add')
let inp = document.querySelector('.inp1')
let todoList = document.querySelector('.todo-list')
let five = document.querySelector('.five')
let AllActiveTasks = document.querySelector('.AllActiveTasks')
let AllCompleted = document.querySelector('.AllCompleted')
let ClearCompletedTasks = document.querySelector('.ClearCompletedTasks')
let All = document.querySelector('.All')


let tasks = []
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))






let AllItemElems = [];

function Task(description){
    this.description = description;
    this.completed = false;
}


const createTemplate = (task, index) => {
    return `
    <div class="todo-item ${task.completed ? 'checked' : ''}">
        <div class="description">${task.description}</div>
        <div class="buttons">
            <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
            <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
        </div>
    </div>
    `
}



const filterList = () => {
    const allActiveTasks = tasks.length && tasks.filter((item => item.completed == false))
    const allCompletedTasks = tasks.length && tasks.filter((item => item.completed == true))
    tasks = [...allActiveTasks,...allCompletedTasks]
}


const fillHtml = () => {
    todoList.innerHTML = '';
    if(tasks.length > 0){
        filterList();
        tasks.forEach((item, index) => {
            todoList.innerHTML += createTemplate(item, index)
        })
    }
    // Item counter
    five.textContent = tasks.length
    AllItemElems = document.querySelectorAll('.todo-item ')
}

fillHtml();


const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}





add.addEventListener('click', () => {
    tasks.push(new Task(inp.value))
    updateLocal();
    fillHtml();
    inp.value = '';
})



const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
        AllItemElems[index].classList.add('checked')
    } else {
        AllItemElems[index].classList.remove('checked')
    }
    updateLocal();
    fillHtml();
}





const deleteTask = index => {
    AllItemElems[index].classList.add('delition')
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtml();
    }, 500)
   // Item counter
   five.textContent = tasks.length
}


// СВЕРНУТЬ COMPLETED TASKS
AllActiveTasks.addEventListener('click', () => {
    fillHtml();
    for(let i = 0; i < AllItemElems.length; i++){
        if(AllItemElems[i].classList[1] == 'checked'){
            AllItemElems[i].style.display = 'none'
        }
    }
})




// СВЕРНУТЬ ACTIVE TASKS   == ПОКАЗАТЬ ТОЛЬКО COMPLETED TASKS
AllCompleted.addEventListener('click', () => {
    fillHtml();
    for(let i = 0; i < AllItemElems.length; i++){
        if(AllItemElems[i].classList[1] == undefined){
            AllItemElems[i].style.display = 'none'
        }
    }
})




// CLEAR COMPLETED
ClearCompletedTasks.addEventListener('click', () => {
    fillHtml();
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].completed){
            tasks.splice(i)
        }
    }
    updateLocal();
    fillHtml();
})




// SHOW ALL ITEMS
All.addEventListener('click', () => {
    fillHtml();
})