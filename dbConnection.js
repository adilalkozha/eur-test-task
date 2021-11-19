const { Sequelize } = require('sequelize');

const sequlize = new Sequelize('eurbank','adil','adil', {
    host: 'localhost',
    dialect: 'postgres'
})

const checkConnection = async () => {
    try {
        await sequlize.authenticate();
        console.log('Connection start.');
    } catch (err) {
        console.log('Error with connection:', err);
    }
}

checkConnection()

module.exports = sequlize
