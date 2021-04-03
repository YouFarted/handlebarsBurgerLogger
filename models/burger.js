const { selectAll } = require('../config/orm.js');
const orm = require('../config/orm.js');

const burgerModel = {
    // Create
    insertOne: async function (name)
    {
        return await orm.insertOne("burgers", {name: name});
    },

    // Read
    selectAll: async function () {
        return await orm.selectAll("burgers");
    },

    //Update
    updateOne: async function (updateToValue, whereCondition) {
        return await orm.updateOne("burgers", updateToValue, whereCondition);
    },

    // Delete
    deleteOne: async function (id)
    {
        return await orm.deleteOne("burgers", id);
    }
}

module.exports = burgerModel;