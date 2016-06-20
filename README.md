#### Profiles Display ####

See the [demo](http://webedpm.com/park/profiles/)

This project uses PHP and MySQL to retrieve and store staff (user) information, and Bootstrap to display and organize the information on the page.

# User Schema #
id - user id (INTEGER)
first - first name (VARCHAR)
last - last name (VARCHAR)
title - job title (eg. Physician) (VARCHAR)
org - organization name (eg. VCH) (VARCHAR)
phone - phone number (VARCHAR) 
email (VARCHAR)
description - any user description (TEXT)
description2 - more (TEXT)
description3 - more (TEXT)

description, description2, description3 may be renamed or removed depending on the organization's needs.
Images are on the demo server's file system, and are named systematically: id_first_last_title_org_tile.jpg, or id_first_last_title_org_header.jpg
(retrievable by concatenating user info)

Database config data (host name, database name, username, password) must be in php/config.php
