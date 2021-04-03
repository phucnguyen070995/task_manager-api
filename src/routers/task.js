const express = require('express')
const Task = require('../model/task')
const router = new express.Router()
const auth = require('../middleware/auth')
const mongoose = require('mongoose')

router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true' 
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc'?-1:1
    }

    try {
        const user  = req.user
        await user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(user.tasks)
    } catch (e) {
        res.status(500).send()
    }

    // try {
    //     // Dung filter ma thay hoi ngao
    //     // const tasks = (await Task.find({})).filter((task) => task.owner.toString() === req.user._id.toString())

    //     // Dung find()
    //     const tasks = await Task.find({owner: req.user._id})
    //     res.send(tasks)
    // } catch (e) {
    //     res.status(500).send()
    // }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task  = await Task.findOne({_id, owner: req.user._id})
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch(() => {
    //     res.status(500).send()
    // })
})

router.post('/tasks', auth, async (req, res) =>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const validUpdates = ['completed','description']
    const isValid = updates.every((update) => validUpdates.includes(update))

    if (!isValid) {
        return res.status(400).send({error: 'Invalid update!'})
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
    
})

module.exports = router