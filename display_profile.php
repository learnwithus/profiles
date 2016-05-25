<?php
    $conn = mysql_connect("localhost", "nomonke1_park", "123...Park")
        or die("Unable to connect to MySQL");
    
    $selected = mysql_select_db("nomonke1_display_profile", $conn) 
        or die("Could not select display_profiles"); 
    if (isset($_GET["pk"])) {
        $row = mysql_query("SELECT * FROM users WHERE id = " . $_GET["pk"]);
        $user = mysql_fetch_assoc($row);


        echo '
<div class="modal fade" role="dialog" id="user-modal">
    <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
            <div class="lr">
                <div class="rl">
                </div>
            </div>
        </div>
        
        <div id="detail">
            <div class="modal-body">
                <div id="header" class="parallax" style="background-image: url(https://webedpm.com/~nomonke1/park/profiles/img/header_'; 
                    echo $user['org']; echo '_';
                    echo str_replace(' ', '_', $user['title']); echo '_';
                    echo str_replace(' ', '_', strtolower($user['first'])); echo '_';
                    echo str_replace(' ', '_', strtolower($user['last'])); echo '_';
               	    echo $user['id']; echo '.jpg'; 
		    echo ');">
                    <h1 id="name-user">'; echo $user['first']; echo ' '; echo $user['last']; echo '</h1>
                    <h1 id="title-user">'; echo $user['title']; echo '</h1>
                </div>

                <div class="bar">
                    <div class="row">
                        <div class="col-xs-15 col-sm-15 col-md-15 col-lg-15 item">
                            &nbsp;
                        </div>
                        <div class="col-xs-15 col-sm-15 col-md-15 col-lg-15 item">
                            <h4 class="heading-info-user"> Organization </h4>
                            <p class="info-user" id="org">'; echo $user['org']; echo '</p>
                        </div>
                        <div class="col-xs-15 col-sm-15 col-md-15 col-lg-15 item">
                            <h4 class="heading-info-user"> Email </h4>
                            <p class="info-user">'; echo $user['email']; echo '</p>
                        </div>
                        <div class="col-xs-15 col-sm-15 col-md-15 col-lg-15 item">
                            <h4 class="heading-info-user"> Phone </h4>
                            <p class="info-user">'; echo $user['phone']; echo '</p>
                        </div>
                        <div class="col-xs-15 col-sm-15 col-md-15 col-lg-15 item">
                            &nbsp;
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="row">
                        <div class="col-sm-12">
                            <h3 class="heading-description">Description</h3>
                            <p class="description">'; echo $user['description']; echo '</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h3 class="heading-description">Description 2</h3>
                            <p class="description">';
                            
                                if (empty($user['description2'])) {
                                    echo 'No description available.';
                                } else {
                                    echo $user['description2'];
                                }
echo '
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h3 class="heading-description">Description 3</h3>
                            <p class="description">';

                                if (empty($user['description3'])) {
                                    echo 'No description available.';
                                } else {
                                    echo $user['description3'];
                                }
echo '
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h1></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>'; 


    } else {
        echo json_encode(array('result' => array()));
    }
?>

