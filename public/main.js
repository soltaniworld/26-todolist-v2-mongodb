const checkboxes = document.querySelectorAll('.checkbox');

checkboxes.forEach(checkbox => {
    console.log(checkbox.name);
    checkbox.addEventListener('click', () => {
        // Handle checkbox click event
        if (checkbox.checked) {
            console.log(`${checkbox.name} is checked`);

            fetch('/update', {
                method: 'POST',
                body: JSON.stringify({ 
                    id: checkbox.name,
                    completed: true }),
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
        }
        else {
            console.log(`${checkbox.name} is unchecked`);
        }
    });
});

console.log('main.js loaded');