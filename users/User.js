// importando sequelize 
const Sequelize = require('sequelize');
// importando conexao com o banco
const connection = require('../database/database');

// criando tabela no banco de dados
// allowNull significa not NULL
const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;