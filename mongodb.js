const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertMany([
    //     {
    //         name: 'Ha',
    //         age: 28
    //     },{
    //         name: 'Linh',
    //         age: 1
    //     },{
    //         name: 'Khai',
    //         age: 33
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Error!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Clean house',
    //         complete: false
    //     },{
    //         description: 'Study NodeJs',
    //         complete: false
    //     },{
    //         description: 'Study Database Systems',
    //         complete: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Error!')
    //     }

    //     console.log(result.ops)
    // })
    // db.collection('users').findOne({name: 'Phuc'}, (error, user) => {
    //     if (error) {
    //         return console.log('Error!')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').updateOne({
    //     _id: new mongodb.ObjectID("604f85aef7dc7814984ab0f9")
    // }, {
    //     $inc: {
    //         age: -3
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     complete: false
    // }, {
    //     $set: { 
    //         complete: true
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('users').deleteMany({
        name: 'Nam'
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })


})