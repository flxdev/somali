<?php

require "SendMail.php";

new \FlexMedia\SendMail($_REQUEST, array("send_to" => "email@email.ru", "subject" => "Subject"));
