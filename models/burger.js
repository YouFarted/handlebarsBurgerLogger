const { selectAll } = require('../config/orm.js');
const orm = require('../config/orm.js');

const burgerModel = {
    // Create
    insertOne: async function (name)
    {

    },

    // Read
    selectAll: async function () {
        return await orm.selectAll("burgers");
    },

    //Update
    updateOne: async function (updateToValue, whereCondition) {
        console.log("in burger.updateOne, updateToValue=", updateToValue);
        console.log("in burger.updateOne, whereCondition=", whereCondition);
        return await orm.updateOne("burgers", updateToValue, whereCondition);
    },

    // Delete
    deleteOne: async function (id)
    {
        return await orm.deleteOne("burgers", id);
    }
}

module.exports = burgerModel;