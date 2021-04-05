const app = require('../src/app')
const request = require('supertest')
const User = require('../src/model/user')
const {userFirst, userfirstId, setupTestDatabase } = require('./fixtures/db')

beforeEach(setupTestDatabase)

test('Sign up a new user',  async () => {
    await request(app).post('/users').send({
        name: 'Phuc',
        email: 'phuc.nguyen070995@hcmut.edu.vn',
        password: '12345678'
    }).expect(201)
})

test('Should login existing user',  async () => {
    const response = await request(app).post('/users/login').send({
        email: 'phuc@gmail.com',
        password: '12345678'
    }).expect(200)
    const user = await User.findById(userfirstId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexisting user',  async () => {
    await request(app).post('/users/login').send({
        email: 'phuc.nguyen070995@gmail.com',
        password: '12345679' 
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userFirst.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthorization user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userFirst.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(response.body._id)
    expect(user).toBeNull()
})

test('Should not delete account for unauthorization user', async () => {  
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userFirst.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/avatar.jpg')
        .expect(200)
    const user = await User.findById(userfirstId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userFirst.tokens[0].token}`)
        .send({
            name: 'Phuc updated'
        })
        .expect(200)
    const user = await User.findById(userfirstId)
    expect(user.name).toBe('Phuc updated')
})

test('Should not update invalid user field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userFirst.tokens[0].token}`)
        .send({
            location: 'quan 7'
        })
        .expect(400)
})