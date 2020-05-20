$(document)
    .ready(function () {
        if ($('#loading').length > 0) {
            var durat = 3000;
            setInterval(function () {
                loadingPage(durat);
            }, durat);
        }
    })
    .resize(function () {
        if ($('#loading').length > 0) {
            var durat = 1000;
            setInterval(function () {
                loadingPage(durat);
            }, durat);
        }
    });
function loadingPage(duration) {
    $('#loading .progress-line span').stop(true, true).css('left', '-100%').animate({left: '100%'}, duration);
}