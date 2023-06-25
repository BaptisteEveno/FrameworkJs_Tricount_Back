const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect : "sqlite",
    storage : "./database.sqlite3"
});
const checkRoute = require('../routing.js');

module.exports = function(req, res) {

    const CatSpend = sequelize.define("cat_spend", {
        title: DataTypes.TEXT,
    });

    const Spend = sequelize.define("spend", {
        userPay: DataTypes.INTEGER,
        amount: DataTypes.FLOAT,
        spendDate: DataTypes.DATE,
        category: DataTypes.TEXT,
        recipient: DataTypes.INTEGER,
    });

    const User = sequelize.define("user", {
        firstName : DataTypes.TEXT,
        lastName : DataTypes.TEXT,
        email : DataTypes.TEXT,
        password : DataTypes.TEXT,
        role : {
            type : DataTypes.TEXT,
            defaultValue : "USER"
        }
    });




    (async () => {
        await sequelize.sync({ force: false });
        checkRoute(req, res);
    })();
}