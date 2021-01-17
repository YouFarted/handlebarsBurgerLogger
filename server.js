var orm = require("./config/orm.js");

async function main() {
    // Find all the pets ordering by the lowest price to the highest price.
    await orm.selectAndOrder("animal_name", "pets", "price");

    // Find a pet in the pets table by an animal_name of Rachel.
    await orm.selectWhere("pets", "animal_name", "Rachel");

    // Find the buyer with the most pets.
    await orm.findWhoHasMost("buyer_name", "buyer_id", "buyers", "pets");

    await orm.close()
}

main()

