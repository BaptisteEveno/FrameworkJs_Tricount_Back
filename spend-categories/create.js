const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect : "sqlite",
    storage : "./database.sqlite3"
});

module.exports = function(req,res) {

    const CatSpend = sequelize.define("cat_spend", {
        title: DataTypes.TEXT,
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
                CatSpend.create(JSON.parse(body)).then((data) => {
                    CatSpend.findAll({ raw: true }).then((data) => {
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