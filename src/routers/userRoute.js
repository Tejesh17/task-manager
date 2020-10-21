const express = require('express')
const { model } = require('../models/user')
const User = require('../models/user')
const router = new express.Router()


router.post('/users', async (req, res) => {

    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status('400').send(error)
    }

})


router.get('/users', async (req, res) => {

    try{
        const user = await User.find({})
        res.status(200).send(user)
    } catch(e){
        res.status('501').send(e)
    }


})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch (e) {
        res.status(500).send(e)
    }

})

router.patch('/users/:id', async (req,res) => {
    const allowedUpdates= ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)
    const isValid = updates.every((updates) => allowedUpdates.includes(updates))

    if(!isValid){
        return res.status(404).send({error: 'Invalid update!'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req,res) => {
    
    try{ 
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) {
            return res.status(404).send()
        } 
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send(e)
    }

})

module.exports = router