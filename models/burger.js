const orm = require('../config/orm.js');

const burgerModel = {

    selectAll: async function () {
        return await orm.selectAll("burgers")
    }
}

module.exports = burgerModel;