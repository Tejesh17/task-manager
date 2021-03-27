const express = require('express')
const { model, update } = require('../models/user')
const User = require('../models/user')
const router = new express.Router()


router.post('/users', async (req, res) => {

    const user = new User(req.body)

    try{
        successful = await user.save()
        if (successful){
        res.status(201).send(user)

        }else {
            console.log('error')
        }

    } catch(e){
        throw new Error (e),
        res.status('400').send(e)
    }

})

router.post('/users/login', async(req,res) =>{
    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        // console.log(user)

        res.send(user)
    } catch(e){
        // console.log(e)
        // throw new Error(e),
        res.status(400).send(e)
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
        const user = await User.findById(req.params.id)
        updates.forEach((update)=> user[update]= req.body[update])
        await user.save()
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