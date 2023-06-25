const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect : "sqlite",
    storage : "./database.sqlite3"
});

/*Pour chaque dépense nous devons pouvoir savoir qui a payé, combien iel a payé, quand iel a payé, pour qui iel a payé et de quel catégorie de dépense il
s'agit.*/

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
            let body = "";

            // Listen for data event
            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            // Listen for end event
            req.on("end", async () => {
                Spend.create(JSON.parse(body)).then((data) => {
                    Spend.findAll({ raw: true }).then((data) => {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify(data));
                    });
                });
            });
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify(error));
        }
    })();
}