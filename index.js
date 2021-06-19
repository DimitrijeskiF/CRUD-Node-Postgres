const express = require("express")
const app = express();
const pool = require('./db')


app.use(express.json());


//Routes

//get all todo

app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")

        res.json(allTodos.rows)
    } catch (error) {
        console.log(error);
    }
});

//get todo

app.get('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await pool.query(
            `SELECT * FROM todo WHERE todo_id = ${id}`)

        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

//create a todo

app.post('/todos', async (req, res) => {
    try {
        const {
            description
        } = req.body;

        const newTodo = await pool.query("INSERT INTO todo(description) VALUES ($1) RETURNING *",
            [description])

        res.json(newTodo.rows[0]);
    } catch (error) {

    }
})

//update a todo

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params; // where
        const { description } = req.body; //set
        const updateTodo = await pool.query(
            `UPDATE todo
        SET description = $1
        WHERE todo_id = $2`, [description, id]
        )
        res.json('Todo was updated!')

    } catch (error) {
        console.log(error.message);
    }
});

//delete a todo

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params; // where
        const deleteTodo = await pool.query(
            `DELETE
            FROM todo WHERE todo_id = ${id}`
        )
        res.json('Todo was deleted!')

    } catch (error) {
        console.log(error.message);
    }
})

app.listen(3000, () => {
    console.log('Port is listening on port 3000');
})