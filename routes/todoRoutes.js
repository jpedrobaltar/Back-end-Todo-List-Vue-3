const router = require("express").Router()

const Todo = require('../models/Todo')

//Create -  criação de dados
router.post('/', async (req, res) => {
    //req,body
    const {tarefa, tipo, data, done} = req.body

    if (!tarefa) {
        res.status(422).json({error : 'tarefa obrigatoria'})
        return
    }

    const todo = {
        tarefa,
        tipo,
        data,
        done
    }

    try {
        //criando dados
       let create =  await Todo.create(todo)
       console.log("create", create)

        res.status(201).json({id:create._id, message: 'tarefa inserida no sistema com sucesso'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Read - leitura de dados
router.get('/', async (req, res) => {

    try{

        const todos = await Todo.find()

        res.status(200).json(todos)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    //extrair o dado da requisição pela url = req.params 
    const id = req.params.id

    try {
        
        const todo = await Todo.findOne({_id: id})
        

        if (!todo) {
            res.status(422).json({message: 'A tarefa não foi encontrado'})
            return
        }
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Update - atualização de dados( PUT, PATCH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {tarefa, tipo, data, done} = req.body

    const todo = {
        tarefa,
        tipo,
        data,
        done,
    }

    try {

        const updatedTodo = await Todo.updateOne({_id: id}, todo)
        if (updatedTodo.matchedCount === 0) {
            res.status(422).json({message: 'A tarefa não foi encontrado'})
            return
        }

        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Delete - deletar dados
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const todo = await Todo.findOne({_id: id})
        
    if (!todo) {
        res.status(422).json({message: 'A tarefa não foi encontrado'})
        return
    }
    try {
        
        await Todo.deleteOne({_id: id})

        res.status(200).json({message: 'Tarefa deletada com sucesso'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

module.exports = router