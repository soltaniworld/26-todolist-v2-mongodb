const items = document.querySelectorAll('.item');
let timeoutId; //needed to reset timer for  debouncing

//add event  listeners for each task/item
items.forEach(item => {
    const checkbox = item.querySelector('input');
    const task = item.querySelector('.task');
    const id = item.querySelector('.input-hidden').value;
    const deleteBtn = item.querySelector('.delete-item');

    //update task completion status on check
    checkbox.addEventListener('click', () => {
        const taskObj = {
            id: id,
            completed: checkbox.checked
        }
        updateTask(taskObj, "/updateTask");
    });
    //update task's text when updated
    task.addEventListener('input', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const taskObj = {
                task: task.innerText,
                id: id
            }
            // Send a POST request with the updated text
            updateTask(taskObj, '/updateTask')
        }, 1000); //delay how frequently the request is sent between changes
    });

    //delete task when button clicked
    deleteBtn.addEventListener('click', () => {
        const taskObj = {
            id: id
        };
        updateTask(taskObj, "/deleteTask", [deleteBtn.parentElement]);
    });

});

// send POST request to /updateTask with updated information to DB
function updateTask(taskObj, route, removeElements = []) {
    fetch(route, {
        method: 'POST',
        body: JSON.stringify(taskObj),
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

//  Open  new list or existing list if "new list" button is clicked and list title is changed
const btnNewList = document.querySelector("#btn-new-list");
btnNewList.addEventListener("click", () => {
    const url = document.querySelector('.list-name').innerText.trim();
    // Redirect to the new URL
    window.location.href = url;
});

// highlight the currently active list in navbar
const menuLinks = document.querySelectorAll('nav a');
const listTitle = document.querySelector('.list-name').innerText;
menuLinks.forEach((link)=>{
    if (link.innerText == listTitle){
        link.classList.add('active');
    }
})