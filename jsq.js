$(window).on("load", function () {
    $(".loader").fadeOut("slow");
    setTimeout(() => {
    $(".loader-wrapper").fadeOut("slow");
    $(".book").animate({ opacity: 1 }, 800);
    $(".cover-content").animate({ opacity: 1 }, 2400);
    }, 400);
});
