// importar sequelize
const Sequelize = require('sequelize');

// conectando / Nome banco / user / senha
const connection = new Sequelize('gerenciadorconteudo', 'root', '0000', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
    timezone: '-03:00'
});

module.exports = connection