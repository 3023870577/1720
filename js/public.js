requirejs.config({
    paths: {
        jquery: "jquery-1.11.3"
        // pb:"publick"
    }
})
requirejs(["jquery"], function ($) {
    $(function () {
        var $li = $(".float-right");
        $li.click(function () {
            alert("hhhh");
        })
    })
})
//目前没什么用。可删
