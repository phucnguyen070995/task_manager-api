const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/model/user')
const Task = require('../../src/model/task')

const userfirstId = new mongoose.Types.ObjectId()
const usersecondId = new mongoose.Types.ObjectId()

const userFirst = {
    _id: userfirstId,
    name: 'Phuc',
    email: 'phuc@gmail.com',
    password: '12345678',
    tokens: [{
        token: jwt.sign({ _id: userfirstId}, process.env.JWT)
    }]
}

const userSecond = {
    _id: usersecondId,
    name: 'Thao',
    email: 'thao@gmail.com',
    password: '12345678',
    tokens: [{
        token: jwt.sign({ _id: usersecondId}, process.env.JWT)
    }]
}

const task1 = {
    _id: mongoose.Types.ObjectId(),
    description: "One task",
    completed: false,
    owner: userfirstId
}

const task2 = {
    _id: mongoose.Types.ObjectId(),
    description: "Two task",
    completed: true,
    owner: userfirstId
}

const task3 = {
    _id: mongoose.Types.ObjectId(),
    description: "Three task",
    completed: false,
    owner: usersecondId
}


const setupTestDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userFirst).save()
    await new User(userSecond).save()
    await new Task(task1).save()
    await new Task(task2).save()
    await new Task(task3).save()
}

module.exports = {
    userFirst,
    userfirstId,
    userSecond,
    usersecondId,
    task1,
    task2,
    task3,
    setupTestDatabase
}