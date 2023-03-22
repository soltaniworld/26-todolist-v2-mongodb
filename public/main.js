const checkboxes = document.querySelectorAll('.checkbox');

checkboxes.forEach(checkbox => {
    console.log(checkbox.name);
    checkbox.addEventListener('click', () => {
        console.log(`${checkbox.name} is ${checkbox.checked? 'checked' : 'unchecked'}`);

        fetch('/update', {
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

console.log('main.js loaded');