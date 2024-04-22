const config = require('./index');

module.exports = {

    development: {
        storage: config.dbFile,
        dialect: "sqlite",
        seederStorage: "sequelize",
        logQueryParameters: true,
        typeValidation: true
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        seederStorage: 'sequelize',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        define: {
            schema: process.env.SCHEMA
        }
    }
};


// const db = config.db;
// const username = db.username;
// const password = db.password;
// const database = db.database;
// const host = db.host;
// const schema = db.schema;


    // development: {
    //     username,
    //     password,
    //     database,
    //     host,
    //     dialect: 'sqlite',
    //     seederStorage: 'sequelize'
    // },