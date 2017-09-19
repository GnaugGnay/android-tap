//JQuery绑定
function bindClickJQ(className) {
    $('.' + className).on('click', function(e) {
        var width = $(this).innerWidth();
        var height = $(this).innerHeight();
        var radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

        var $circle = $('<div class="circle"></div>');
        $circle.css(_getTopLeft(e.offsetY, e.offsetX, 0, 0));
        $(this).append($circle);

        $circle.css({
            width: 0,
            height: 0
        }).animate({
            width: radius * 2,
            height: radius * 2
        }, {
            duration: 300,
            easing: 'linear',
            step: function(now) {
                $(this).css(_getTopLeft(e.offsetY, e.offsetX, now, now));
            },
            done: function() {
                $(this).remove();
            }
        });
    });

    function _getTopLeft(centerY, centerX, width, height) {
        return {
            top: centerY - height / 2,
            left: centerX - width / 2
        }
    }
}

