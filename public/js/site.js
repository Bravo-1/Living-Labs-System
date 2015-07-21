function isTouchDevice(e) {
    try {
        document.createEvent('TouchEvent');
        return true;
    } catch (error) {
        return false;
    }
}

$(function() {

    // Sidebar nav
    $('#sidebar ul.mainmenu li a').click(function(e) {
        e.preventDefault();
        $('#sidebar .panel').removeClass('active');
        $('#sidebar ul.mainmenu li a').removeClass('active');
        $('#sidebar .panel.' + this.id).addClass('active');
        $(this).addClass('active');

        $('#sidebar').css('width', '399px');
        $('#sidebar .content').css('width', '399px');
        $('#sidebar .panel').css('width', '340px');
        $('#sidebar ul.mainmenu').css('width', '399px');
        $('#sidebar ul.mainmenu li.first a').css('width', '120px');
        $('#sidebar ul.mainmenu li.third a').css('width', '120px');
        $('#sidebar ul.mainmenu li.second a').css('width', '156px');
        $('#attribution').css('left', '425px');
        $('textarea.embed-code, textarea.api-code').removeClass('ie-resize');

    });
    // Hide/show sidebar
    $('a.close').click(function(e) {
        e.preventDefault();
        $('#sidebar').removeClass('active');
        $('.pull-tab').addClass('active');
    });

    $('a.pull-tab').click(function(e) {
        e.preventDefault();
        $('#sidebar').addClass('active');
        $(this).removeClass('active');
    });
     // About
    $('a.about,a.about-link').click(function(e) {
        e.preventDefault();
        $('.about-modal').css('display', 'block');
    });

    $('a.share-close, a.about-close').click(function(e) {
        e.preventDefault();
        $('.share-modal').css('display', 'none');
        $('.about-modal').css('display', 'none');
    });

    if (isTouchDevice()) {
        $('body').removeClass('no-touch');;
    }
});
