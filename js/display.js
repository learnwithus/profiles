$(function() {


	$.get("https://webedpm.com/~nomonke1/park/profiles/server.php", function(data) {
		var data_parsed = jQuery.parseJSON(data);
		for (var i = 0; i < data_parsed.length; i++) {
			// console.log(data_parsed[i]);
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
			
			
			
			/*
			total_data +=
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
				"</div>"*/
		}
		
	});

	$(window).load(function() {
		$(".loader").delay(1100).fadeOut("slow");
	});

    $(document).off().on("click",".tile",function() {
    	id = $(this).attr('id');
		$("#result").load("https://webedpm.com/~nomonke1/park/profiles/display_profile.php?pk=" + id.toString(), function() {
			$('#user-modal').modal("show");
		});
    });
});
