# Todo List

This is a web-based todo list application that allows users to create multiple lists, add tasks to each list, edit tasks, and delete tasks. The application is built using HTML, CSS, JavaScript, Express.js, Node.js, MongoDB, and Mongoose.

## Installation

To use the application, follow these steps:

1. Clone the repository to your local machine.
2. Close the repository.
3. Edit the Mongoose connection string inside the `/model/connection.js` file to point to your own MongoDB cluster.
4. If you're using dotenv, rename the `.env_EXAMPLE` file to `.env`, and replace the `db`, `db_USER`, `db_PW`, and `db_cluster` variables with your own MongoDB cluster credentials.
5. Install the dependencies by running `npm install` in your terminal.
6. Start the server by running `npm start`.
7. Open the application in your web browser at `http://localhost:3000`.

## Usage

To use the application, follow these steps:

1. Create a new list by clicking the current list name, editting the text to a new name, and clicking the "new list" button on the right side of the title.
2. Add tasks to the list by clicking the "New Item" input section at the bottom of the list, entering a task name, and pressing enter.
3. Edit a task by clicking the task name, making your changes, and the changes are automatically saved.
4. Delete a task by clicking the "X" button next to the task.
5. To cross out a task, click the checkbox on the left side of the task
6. All existing lists will be listed in the top navbar.
7. Once a list has no items/ tasks, the list will be removed from the navbar and database

## Contributing

If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the original repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
