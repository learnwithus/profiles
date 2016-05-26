<?php
    require "config.php";
    $list_users = array(); 
	
    $conn = mysql_connect($host, $username, $password)
        or die("Unable to connect to MySQL");

    $selected = mysql_select_db($db_name, $conn) 
        or die("Could not select display_profiles");

    mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $conn);

    $result = mysql_query("SELECT * FROM users ORDER BY last");

    while ($row = mysql_fetch_assoc($result)) {
       array_push($list_users, $row); 
    }
    
    echo json_encode($list_users);
?>

