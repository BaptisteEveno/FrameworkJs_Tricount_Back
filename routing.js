const createUser = require("./users/create.js");
const readAllUsers = require("./users/readAll.js");
const readOneUser = require("./users/readOne.js");
const updateUser = require("./users/update.js");
const deleteUser = require("./users/delete.js");

const createSpendCat = require("./spend-categories/create.js")
const readAllSpendCat = require("./spend-categories/readAll.js")
const readOneSpendCat = require("./spend-categories/readOne.js")
const updateSpendCat = require("./spend-categories/update.js")
const deleteSpendCat = require("./spend-categories/delete.js")

const createSpend = require("./spend/create.js")
const readAllSpend = require("./spend/readAll.js")
const readOneSpend = require("./spend/readOne.js")
const updateSpend = require("./spend/update.js")
const deleteSpend = require("./spend/delete.js")


module.exports = function (req, res) {
    if (req.url === "/users" && req.method === "POST") {
        // create a user
        createUser(req, res);
    } else if (req.url === "/users" && req.method === "GET") {
        // get all users
        readAllUsers(req, res);
    } else if (req.url.match(/\/users\/\d+$/) && req.method === "GET") {
        // get the user with the specified id
        readOneUser(req, res);
    } else if (req.url.match(/\/users\/\d+/) && req.method === "PUT") {
        // update the user with the specified id
        updateUser(req, res);
    } else if (req.url.match(/\/users\/\d+/) && req.method === "DELETE") {
        // delete the user with the specified id
        deleteUser(req, res);
    } else if (req.url === "/spend-cat" && req.method === "GET") {
        // get all categories spend
        readAllSpendCat(req, res);
    } else if (req.url === "/spend-cat" && req.method === "POST") {
        // create a spend Categories
        createSpendCat(req, res);
    }  else if (req.url.match(/\/spend-cat\/\d+$/) && req.method === "GET") {
        // get the spend categories with the specified id
        readOneSpendCat(req, res);
    } else if (req.url.match(/\/spend-cat\/\d+/) && req.method === "PUT") {
        // update the spend categories with the specified id
        updateSpendCat(req, res);
    } else if (req.url.match(/\/spend-cat\/\d+/) && req.method === "DELETE") {
        // delete the spend categories with the specified id
        deleteSpendCat(req, res);
    }  else if (req.url === "/spend" && req.method === "POST") {
        // create a spend
        createSpend(req, res);
    }  else if (req.url.match(/^\/spend\/\d+$/) && req.method === "GET") {
        // read a spend with the specified id
        readOneSpend(req, res);
    } else if (req.url === "/spend" && req.method === "GET") {
        // get all Spend
        readAllSpend(req, res);
    } else if (req.url.match(/\/spend\/\d+/) && req.method === "PUT") {
        // update the spend with the specified id
        updateSpend(req, res);
    } else if (req.url.match(/\/spend\/\d+/) && req.method === "DELETE") {
        // delete the spend with the specified id
        deleteSpend(req, res);
    }
}