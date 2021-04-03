const jqEatenParent = $("#eaten-parent");
const jqUneatenParent = $("#uneaten-parent");
const jqAddBurgerForm = $("#add-new-burger-form");
const jqFormBurgerName = $("#form-burger-name");

function main() {

    jqEatenParent.on("click", async function (ev) {
        try {
            ev.preventDefault();
            const target = ev.target;
            console.log("ev.target.type:", ev.target.type);
            if (target.type !== "submit") {
                return;
            }
            console.log("You clicked on one of my eaten children");
            const itemId = target.getAttribute("data-id");
            console.log("data-id: ", itemId);
            // clicking on an eaten one makes it restore to uneaten.
            // <shrugs> a little funny, right? !!!!

            const ajaxPutResults = await $.ajax(`/api/burgers/${itemId}`, { method: "PUT", data: { eaten: false } });

            console.log("ajaxPutResults: ", ajaxPutResults);
            location.reload();
        }
        catch (ex) {
            console.error(ex);
        }
    });
    jqUneatenParent.on("click", async function (ev) {
        try {
            ev.preventDefault();
            const target = ev.target;
            console.log("ev.target.type:", ev.target.type);
            if (target.type !== "submit") {
                return;
            }
            console.log("You clicked on one of my uneaten children");
            console.log("data-id: ", target.getAttribute("data-id"));


            const itemId = target.getAttribute("data-id");
            console.log("data-id: ", itemId);
            // clicking on an uneaten one EATS IT.

            const ajaxPutResults = await $.ajax(`/api/burgers/${itemId}`, { method: "PUT", data: { eaten: true } });

            console.log("ajaxPutResults: ", ajaxPutResults);
            location.reload();
        } catch (ex) {
            console.error("UneatenParent's bubbled click event blew up", ex);
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

