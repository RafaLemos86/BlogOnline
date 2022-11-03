// importando sequelize 
const Sequelize = require('sequelize');
// importando conexao com o banco
const connection = require('../database/database');

// criando tabela no banco de dados
// allowNull significa not NULL
const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// sempre que alterar relacionamentos nas tabelas,
// fazer a sincronização no banco de dados nos Models alterados

// executar uma vez e excluir

// Category.sync({
//     force: true
// });

// exportando tabela
module.exports = Category;