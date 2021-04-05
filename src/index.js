const app = require('./app')
const port = process.env.PORT

// app.use((req, res, next) => {
//     res.status(503).send('This server is mataining!')
// })

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

// const User = require('./model/user')
// const Task = require('./model/task')

// const main = async () => {
//     const user = await User.findById('6062f1a5d19bb513547db8aa')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)

//     // const task = await Task.findById('6062f3f5d0444c2e7c37840a') 
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
// }

// main()