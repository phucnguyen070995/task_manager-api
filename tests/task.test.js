const app = require('../src/app')
const request = require('supertest')
const Task = require('../src/model/task')
const {
    userFirst,
    userfirstId,
    userSecond,
    usersecondId,
    task1,
    task2,
    task3,
    setupTestDatabase
} = require('./fixtures/db')
const mongoose = require('mongoose')

beforeEach(setupTestDatabase)

test('Create task for user',  async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userFirst.tokens[0].token}`)
        .send({
            description: "Try to study it 2 days"
        }).expect(201)
    // cach 1: so sanh id cua owner tra ve tu response va userfirstId
    expect(mongoose.Types.ObjectId(response.body.owner)).toEqual(userfirstId)
    // cach 2: tim task bang userfirstId, roi xem task do ton tai trong Task model hay chua
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should show all tasks for user one', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userFirst.tokens[0].token}`)
        .expect(200)
    expect(response.body.length).toBe(2 )
})

test('Should not delete task1 with authorization userSecond', async () => {
    const response = await request(app)
        .delete('/tasks/' + task1._id)
        .set('Authorization', `Bearer ${userSecond.tokens[0].token}`)
        .expect(404)
    const taskOne = Task.findById(task1._id)
    expect(taskOne).not.toBeNull()
})

