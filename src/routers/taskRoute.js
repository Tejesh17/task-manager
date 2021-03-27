const express = require('express')
const Task = require('../models/task')
const router = express.Router()


router.post('/tasks', async (req, res) => {

    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch(e){
        res.status('400').send(e)
    }


})

router.get('/tasks', async (req, res) => {

    try{
        const task = await Task.find({})
        res.status(200).send(task)
    } catch(e){
        res.status('501').send(e)
    }

})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch (e) {
        res.status(500).send(e)
    }
})



router.patch('/tasks/:id', async (req,res) => {

    const allowedUpdates= ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValid = updates.every((updates) => allowedUpdates.includes(updates))

    if(!isValid){
        return res.status(404).send({error: 'Invalid update!'})
    }

    try {
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=> task[update]= req.body[update])
        task.save()
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})



router.delete('/tasks/:id', async (req,res) => {
    
    try{ 
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) {
            return res.status(404).send()
        } 
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})

module.exports = router