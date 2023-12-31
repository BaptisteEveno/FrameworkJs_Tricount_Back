const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect : "sqlite",
    storage : "./database.sqlite3"
});

module.exports = function(req,res) {

    const User = sequelize.define("user", {
        firstName : DataTypes.TEXT,
        lastName : DataTypes.TEXT,
        email : DataTypes.TEXT,
    });

    (async () => {
        await sequelize.sync({ force: false });
        try {
            User.findAll({ raw: true }).then((data) => {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(data));
            });
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify(error));
        }
    })();
}