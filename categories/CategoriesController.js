// importando express
const express = require('express');
// importando objeto para controlar as rotas
const router = express.Router();
// importando model de categoria
const Category = require('./Category')
// importando slug
const slugify = require('slugify')

// rota do formulario de categorias
router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new');
});


// rota para listar categorias
// FINDALL esta mandando os dados da tabela category para a rota
router.get('/admin/categories', (req, res) => {
    Category.findAll()
        .then(categories => {
            res.render('admin/categories/index', {
                categories: categories
            });
        })

});

// findByPk esta pesquisando o id
// rota para editar uma categoria
router.get('/admin/categories/edit/:id', (req, res) => {
    var id = req.params.id

    if (isNaN(id)) {
        res.redirect('/admin/categories')
    }

    Category.findByPk(id)
        .then(category => {
            if (category != undefined) {
                res.render('admin/categories/edit', {
                    category: category
                })
            } else {
                res.redirect('/admin/categories')
            }
        }).catch(erro => {
            res.redirect('/admin/categories')
        })

});



// rota para salvar os dados do formulario de categorias
router.post('/categories/save', (req, res) => {
    var title = req.body.title
    if (title != undefined) {
        // salvando titulo no banco de dados
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/admin/categories')
        })
    } else {
        res.redirect('/admin/categories/new');
    }
});

// rota para exluir dados da categoria
// metodo Destroy serve para excluir do banco
router.post('/categories/delete', (req, res) => {
    var id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories');
            })
        } else { //NAO FOR NUMERO
            res.redirect('/admin/categories');
        }
    } else { // NULL
        res.redirect('/admin/categories');
    };
});

// rota para atualizar categorias
// atualizar titulo WHERE id = id
router.post('/categories/update', (req, res) => {
    var id = req.body.id
    var title = req.body.title


    Category.update({
        title: title,
        slug: slugify(title)
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/categories')
    })
})




// exportando a rota para o index
module.exports = router