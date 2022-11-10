const express = require('express');
const router = express.Router()
const User = require('./User')


router.get('/admin/users', (req, res) => {
    res.send('Paginacao de usuarios')
})

router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create')
})


// force true: recriar a tabela a cada vez que o codigo rodar
// force false: se a tabela ja existir, cria, se nao, nao cria
// User.sync({
//     force: false
// });


module.exports = router