const jqEatenParent = $("#eaten-parent");
const jqUneatenParent = $("#uneaten-parent");



function main() {
    $('#abutton').click(function(ev){
        alert("clicky-clicky")
    })
    jqEatenParent.on("click", function(ev){
        ev.preventDefault();
        let target = ev.target;
        console.log("ev.target.type:", ev.target.type);
        if(ev.target.type !== "submit")
        {
            return;
        }
        console.log("You clicked on one of my eaten children");
        console.log("data-id: ", target.getAttribute("data-id"));
    });
    jqUneatenParent.on("click", function(ev){
        ev.preventDefault();
        let target = ev.target;
        console.log("ev.target.type:", ev.target.type);
        if(ev.target.type !== "submit")
        {
            return;
        }
        console.log("You clicked on one of my uneaten children");
        console.log("data-id: ", target.getAttribute("data-id"));
    });
}

$(function (){
    main();
});

