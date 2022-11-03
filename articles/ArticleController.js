// importando express
const express = require('express');
// importando variavel router
const router = express.Router();
// importando model category para enviar na view artigos
const Category = require('../categories/Category');
// importando Model
const Article = require('./Article.js')
// importando slug
const slugify = require('slugify')


// enviando os dados de artcle para a view
// DENTRO DO FINDALL ESTA SENDO FEIO UM JOIN
// para informar o NOME da categoria na view
router.get('/admin/articles', (req, res) => {
    Article.findAll({
        // JOIN
        include: [{
            model: Category
        }]
    }).then((articles) => {
        res.render('admin/articles/index', {
            articles: articles
        })
    })

});

// criar novo artigo
// enviando lista de categorias para view de artigos
router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {
            categories: categories
        })
    })

});

// salvando artigo
router.post('/admin/article/save', (req, res) => {
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        // FK da tabela
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles')
    })
})


// rota para exluir dados do artigo
// metodo Destroy serve para excluir do banco
router.post('/articles/delete', (req, res) => {
    var id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles');
            })
        } else { //NAO FOR NUMERO
            res.redirect('/admin/articles');
        }
    } else { // NULL
        res.redirect('/admin/articles');
    };
});


// rota para carregar pagina de edicao
router.get('/admin/articles/edit/:id', (req, res) => {
    var id = req.params.id

    if (isNaN(id)) {
        res.redirect('/admin/articles')
    }

    Article.findByPk(id)
        .then(article => {
            if (article != undefined) {
                Category.findAll().then(categories => {
                    res.render('admin/articles/edit', {
                        article: article,
                        categories: categories
                    })
                })
            } else {
                res.redirect('/admin/article')
            }
        }).catch(erro => {
            res.redirect('/admin/article')
        })
});

router.post('/article/save', (req, res) => {
    var id = req.body.id
    var title = req.body.title
    var body = req.body.body

    Article.update({
        title: title,
        slug: slugify(title),
        body: body
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/articles')
    })
})

// salvando a edicao do artigo no banco
router.post('/article/update', (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category

    Article.update({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/articles')
    }).catch(error => {
        res.redirect('/')
    })
})


// numeracao das paginas
router.get('/articles/page/:num', (req, res) => {
    var page = req.params.num;
    var offset = 0;

    if (isNaN(page) || page == 1) {
        offset = 0;
    } else {
        offset = (parseInt(page) - 1) * 4
    }

    Article.findAndCountAll({
        limit: 4, //limita quantidade de perguntas da pagina
        offset: offset,
        order: [
            ['id', 'desc']
        ]
    }).then(articles => {
        var next;

        if (offset + 4 >= articles.count) {
            next = false
        } else {
            next = true
        }

        var result = {
            page: parseInt(page),
            articles: articles,
            next: next
        }

        Category.findAll().then(categories => {
            res.render('admin/articles/page', {
                categories: categories,
                result: result
            })
        })
    }).catch(error => {
        res.redirect('/')
    })

});





// exportando a rota para o index
module.exports = router;