const mongoose = require('mongoose')

const Todo = mongoose.model('Todo', {
    tarefa: String,
    tipo: String,
    data: String,
    done: Boolean
})

module.exports = Todo