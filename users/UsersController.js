const express = require('express');
const router = express.Router()
const User = require('./User')
const bcrypt = require('bcryptjs')

// lista de usuarios
router.get('/admin/users', (req, res) => {
    User.findAll().then((users) => {
        res.render('admin/users/index', {
            users: users
        })
    })
});

// criacao de usuario
router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create')
})

// login
router.get('/login', (req, res) => {
    res.render('admin/users/login')
});


// post do login
router.post('/authenticate', (req, res) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        // encontrou o email
        if (user != undefined) {
            // validar senha
            var correct = bcrypt.compareSync(password, user.password);

            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }

            } else {
                res.redirect('/login')
            }
        } else {
            res.redirect('/login')
        }
    })

})

router.post('/users/create', (req, res) => {
    var email = req.body.email
    var password = req.body.password

    // verificando se o email ja foi cadastrado
    User.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if (user == undefined) {

            // variavel para aumentar ainda mais a seguranca
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/')
            }).catch(() => {
                res.redirect('/')
            })
        } else {
            res.redirect('/admin/users/create')
        }
    })
})

module.exports = router