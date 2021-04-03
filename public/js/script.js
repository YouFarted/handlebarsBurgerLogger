const jqEatenParent = $("#eaten-parent");
const jqUneatenParent = $("#uneaten-parent");

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
            //location.reload(); later - I want to see the log before I go full-forwards
        }
        catch (ex) {
            console.error(ex);
        }
    });
    jqUneatenParent.on("click", function (ev) {
        ev.preventDefault();
        const target = ev.target;
        console.log("ev.target.type:", ev.target.type);
        if (target.type !== "submit") {
            return;
        }
        console.log("You clicked on one of my uneaten children");
        console.log("data-id: ", target.getAttribute("data-id"));
    });
}

$(function () {
    
    main();
    
});

