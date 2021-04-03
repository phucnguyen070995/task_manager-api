const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology: true
})

// const User = mongoose.model('Users', {
//     name: {
//         type: String,
//         require: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         require: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         },
//         trim: true,
//         lowercase: true
//     },
//     age: {
//         type: Number,
//         validate(value) {
//             if (value <= 0) {
//                 throw new Error('Age must be a positive number!')
//             } 
//         },
//         default: 1
//     },
//     password: {
//         type: String,
//         minlength: 7,
//         require: true,
//         trim: true,
//         validate(value) {
//             if (value.toLowerCase().includes("password")) {
//                 throw new Error('PASSWORD must not in your password!')
//             } 
//         }
//     }
// })

// const me = new User({
//     name: '         Toan        ',
//     email: '         TOAN@gmail.com           ',
//     age: 60,
//     password: 'PASSWOR123'
// })  

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

// const Task = mongoose.model('Tasks', {
//     description: {
//         type: String,
//         trim: true,
//         require: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const mytask = new Task({
//     description: '               Study NodeJs        '
// })

// mytask.save().then(() => {
//     console.log(mytask)
// }).catch((error) => {
//     console.log('Error!', error)
// })