$(function() {
	
	var imgs = [];

	$.get("https://webedpm.com/~nomonke1/park/profiles/server.php", function(data) {
			var data_parsed = jQuery.parseJSON(data);

			for (var i = 0; i < data_parsed.length; i++) {
				// console.log(data_parsed[i]);
				var user = data_parsed[i];
				imgs.push="img/tile_" + user['org'] + "_" + user['title'].replace(/ /g, "_") 
							+ "_" + user['first'].toLowerCase().replace(/ /g, "_") 
							+ "_" + user['last'].toLowerCase().replace(/ /g, "_")
							+ "_" + user['id'] + ".jpg";
				}
		});
	preload(imgs);
});

function preload(imageArray, index) {
        index = index || 0;
        if (imageArray && imageArray.length > index) {
            var img = new Image ();
            img.onload = function() {
                preload(imageArray, index + 1);
            }
            img.src = images[index];
	}
}


