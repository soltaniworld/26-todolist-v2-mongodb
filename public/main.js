const checkboxes = document.querySelectorAll('.checkbox');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        console.log(`${checkbox.name} is ${checkbox.checked? 'checked' : 'unchecked'}`);

        fetch('/taskChecked', {
            method: 'POST',
            body: JSON.stringify({
                id: checkbox.name,
                completed: checkbox.checked
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log('POST request sent successfully.');
                } else {
                    throw new Error('POST request failed.');
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
});

//add listener for deleting a task
const deleteButtons = document.querySelectorAll('.delete-item');

deleteButtons.forEach((button) => {
    const checkbox = button.parentElement.querySelector(".checkbox");
    button.addEventListener('click', () => {
        // do something when the X button is clicked
        fetch('/deleteTask', {
            method: 'POST',
            body: JSON.stringify({
                id: checkbox.name
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log('POST request to DELETE sent successfully.');
                    button.parentElement.remove();
                } else {
                    throw new Error('POST request  to DELETE failed.');
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
});


//on load, focus on todo input text
window.onload = function () {
    const myTextInput = document.querySelector("#new-item-input");
    myTextInput.focus();
}

console.log('main.js loaded');


//  update task if editted using rebouncing to delay updating DB quickly
const tasks = document.querySelectorAll('.task');
let timeoutId;

tasks.forEach(task => {
    task.addEventListener('input', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const text = task.innerText;
            const id=task.id;

            // Send a POST request with the updated text
            fetch('/updateTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    text: text,
                    id: id
                 })
            })
                .then(response => {
                    // Handle the response from the server
                    console.log(response);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }, 1000);
    });
});


// redirect once todo list title updated
//WORK  IN PROGRESS
const editableDiv = document.getElementById('editableDiv');
let timeoutId;

editableDiv.addEventListener('input', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        const url = editableDiv.innerText.trim();

        // Redirect to the new URL
        window.location.href = url;
    }, 500);
});