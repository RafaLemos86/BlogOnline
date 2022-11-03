// exportando sequelize
const Sequelize = require('sequelize');
// exportando conexao com o banco
const connection = require('../database/database')
// importando model categoria para fazer o relacionamento
const Category = require('../categories/Category')

//criando tabela de artigos
const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// // FUNCAO PARA REALIZAR RELACIONAMENTOS ENTRE TABELAS

// // uma categoria tem muitos artigos (1 x N)
Category.hasMany(Article); //Uma

// //UM artigo pertence a uma categoria (1 para 1)
Article.belongsTo(Category);

// // sempre que alterar relacionamentos nas tabelas,
// // fazer a sincronização no banco de dados nos Models alterados

// executar uma vez e excluir

// Article.sync({
//     force: true
// });

module.exports = Article;