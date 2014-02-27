$(document).ready(function() {

    $(window).resize(function() {
        resize_elements();
    });
    $(window).resize();

    var $main_header = $(".main-header");

    var breakpoint_height = 0;
    if($main_header.hasClass("home")){
        breakpoint_height = $(".main-header-home").height() + 50;
    }

    $(window).scroll(function() {
        if($(document).scrollTop()>breakpoint_height){
            if(!$main_header.hasClass("sticky")){
                $main_header.show();
                setTimeout(function(){
                    $main_header.addClass("sticky");
                },0);
            }
        } else {
            if($main_header.hasClass("sticky")){
                if($main_header.hasClass("home")){
                    setTimeout(function(){
                        $main_header.hide();
                        $('body').unbind('touchmove');
                    },300);
                }
                $main_header.removeClass("sticky");
            }
        }
    });

    $top_nav_mobile = $(".top-navigation-mobile");

    $(".mobile_icon").click(function(){

        var top_nav_height = $top_nav_mobile.height();
        var main_header_height = $main_header.height();

        if(!$top_nav_mobile.hasClass("open")){
            // Not open yet

            // Reset margin top to negative of self height
            var mar_top = -top_nav_height;
            $top_nav_mobile.css({'margin-top': mar_top+'px'});

            // We will need to move it down by (self height+main header height)
            var move_height = top_nav_height+main_header_height+$(document).scrollTop();

            $top_nav_mobile.css({"transform": "translate3d(0,"+ move_height+"px, 0)"});
            $top_nav_mobile.addClass("open");

            // Disable scrolling
            $('body').bind('touchmove', function(e){e.preventDefault()});
        } else {
            var move_height = top_nav_height+main_header_height;
            $top_nav_mobile.css({"transform": "translate3d(0,-"+ move_height+"px, 0)"});
            $top_nav_mobile.removeClass("open");

            // Re-enable scrolling
            $('body').unbind('touchmove');
        }
    });

    // Adds easing scrolling to # targets
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            || location.hostname == this.hostname) {

          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top-55
            }, 300);
            return false;
          }
        }
    });

    //Check if there is a map element on page
    var $el_map_wrapper = $("#map_wrapper");
    if($el_map_wrapper){
        var is_homepage = false;
        if($el_map_wrapper.hasClass("home")){
            is_homepage = true;
        }
        load_map('map_wrapper',is_homepage);
    }
});

function resize_elements(){
    var win_width = $(window).width();

    // alert(win_width);

    // Footer triangle
    var footer_height = $(".main-footer").height();
    var $footer_triangle = $(".main-footer").find(".bg-trianlge");
    var footer_border_width = '0 0 '+footer_height+'px '+win_width+'px';
    $footer_triangle.css({'border-width': footer_border_width});

    // Header triangle
    var home_header_height = $(".main-header-home").height();
    var border_height = home_header_height-10;
    var border_width = border_height+'px '+win_width+'px 0 0';
    var $header_triangle = $(".main-header-home").find(".bg-trianlge");
    $header_triangle.css({'border-width': border_width});

    if(win_width>768){

        // Re-enable scrolling
        $('body').unbind('touchmove');

        $top_nav_mobile = $(".top-navigation-mobile");
        $top_nav_mobile.css({'margin-top': '-100%'});
        $top_nav_mobile.removeClass("open");
    }
}


function load_map(map_wrapper,is_homepage){

    var loc_venue =  [12.94351, 77.59652];

    var loc_center = [12.9460, 77.5902];

    var venueIcon = L.icon({
        iconUrl: 'static/images/map_marker_icon.png',
        iconSize:     [104, 154], // size of the icon
        iconAnchor:   [52, 154], // point of the icon which will correspond to marker's location
    });
    window.map = new L.map(map_wrapper, {
        inertia: false
    }).setView(loc_center, 16);

    var layer01 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(window.map);

    L.marker(loc_venue, {
        icon: venueIcon
    }).addTo(window.map).bindPopup("<h3>Nimhans Convention Center</h3>");
}
