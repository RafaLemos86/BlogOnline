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

// force true: recriar a tabela a cada vez que o codigo rodar
// force false: se a tabela ja existir, cria, se nao, nao cria
// User.sync({
//     force: false
// });

module.exports = User;