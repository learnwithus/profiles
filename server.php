<?php
    $list_users = array(); 

    $conn = mysql_connect("localhost", "nomonke1_park", "123...Park")
        or die("Unable to connect to MySQL");

    $selected = mysql_select_db("nomonke1_display_profile", $conn) 
        or die("Could not select display_profiles");

    mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $conn);

    $result = mysql_query("SELECT * from users");

    while ($row = mysql_fetch_assoc($result)) {
       array_push($list_users, $row); 
    }



/*
    foreach ($list_users as $value) {	
	foreach ($value as $val) {
	    echo $val;
	}
    }
*/


    echo json_encode($list_users);
?>

