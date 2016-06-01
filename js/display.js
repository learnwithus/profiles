$(function() {
	window.names = {};
	window.titles = {};

	$(".navbar").hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 25) {
        	$('.navbar').removeClass('animated slideOutUp');
            $('.navbar').addClass('animated slideInDown');
            $('.navbar').show();
        } else {
        	if ($("#search").val() === "" && $(document).height() > $(window).height()) {
        		$('.navbar').removeClass('animated slideInDown');
           		$('.navbar').addClass('animated slideOutUp');
			if ($('.menu-item').is(':visible')) {
				$('.dropdown-toggle').click();
			}
        	}
        }
    });
    $( window ).resize(function() {

    if($(window).width() < 768){
     $('#smallMenu').removeClass('dropdown');  
      //var dropContent = $('#smallToggle').detach();
    //$('#smallToggle').css("display", "none");
        $('#smallToggle').hide();
     $('#smallToggle').removeClass('dropdown-toggle');  
     $('#smallList').removeClass('dropdown-menu'); 
     $('#smallList').addClass('nav navbar-nav'); 

    }else{
        
     $('#smallMenu').addClass('dropdown');   
     $('#smallToggle').addClass('dropdown-toggle');  
    //$('#smallToggle').css("display", "inline");
                $('#smallToggle').show();

     $('#smallList').addClass('dropdown-menu'); 
     $('#smallList').removeClass('nav navbar-nav');  

    }});
        if($(window).width() < 768){
     $('#smallMenu').removeClass('dropdown');   
     //var dropContent = $('#smallToggle').detach();
     $('#smallToggle').removeClass('dropdown-toggle'); 
   // $('#smallToggle').css("display", "none");
                    $('#smallToggle').hide();
     $('#smallList').removeClass('dropdown-menu'); 
     $('#smallList').addClass('nav navbar-nav'); 
        }

    $(window).mousemove(function(e) {
    	if (e.pageY < 50) {
	    $('.navbar').show();
       	    $('.navbar').removeClass('animated slideOutUp');
            $('.navbar').addClass('animated slideInDown');
    	}
    	if (e.pageY >= 50 &&
    		$(this).scrollTop() <= 25 &&
    		$('.menu-item').is(':hidden') &&
    		!$('#search-form').is(':active') &&
    		!$('.dropdown-toggle').is(':active') &&
    		$('#search').val() === "") {
        	$('.navbar').removeClass('animated slideInDown');
           	$('.navbar').addClass('animated slideOutUp');
    	}	
    });

    $('.navbar-toggle').click(function() {
    	if ($(window).width() < 768) {
    		if ($('.navbar').height() === 100) {
    			$('.navbar').animate({'height': '50px'});
    			$('#navbar').width("100%");
    		} else {
    			$('.navbar').animate({'height': '100px'});
    			//$('#navbar').width(300);
    		}
    	}
    });

    $("#search-form").submit(function(e) {
    	e.preventDefault();
    	if ($(".navbar-toggle").is(':visible')) {
    		$(".navbar-toggle").click();
    		window.scrollTo(0, 0);
    	}
    });

    $('.menu-item').hover(
	    function() {
	    	$(this).prepend('<img class="yellow" src="img/yellow.gif" />');
	    },
	    function() {
	    	$(".yellow").remove();
	    }
    );
    /*
    $("#back").click(function() {
    	$('.tile').each(function(i, obj) {
	    	$(obj).show();
		});
		$("#back").hide();
		$(".menu-item").removeClass("active");
		$("#all").addClass("active");
    });
	*/
	$.get("php/server.php", function(data) {
		var data_parsed = jQuery.parseJSON(data);
		var half = Math.ceil(data_parsed.length / 2);

		for (var i = 0; i < data_parsed.length; i++) {
			var user = data_parsed[i];
			$("#tiles").append(
				"<div id='" + user['id'] + "' class='tile col-xs-6 col-sm-6 col-md-3 col-lg-15'>" + 
					"<div>" +
						"<img src='img/tile_" + user['org'] + "_" + user['title'].replace(/ /g, "_") 
						+ "_" + user['first'].toLowerCase().replace(/ /g, "_") 
						+ "_" + user['last'].toLowerCase().replace(/ /g, "_")
						+ "_" + user['id'] + ".jpg" 
						+ "' class='image-tile-user'/>" +
						"<img src='img/tile_overlay.png' class='image-tile-overlay'/>" + 
						"<h1 class='heading-tile-name'>" + user['first'] + " " + user['last'] + "</h1>" + 
						"<h1 class='heading-tile-title'>" + user['title'] + "</h1>" +
					"</div>" +
				"</div>"
			);

			if (i == half) {
				$("#loader_title").html("<h1>" + "Physician Display" + "</h1>");
				$("#loader_overlay").delay(1000).fadeOut("slow");
//				$("#loader_title").fadeIn("slow");
//				$("#loader_img").attr("src", "img/preloader_tetris.gif");
//				$("#loader_img").fadeIn("slow");
			} 


			window.names[user['id']] = user['first'].toUpperCase() + ' ' + user['last'].toUpperCase();
			window.titles[user['id']] = user['title'].toUpperCase();
		}

		$(".tile").off().on("click",function() {
			$(".loader").fadeIn("fast");
	    	id = $(this).attr('id');
			$("#loader_img").css("display","none");
			$("#loader_title").html("<h1>" + window.names[id] + "</h1>");

			$("#result").load("php/detail.php?pk=" + id.toString(), function() {
			    $(".modal").unbind("scroll");
			    $(".modal").scroll(function(e) {
					e.preventDefault(); // prevents default scrolling handler 
					var pos = ($('.modal').scrollTop() * 0.6) + "px";
					$('.parallax').css('background-position', '0px ' + pos);
					return false;
			    });

				$(document).keydown(function(key) {
					if (key.keyCode == 27) {
						$('#user-modal').modal('hide');
					}
				});

				$('#user-modal').modal("show");
				$(".loader").delay(500).fadeOut("slow");
			});
		});
	});

	$(window).load(function() {
		$(".loader").delay(3000).fadeOut("slow");
	});

	$("#search").on('input', function() {
		var query = $(this).val().toUpperCase();
  		$('.tile').each(function(i, obj) {
    		if (window.names[$(obj).attr('id')].indexOf(query) == -1) {
    			$(obj).hide();
    		} else {
    			$(obj).show();
    		}
		});
	});

	$(".menu-item").click(function() {
		var query = $(this).text().toUpperCase();
		$(".menu-item").removeClass("active");
		$(this).addClass("active");
		if (query == "ALL") {
			$('.tile').each(function(i, obj) {
	    		$(obj).show();
			});
			// $("#back").hide();
			window.scrollTo(0, 0);
			return;
		}
  		$('.tile').each(function(i, obj) {
    		if (window.titles[$(obj).attr('id')].indexOf(query) == -1) {
    			$(obj).hide();
    		} else {
    			$(obj).show();
    		}
		});
		// $("#back").show();
		window.scrollTo(0, 0);
		if ($(".navbar-toggle").is(':visible')) {
			$(".navbar-toggle").click();
		}
	});
});
