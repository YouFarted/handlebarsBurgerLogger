const orm = require('../config/orm.js');

const burgerModel = {

    selectAll: async function () {
        return await orm.selectAll("burgers");
    },

    updateOne: async function (updateToValue, condition) {
        return await orm.updateOne("burgers", condition);
    }
}

module.exports = burgerModel;