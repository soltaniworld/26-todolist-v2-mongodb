const items = document.querySelectorAll('.item');
let timeoutId; //needed to reset timer for  debouncing

//add event  listeners for each task/item
items.forEach(item => {
    const checkbox = item.querySelector('input');
    const task = item.querySelector('.task');
    const deleteBtn = item.querySelector('.delete-item');

    //update  task completion status on check
    checkbox.addEventListener('click', () => {
        const taskObj = {
            id: checkbox.name,
            completed: checkbox.checked
        }
        console.log(taskObj);
        updateTask(taskObj, "/updateTask");
    });
    //update task's  text when updated
    task.addEventListener('input', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const taskObj = {
                task: task.innerText,
                id: task.id
            }
            // Send a POST request with the updated text
            updateTask(taskObj, '/updateTask')
        }, 1000);
    });

    //delete task when button clicked
    deleteBtn.addEventListener('click', () => {
        const taskObj = {
            id: task.id
        };
        updateTask(taskObj, "/deleteTask", [deleteBtn.parentElement]);
    });

});

// send POST request to /updateTask with updated information to DB
function updateTask(taskObj, route, removeElements = []) {
    const id = taskObj.id;
    const completed = taskObj.completed;
    const task = taskObj.task;
    
    fetch(route, {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            completed: completed ? true : false,
            task: task
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('POST request sent successfully.');
            removeElements.forEach((e)=>{
                e.remove();
            })
        } else {
            throw new Error('POST request failed.');
        }
    })
    .catch(error => {
        console.error(error);
    });
}

//on load, focus on todo input text
window.onload = function () {
    const myTextInput = document.querySelector("#new-item-input");
    myTextInput.focus();
}

const btnNewList = document.querySelector("#btn-new-list");

btnNewList.addEventListener("click", () => {
    const url = document.querySelector('.list-name').innerText.trim();
    // Redirect to the new URL
    window.location.href = url;
})