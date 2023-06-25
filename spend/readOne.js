const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect : "sqlite",
    storage : "./database.sqlite3"
});

module.exports = function(req,res) {

    const Spend = sequelize.define("spend", {
        userPay: DataTypes.INTEGER,
        amount: DataTypes.FLOAT,
        spendDate: DataTypes.DATE,
        category: DataTypes.TEXT,
        recipient: DataTypes.INTEGER,
    });

    (async () => {
        await sequelize.sync({ force: false });
        try {
            let id = req.url.split("/")[2];

            Spend.findAll(
                {
                    raw: true,
                    where : {
                        id : id
                    }
                }
            ).then((data) => {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(data));
            });
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify(error));
        }
    })();
}