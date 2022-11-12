// conectando ao express
const express = require('express');
// importando express
const app = express();
// importando body-parse
const bodyParser = require('body-parser');
// carregando conexao do banco
const connection = require('./database/database');
// importando express-session
const session = require('express-session')



// importando router do categories
const categoriesController = require('./categories/CategoriesController');
// importando router de articles
const articlesController = require('./articles/ArticleController');
// importando router de users
const usersController = require('./users/UsersController')

// importando tabela categories e tabela articles
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User')


// Carregar o EJS
app.set('view engine', 'ejs');

// configurando sessao
app.use(session({
    secret: 'textoqualquerparaaumentarseguranca',
    cookie: {
        maxAge: 30000000
    }
}));


// carregando arquivos estaticos no express
app.use(express.static('public'))

// configurar body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// CONECTANDO NO BANCO
connection
    .authenticate()
    .then(() => {
        console.log('Conectado com o banco')
    }).catch((error) => {
        console.log(error)
    });

// basicamente, esta funcao serve para informar o index para usar as rotas do categories
app.use('/', categoriesController);
app.use('/', articlesController);
app.use('/', usersController);


// ROTAS


// rota principal
app.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'desc']
        ],
        limit: 4
    }).then(articles => {

        Category.findAll().then(categories => {
            res.render('index', {
                articles: articles,
                categories: categories
            })
        })
    })

});

// rota para exibir as a categoria selecionada pelo botao
app.get('/:slug', (req, res) => {
    var slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render('article', {
                    article: article,
                    categories: categories
                });
            });
        } else {
            res.redirect('/')
        }
    }).catch(error => {
        res.redirect('/');
    });
});

// rota para entrar na pagina de cada categoria pelo slug
app.get('/category/:slug', (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        // JOIN COM O ARTIGO
        include: [
            {
                model: Article
            }
        ]
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render('index',
                    {
                        articles: category.articles,
                        categories: categories
                    })
            });
        } else {
            res.redirect('/')
        }
    }).catch(error => {
        res.redirect('/')
    })
});





// iniciar aplicacao 
app.listen(8080, () => {
    console.log('servidor aberto na porta 8080')
});