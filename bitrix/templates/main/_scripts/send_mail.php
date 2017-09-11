<?php

require "SendMail.php";

new \FlexMedia\SendMail($_REQUEST, array("send_to" => "info@gildia-sommelier.com", "subject" => "Заполнена форма на сайте"));