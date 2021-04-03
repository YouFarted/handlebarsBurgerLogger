const jqDevouredParent = $("#devoured-parent");
const jqUndevouredParent = $("#undevoured-parent");
const jqAddBurgerForm = $("#add-new-burger-form");
const jqFormBurgerName = $("#form-burger-name");

function main() {

    jqDevouredParent.on("click", async function (ev) {
        try {
            ev.preventDefault();
            const target = ev.target;
            console.log("ev.target.type:", ev.target.type);
            if (target.type !== "submit") {
                return;
            }
            console.log("You clicked on one of my devoured children");
            const itemId = target.getAttribute("data-id");
            console.log("data-id: ", itemId);
            // clicking on an devoured one makes it restore to undevoured.
            // <shrugs> a little funny, right? !!!!

            const ajaxPutResults = await $.ajax(`/api/burgers/${itemId}`, { method: "PUT", data: { devoured: false } });

            console.log("ajaxPutResults: ", ajaxPutResults);
            location.reload();
        }
        catch (ex) {
            console.error(ex);
        }
    });
    jqUndevouredParent.on("click", async function (ev) {
        try {
            ev.preventDefault();
            const target = ev.target;
            console.log("ev.target.type:", ev.target.type);
            if (target.type !== "submit") {
                return;
            }
            console.log("You clicked on one of my undevoured children");
            console.log("data-id: ", target.getAttribute("data-id"));


            const itemId = target.getAttribute("data-id");
            console.log("data-id: ", itemId);
            // clicking on an undevoured one EATS IT.

            const ajaxPutResults = await $.ajax(`/api/burgers/${itemId}`, { method: "PUT", data: { devoured: true } });

            console.log("ajaxPutResults: ", ajaxPutResults);
            location.reload();
        } catch (ex) {
            console.error("UndevouredParent's bubbled click event blew up", ex);
        }
    });
    jqAddBurgerForm.on("submit", async function(ev){
        try {
            ev.preventDefault();
            const newBurgerName = jqFormBurgerName.val();
            if(!newBurgerName) {
                return;
            }
            const ajaxPutResults = await $.ajax("/api/burgers/", {
                method: "POST",
                data: {
                    name: newBurgerName
                } });

                location.reload();
        } catch(ex) {
            console.error("form's submit event blew up", ex);
        }
    });
}

$(function () {

    main();

});

