$(function() {
	window.names = {};
	$.get("php/server.php", function(data) {
		var data_parsed = jQuery.parseJSON(data);
		for (var i = 0; i < data_parsed.length; i++) {
			var user = data_parsed[i];
			
			$("#tiles").append(
				"<div id='" + user['id'] + "' class='tile col-xs-12 col-sm-6 col-md-3 col-lg-15'>" + 
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
			window.names[user['id']] = user['first'].toUpperCase() + ' ' + user['last'].toUpperCase();
		}
	});

	$(window).load(function() {
		$(".loader").delay(3000).fadeOut("slow");
	});

	$(document).off().on("click",".tile",function() {
		$(".loader").fadeIn("fast");
    		id = $(this).attr('id');
		$("#loader_img").css("display","none");
		$("#loader_title").html("<h1>" + window.names[id] + "</h1>");
		$("#result").load("php/detail.php?pk=" + id.toString(), function() {
		    $(".modal").unbind("scroll");
		    $(".modal").scroll(function(e){
			e.preventDefault(); 
			var pos = ($('.modal').scrollTop() * 0.5) + "px";
			$('.parallax').animate({'background-position-y': pos}, .1);
			//$('.parallax').css('background-position', '0px ' + pos);
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
