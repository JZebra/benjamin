//jQuery is required to run this code
$( document ).ready(function() {

    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer(videoHeight) {

    var height = videoHeight;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height', unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    videoWidth,
    videoHeight;

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);
        videoHeight = windowWidth * videoAspectRatio;
        scaleVideoContainer(videoHeight);

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}
